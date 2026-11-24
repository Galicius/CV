"use client";

import { Button } from "@ui-sdk/react/button";
import { Field, FieldLabel } from "@ui-sdk/react/field";
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@ui-sdk/react/meter";
import { Textarea } from "@ui-sdk/react/textarea";
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

/** One option of a Jev answer. Without probabilities there is nothing to measure, so only the label shows. */
function Row({ label, p, chosen }: { label: string; p: number | null; chosen: boolean }) {
  if (p === null)
    return (
      <div className="fit-row" data-chosen={chosen || undefined}>
        {label}
      </div>
    );
  return (
    <Meter
      className="fit-row"
      data-chosen={chosen || undefined}
      value={p}
      max={1}
      format={{ style: "percent", maximumFractionDigits: 0 }}
    >
      <MeterLabel>{label}</MeterLabel>
      <MeterTrack className="fit-bar">
        <MeterIndicator />
      </MeterTrack>
      <MeterValue />
    </Meter>
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
      <div className="fit-rows">
        {FITS.map((f) => (
          <Row
            key={f}
            label={FIT_LABEL[f]}
            p={result.fit.probabilities ? (result.fit.probabilities[f] ?? 0) : null}
            chosen={f === result.fit.choice}
          />
        ))}
      </div>

      <h3>Closest project</h3>
      {topWorks.length > 0 ? (
        <div className="fit-rows">
          {topWorks.map(({ w, p }) => (
            <Row key={w.slug} label={w.title} p={p} chosen={w.slug === result.closest.choice} />
          ))}
        </div>
      ) : null}
      {closest && (
        <p>
          <Button
            className="mn-link"
            onClick={() => invoke(toolByName.get("open_project")!, { slug: closest.slug }, "visitor")}
          >
            Open {closest.title}
          </Button>
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
  const ready = !busy && brief.trim().length >= 3;

  return (
    <div className="fit">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (ready) invoke(toolByName.get("check_fit")!, { brief }, "visitor");
        }}
      >
        <Field>
          <FieldLabel>Job ad, project brief or a yes-or-no question</FieldLabel>
          <Textarea
            value={brief}
            maxLength={BRIEF_MAX}
            rows={5}
            submitShortcut="mod+enter"
            onValueChange={(value) => store.setBrief(value)}
          />
        </Field>
        <p className="fit-examples">
          Try:{" "}
          {EXAMPLES.map((ex, i) => (
            <span key={ex}>
              <Button className="mn-link" onClick={() => store.setBrief(ex)}>
                {ex}
              </Button>
              {i < EXAMPLES.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
        <p className="fit-actions">
          <Button className="mn-btn" type="submit" disabled={!ready} focusableWhenDisabled>
            {busy ? "Checking…" : "Check"}
          </Button>
          {busy && (
            <Button className="mn-link" onClick={() => store.stopDesk()}>
              Stop
            </Button>
          )}
        </p>
      </form>

      <div aria-live="polite">
        {busy && <p className="mn-quiet">Jev is reading it…</p>}
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
