import { t3 } from "../../data/showcase";

const fmt = (n: number) => n.toLocaleString("en-GB");
const billions = (n: number) => `${(n / 1e9).toFixed(1)} billion`;
const short = (n: number) => (n >= 1e9 ? `${(n / 1e9).toFixed(1)}B` : `${Math.round(n / 1e6)}M`);

type Bar = { label: string; value: number; text: string; partial?: boolean };

function Columns({ caption, bars }: { caption: string; bars: Bar[] }) {
  const peak = Math.max(...bars.map((b) => b.value));
  return (
    <figure className="t3-chart">
      <figcaption>{caption}</figcaption>
      <ol style={{ gridTemplateColumns: `repeat(${bars.length}, minmax(0, 1fr))` }}>
        {bars.map((b) => (
          <li
            key={b.label}
            tabIndex={0}
            style={{ "--h": `${Math.max(1, (b.value / peak) * 100)}%` } as React.CSSProperties}
            aria-label={`${b.label}: ${b.text}${b.partial ? " (partial month)" : ""}`}
          >
            <span className="t3-chart__value">{b.text}</span>
            <span className="t3-chart__bar" data-partial={b.partial || undefined} />
            <span className="t3-chart__month">{b.label}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function ControlRoom() {
  const { tokens } = t3;
  return (
    <div className="t3">
      <p>
        I run Claude Code, Codex and OpenCode side by side in T3 Code, on my own subscriptions. Since {t3.since} that
        has been {fmt(t3.threads)} threads. Agents started {fmt(t3.spawnedByAgents)} of them by handing work to other
        agents, and {fmt(t3.worktrees)} ran in their own copy of the repository. By thread count the split is{" "}
        {t3.families}.
      </p>
      <p>
        Since {tokens.since} the agents have used {billions(tokens.total)} tokens over {fmt(tokens.calls)} model calls
        ({tokens.split}). {Math.round(tokens.cachedShare * 100)}% of those were cheap cache reads. At API list prices
        that would have cost about ${fmt(Math.round(tokens.apiCostUsd / 10) * 10)}. I paid for subscriptions instead.
      </p>

      <div className="t3-charts">
        <Columns
          caption="Threads per month, 2026"
          bars={t3.months.map((m) => ({ label: m.month, value: m.threads, text: String(m.threads), partial: m.partial }))}
        />
        <Columns
          caption="Tokens per month, 2026"
          bars={tokens.months.map((m) => ({ label: m.month, value: m.tokens, text: short(m.tokens), partial: m.partial }))}
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
