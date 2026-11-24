"use client";

import { LANE_LABEL, workBySlug, works } from "../../data/showcase";
import { BRIEF_MAX, FITS, FIT_LABEL, type JevVerdict } from "../../lib/jev";
import { store, useStore } from "./store";
import { invoke, toolByName } from "./tools";

const EXAMPLES = [
  "Founding engineer for agent tooling, TypeScript",
  "An Expo app for our gym with bookings",
  "Can Gal build a website for my restaurant?",
  "Senior Rust engineer for Linux kernel drivers",
];

const pct = (p: number) => `${Math.round(p * 100)}%`;

function Row({ label, p, chosen }: { label: string; p: number | null; chosen: boolean }) {
  return (
    <li data-chosen={chosen || undefined}>
      <span>{label}</span>
      <span className="fit-bar" style={{ "--w": pct(p ?? 1) } as React.CSSProperties} />
      <span className="fit-num">{p === null ? "" : pct(p)}</span>
    </li>
  );
}

function Result({ result }: { result: JevVerdict }) {
  const closest = workBySlug.get(result.closest.choice);
  const topWorks = result.closest.probabilities
    ? works
        .map((w) => ({ w, p: result.closest.probabilities?.[w.slug] ?? 0 }))
        .sort((a, b) => b.p - a.p)
        .slice(0, 3)
    : [];

  return (
    <div className="fit-result">
      {result.mode === "demo" && (
        <p className="mn-quiet">Demo answer. Jev isn&apos;t connected on this server, so a keyword match stood in.</p>
      )}
      <p className="fit-verdict">
        Jev&apos;s answer: {result.verdict >= 0.5 ? "yes" : "no"},{" "}
        {pct(result.verdict >= 0.5 ? result.verdict : 1 - result.verdict)} likely.
      </p>

      <h3>Fit</h3>
      <ol className="fit-rows">
        {FITS.map((f) => (
          <Row
            key={f}
            label={FIT_LABEL[f]}
            p={result.fit.probabilities ? (result.fit.probabilities[f] ?? 0) : null}
            chosen={f === result.fit.choice}
          />
        ))}
      </ol>

      <h3>Closest project</h3>
      {topWorks.length > 0 ? (
        <ol className="fit-rows">
          {topWorks.map(({ w, p }) => (
            <Row key={w.slug} label={w.title} p={p} chosen={w.slug === result.closest.choice} />
          ))}
        </ol>
      ) : null}
      {closest && (
        <p>
          <button
            type="button"
            className="mn-link"
            onClick={() => invoke(toolByName.get("open_project")!, { slug: closest.slug }, "visitor")}
          >
            Open {closest.title}
          </button>
        </p>
      )}

      <h3>Kind of work</h3>
      <p>
        {LANE_LABEL[result.lane.choice]}. The project list above now shows only this kind of work.
      </p>
    </div>
  );
}

export function Desk() {
  const brief = useStore((s) => s.brief);
  const desk = useStore((s) => s.desk);
  const busy = desk.status === "running";

  const submit = () => {
    if (!busy && brief.trim().length >= 3) invoke(toolByName.get("check_fit")!, { brief }, "visitor");
  };

  return (
    <div className="fit">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label htmlFor="fit-brief">Job ad, project brief or a yes-or-no question</label>
        <textarea
          id="fit-brief"
          value={brief}
          maxLength={BRIEF_MAX}
          rows={5}
          onChange={(e) => store.setBrief(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
          }}
        />
        <p className="fit-examples">
          Try:{" "}
          {EXAMPLES.map((ex, i) => (
            <span key={ex}>
              <button type="button" className="mn-link" onClick={() => store.setBrief(ex)}>
                {ex}
              </button>
              {i < EXAMPLES.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
        <button className="mn-btn" type="submit" disabled={busy || brief.trim().length < 3}>
          {busy ? "Checking" : "Check"}
        </button>
      </form>

      <div aria-live="polite">
        {desk.status === "running" && <p className="mn-quiet">Jev is reading it…</p>}
        {desk.status === "error" && (
          <p className="fit-error" role="alert">
            {desk.message}
          </p>
        )}
        {desk.status === "done" && <Result result={desk.result} />}
      </div>
    </div>
  );
}
