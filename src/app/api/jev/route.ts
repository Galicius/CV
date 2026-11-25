import { typeSafeAi } from "@ai-sdk/typesafe-ai";
import { experimental_decide as decide, type Experimental_DecisionModel } from "ai";
import { LANES, LANE_HINT, profile, works, type Lane } from "../../../data/showcase";
import { BRIEF_MAX, FITS, type Fit, type JevVerdict } from "../../../lib/jev";

const record = {
  name: profile.name,
  role: profile.role,
  job: profile.job,
  location: profile.location,
  about: profile.about,
  languages: profile.languages,
  education: profile.education,
  work: works.map((w) => ({ slug: w.slug, title: w.title, summary: w.summary, stack: w.stack, status: w.status })),
};

const fitCriteria: Record<Fit, string> = {
  strong: "Gal has already shipped something very close to what the request needs.",
  solid: "Gal has shipped adjacent work and would ramp up quickly.",
  stretch: "Some overlap with Gal's record, but key parts of the request are outside it.",
  mismatch: "The request needs skills that are absent from Gal's record.",
};

const questions = {
  fit: {
    type: "choice",
    instructions:
      "The state holds Gal's record and a request from a visitor: a job ad, a project brief or a question about Gal. Judge how well Gal's demonstrated work matches what the request needs. Use only the record.",
    criteria: fitCriteria,
  },
  closest: {
    type: "choice",
    instructions: "Which piece of Gal's work is the strongest evidence for this request?",
    criteria: Object.fromEntries(works.map((w) => [w.slug, `${w.title}: ${w.kicker}`])),
  },
  lane: {
    type: "choice",
    instructions: "Which kind of work is the request mostly about?",
    criteria: LANE_HINT,
  },
  verdict: {
    type: "boolean",
    instructions:
      "If the request is a yes-or-no question about Gal, answer it from the record. Otherwise decide whether Gal is a good person to take on the request.",
    criteria: {
      true: "Yes, based on the record.",
      false: "No, based on the record.",
    },
  },
} as const;

/** Best-effort per-instance limit: the endpoint spends a paid model call per request. */
const WINDOW_MS = 10 * 60_000;
const LIMIT = 8;
const hits = new Map<string, number[]>();

function allow(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) return false;
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

/** A direct TypeSafe key wins; otherwise Jev through Vercel AI Gateway; otherwise the demo heuristic. */
function jevModel(): Experimental_DecisionModel | null {
  if (process.env.TYPESAFE_AI_API_KEY) return typeSafeAi.decisionModel("jev-latest");
  if (process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN || process.env.VERCEL) return "typesafe-ai/jev";
  return null;
}

export async function POST(request: Request) {
  let brief = "";
  try {
    const body = (await request.json()) as { brief?: unknown };
    brief = typeof body.brief === "string" ? body.brief.trim().slice(0, BRIEF_MAX) : "";
  } catch {
    // Falls through to the empty-brief response.
  }
  if (brief.length < 3) return Response.json({ error: "Write a brief or a question first." }, { status: 400 });

  const model = jevModel();
  if (!model) return Response.json(demoVerdict(brief));

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!allow(ip)) return Response.json({ error: "Jev needs a breather. Try again in a few minutes." }, { status: 429 });

  try {
    const result = await decide({
      model,
      state: { record, request: brief },
      questions,
      abortSignal: AbortSignal.timeout(12_000),
    });
    const { fit, closest, lane, verdict } = result.answers;
    const body: JevVerdict = {
      mode: "live",
      fit: { choice: fit.choice, probabilities: fit.probabilities ?? null },
      closest: { choice: closest.choice, probabilities: closest.probabilities ?? null },
      lane: { choice: lane.choice, probabilities: lane.probabilities ?? null },
      verdict: verdict.probability,
    };
    return Response.json(body);
  } catch (error) {
    console.error("Jev fit check failed", error);
    return Response.json({ error: "Jev did not answer. Try again in a moment." }, { status: 503 });
  }
}

/**
 * Keyword stand-in used only when the server has no Gateway access (local dev
 * without a key). The page labels these results as a demo.
 */
function demoVerdict(brief: string): JevVerdict {
  const text = brief.toLowerCase();
  const words = new Set(text.match(/[\p{L}\p{N}+#.]+/gu) ?? []);
  const hit = (terms: string[]) => terms.filter((t) => words.has(t) || text.includes(t)).length;

  const laneTerms: Record<Lane, string[]> = {
    agents: ["agent", "agents", "llm", "mcp", "ai", "rag", "model", "automation", "claude", "codex", "copilot", "erp"],
    products: ["next.js", "react", "full-stack", "fullstack", "backend", "web", "saas", "api", "typescript"],
    mobile: ["mobile", "expo", "react native", "android", "ios", "app"],
    games: ["game", "unreal", "unity", "vr", "xr", "3d", "blender"],
    client: ["website", "site", "restaurant", "bar", "lawyer", "shop", "brand", "wordpress"],
  };
  const raw = Object.fromEntries(LANES.map((l) => [l, 1 + 3 * hit(laneTerms[l])])) as Record<Lane, number>;
  const sum = LANES.reduce((s, l) => s + raw[l], 0);
  const laneP = Object.fromEntries(LANES.map((l) => [l, raw[l] / sum])) as Record<Lane, number>;
  const lane = LANES.reduce((a, b) => (laneP[b] > laneP[a] ? b : a));

  const scored = works.map((w) => {
    const stack = w.stack.join(" ").toLowerCase();
    const overlap = [...words].filter((t) => t.length > 2 && (stack.includes(t) || w.summary.toLowerCase().includes(t))).length;
    return { slug: w.slug, s: 1 + overlap * 2 + 4 * (w.mix[lane] ?? 0) };
  });
  const total = scored.reduce((s, x) => s + x.s, 0);
  const closestP = Object.fromEntries(scored.map((x) => [x.slug, x.s / total]));
  const closest = scored.reduce((a, b) => (b.s > a.s ? b : a)).slug;

  const known = LANES.reduce((s, l) => s + hit(laneTerms[l]), 0);
  const foreign = hit(["rust", "kernel", "embedded", "fpga", "cobol", "salesforce", "sap", "accountant", "nurse"]);
  const strength = Math.max(0, Math.min(1, 0.35 + 0.12 * known - 0.3 * foreign));
  const fitIndex = strength > 0.75 ? 0 : strength > 0.5 ? 1 : strength > 0.3 ? 2 : 3;
  const fitP = Object.fromEntries(FITS.map((f, i) => [f, i === fitIndex ? 0.55 : 0.15])) as Record<Fit, number>;

  return {
    mode: "demo",
    fit: { choice: FITS[fitIndex], probabilities: fitP },
    closest: { choice: closest, probabilities: closestP },
    lane: { choice: lane, probabilities: laneP },
    verdict: Math.round((0.15 + 0.8 * strength) * 100) / 100,
  };
}
