import { Meter, MeterLabel, MeterValue } from "@ui-sdk/react/meter";
import { t3 } from "../../data/showcase";

const fmt = (n: number) => n.toLocaleString("en-GB");
const billions = (n: number) => `${(n / 1e9).toFixed(1)} billion`;

type Bar = { label: string; value: number; partial?: boolean };

/** Each column is a Meter against the busiest month; its bar and value label follow `--meter-value`. */
function Columns({ caption, bars, format }: { caption: string; bars: Bar[]; format: Intl.NumberFormatOptions }) {
  const peak = Math.max(...bars.map((b) => b.value));
  return (
    <figure className="t3-chart">
      <figcaption>{caption}</figcaption>
      <div className="t3-chart__cols" style={{ gridTemplateColumns: `repeat(${bars.length}, minmax(0, 1fr))` }}>
        {bars.map((b) => (
          <Meter key={b.label} className="t3-chart__col" value={b.value} max={peak} format={format} locale="en" tabIndex={0}>
            <MeterValue className="t3-chart__value" />
            <span className="t3-chart__bar" data-partial={b.partial || undefined} />
            <MeterLabel className="t3-chart__month">
              {b.label}
              {b.partial && <span className="sr-only"> (partial month)</span>}
            </MeterLabel>
          </Meter>
        ))}
      </div>
    </figure>
  );
}

export function ControlRoom() {
  const { tokens } = t3;
  return (
    <div className="t3">
      <p>
        I write specs, review diffs, and test the output while coding agents handle most of the implementation. I run
        Claude Code, Codex, and OpenCode side by side in T3 Code on my own subscriptions. Since {t3.since}, that
        covers {fmt(t3.threads)} threads: {fmt(t3.spawnedByAgents)} spawned by agents delegating subtasks and{" "}
        {fmt(t3.worktrees)} run in separate copies of the repository ({t3.families}).
      </p>
      <p>
        Since {tokens.since}, those runs used {billions(tokens.total)} tokens across {fmt(tokens.calls)} model calls (
        {tokens.split}), with {Math.round(tokens.cachedShare * 100)}% as cache reads. At API list prices that volume
        would cost roughly ${fmt(Math.round(tokens.apiCostUsd / 10) * 10)}; I run on subscriptions.
      </p>

      <div className="t3-charts">
        <Columns
          caption="Threads per month, 2026"
          bars={t3.months.map((m) => ({ label: m.month, value: m.threads, partial: m.partial }))}
          format={{ maximumFractionDigits: 0 }}
        />
        <Columns
          caption="Tokens per month, 2026"
          bars={tokens.months.map((m) => ({ label: m.month, value: m.tokens, partial: m.partial }))}
          format={{ notation: "compact", maximumFractionDigits: 1 }}
        />
      </div>

      <ul className="t3-notes">
        {t3.notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </div>
  );
}
