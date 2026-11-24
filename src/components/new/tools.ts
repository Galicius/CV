"use client";

import { LANES, profile, workBySlug, works, worksFor, type Lane, type Work } from "../../data/showcase";
import { BRIEF_MAX } from "../../lib/jev";
import { applyTheme } from "../../lib/theme";
import { store, type Caller } from "./store";

export const SECTIONS = ["top", "now", "work", "setup", "fit", "agents", "contact"] as const;
type Section = (typeof SECTIONS)[number];

type Args = Record<string, unknown>;

export type Tool = {
  name: string;
  description: string;
  inputSchema: { type: "object"; properties: Record<string, unknown>; required?: string[] };
  readOnly: boolean;
  /** Arguments the in-page console pre-fills. */
  example: Args;
  run: (args: Args) => unknown | Promise<unknown>;
};

/** Raised for bad arguments; the message goes back to the caller. */
class ToolInputError extends Error {}

const text = (v: unknown, name: string, max: number, required = true): string => {
  if (typeof v !== "string" || (required && !v.trim())) {
    if (!required && v === undefined) return "";
    throw new ToolInputError(`"${name}" must be a non-empty string.`);
  }
  return v.trim().slice(0, max);
};

const oneOf = <T extends string>(v: unknown, name: string, options: readonly T[]): T => {
  if (typeof v === "string" && (options as readonly string[]).includes(v)) return v as T;
  throw new ToolInputError(`"${name}" must be one of: ${options.join(", ")}.`);
};

const card = (w: Work) => ({
  slug: w.slug,
  title: w.title,
  kicker: w.kicker,
  year: w.year,
  status: w.status,
  stack: w.stack,
  link: w.link?.href,
});

function scrollTo(section: Section) {
  document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
}


export const tools: Tool[] = [
  {
    name: "get_profile",
    description: "Who Gal Guštin is: role, current job, location, contact details, languages, education and a short bio.",
    inputSchema: { type: "object", properties: {} },
    readOnly: true,
    example: {},
    run: () => ({ ...profile, cv: new URL(profile.cv, location.origin).href }),
  },
  {
    name: "list_work",
    description:
      "List Gal's projects. Optionally only one kind of work (agents, products, mobile, games or client), strongest match first.",
    inputSchema: { type: "object", properties: { lane: { type: "string", enum: [...LANES] } } },
    readOnly: true,
    example: { lane: "agents" },
    run: (args) => worksFor(args.lane === undefined ? null : oneOf<Lane>(args.lane, "lane", LANES)).map(card),
  },
  {
    name: "open_project",
    description: "Expand one project on the page and return its full write-up. Use a slug from list_work.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string", enum: works.map((w) => w.slug) } },
      required: ["slug"],
    },
    readOnly: false,
    example: { slug: "layover" },
    run: (args) => {
      const work = workBySlug.get(oneOf(args.slug, "slug", works.map((w) => w.slug)))!;
      if (store.get().lane && !worksFor(store.get().lane).includes(work)) store.setLane(null);
      store.openWork(work.slug);
      requestAnimationFrame(() =>
        document.getElementById(`work-${work.slug}`)?.scrollIntoView({ behavior: "smooth", block: "center" }),
      );
      return { ...card(work), summary: work.summary, points: work.points };
    },
  },
  {
    name: "filter_work",
    description: "Filter the project list on the page to one kind of work, or \"all\" to show everything.",
    inputSchema: {
      type: "object",
      properties: { lane: { type: "string", enum: [...LANES, "all"] } },
      required: ["lane"],
    },
    readOnly: false,
    example: { lane: "games" },
    run: (args) => {
      const choice = oneOf(args.lane, "lane", [...LANES, "all"] as const);
      const lane = choice === "all" ? null : choice;
      store.setLane(lane);
      scrollTo("work");
      return { lane: choice, shown: worksFor(lane).map((w) => w.slug) };
    },
  },
  {
    name: "check_fit",
    description:
      "Run a job ad, project brief or yes/no question about Gal through TypeSafe's Jev decision model. Returns fit, closest project, kind of work and a yes probability, and shows the result on the page.",
    inputSchema: {
      type: "object",
      properties: { brief: { type: "string", maxLength: BRIEF_MAX } },
      required: ["brief"],
    },
    readOnly: false,
    example: { brief: "Founding engineer to build agent tooling and a React Native app" },
    run: async (args) => {
      const brief = text(args.brief, "brief", BRIEF_MAX);
      scrollTo("fit");
      const desk = await store.runDesk(brief);
      if (desk.status === "error") return { error: desk.message };
      if (desk.status !== "done") return { error: "The check did not finish." };
      return desk.result;
    },
  },
  {
    name: "go_to",
    description: "Scroll the page to a section.",
    inputSchema: { type: "object", properties: { section: { type: "string", enum: [...SECTIONS] } }, required: ["section"] },
    readOnly: false,
    example: { section: "setup" },
    run: (args) => {
      const section = oneOf(args.section, "section", SECTIONS);
      scrollTo(section);
      return { section };
    },
  },
  {
    name: "set_theme",
    description: "Switch the page between light and dark.",
    inputSchema: { type: "object", properties: { theme: { type: "string", enum: ["light", "dark"] } }, required: ["theme"] },
    readOnly: false,
    example: { theme: "light" },
    run: (args) => {
      const theme = oneOf(args.theme, "theme", ["light", "dark"] as const);
      applyTheme(theme);
      return { theme };
    },
  },
  {
    name: "draft_message",
    description:
      "Fill in the contact form for the visitor to review. Nothing is sent; the visitor presses send. Returns a mailto link.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", maxLength: 80 },
        email: { type: "string", maxLength: 120 },
        message: { type: "string", maxLength: 2000 },
      },
      required: ["message"],
    },
    readOnly: false,
    example: { name: "Ana", message: "Hi Gal, we're hiring for agent tooling. Free for a call next week?" },
    run: (args) => {
      const draft = {
        name: text(args.name, "name", 80, false),
        email: text(args.email, "email", 120, false),
        message: text(args.message, "message", 2000),
      };
      store.setDraft(draft);
      scrollTo("contact");
      return { drafted: true, mailto: mailto(draft) };
    },
  },
];

export const toolByName = new Map(tools.map((t) => [t.name, t]));

export function mailto(draft: { name: string; email: string; message: string }) {
  const subject = draft.name ? `Hello from ${draft.name}` : "Hello from your portfolio";
  const sign = [draft.name, draft.email].filter(Boolean).join(" · ");
  const body = sign ? `${draft.message}\n\n${sign}` : draft.message;
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Runs a tool for either caller, logs it, and turns failures into `{ error }`. */
export async function invoke(tool: Tool, args: Args, caller: Caller): Promise<unknown> {
  let result: unknown;
  let ok = true;
  try {
    result = await tool.run(args ?? {});
    if (result && typeof result === "object" && "error" in result) ok = false;
  } catch (error) {
    if (!(error instanceof ToolInputError)) console.error(`Tool ${tool.name} failed`, error);
    result = { error: error instanceof ToolInputError ? error.message : "The tool failed." };
    ok = false;
  }
  store.log({ caller, tool: tool.name, args, result, ok });
  return result;
}
