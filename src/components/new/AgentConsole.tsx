"use client";

import { useState } from "react";
import { useStore } from "./store";
import { invoke, tools, toolByName } from "./tools";

export function AgentConsole() {
  const webmcp = useStore((s) => s.webmcp);
  const log = useStore((s) => s.log);
  const [selected, setSelected] = useState(tools[0].name);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [output, setOutput] = useState<{ tool: string; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const tool = toolByName.get(selected)!;
  const args = drafts[selected] ?? JSON.stringify(tool.example);
  let valid = true;
  try {
    JSON.parse(args || "{}");
  } catch {
    valid = false;
  }

  const run = async () => {
    setBusy(true);
    const result = await invoke(tool, JSON.parse(args || "{}"), "visitor");
    setOutput({ tool: tool.name, text: JSON.stringify(result, null, 2) });
    setBusy(false);
  };

  return (
    <div className="ag">
      <p>
        {webmcp === "active"
          ? "Your browser supports WebMCP, so an AI agent can use these tools on this page right now."
          : "Your browser doesn't support WebMCP yet. In browsers that do, an AI agent can use these tools on this page."}{" "}
        The agent gets typed actions like &ldquo;list projects&rdquo; or &ldquo;draft a message&rdquo; instead of
        guessing which buttons to press. It can draft a message but can&apos;t send one.
      </p>

      <details className="ag-try">
        <summary>Try the tools yourself</summary>
        <div className="ag-grid">
          <ul aria-label="Tools">
            {tools.map((t) => (
              <li key={t.name}>
                <button
                  type="button"
                  aria-pressed={t.name === selected}
                  onClick={() => {
                    setSelected(t.name);
                    setOutput(null);
                  }}
                >
                  {t.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="ag-run">
            <p>{tool.description}</p>
            <label htmlFor="ag-args">Arguments (JSON)</label>
            <textarea
              id="ag-args"
              rows={3}
              spellCheck={false}
              value={args}
              aria-invalid={!valid}
              onChange={(e) => setDrafts({ ...drafts, [selected]: e.target.value })}
            />
            <button type="button" className="mn-btn" onClick={run} disabled={busy || !valid}>
              Run {tool.name}
            </button>
            {output?.tool === selected && <pre>{output.text}</pre>}
          </div>
        </div>
        {log.length > 0 && (
          <ol className="ag-log" aria-label="Recent calls">
            {log.map((e) => (
              <li key={e.id}>
                {e.caller === "agent" ? "Agent" : "You"} ran {e.tool}
                {e.ok ? "" : " (error)"}
              </li>
            ))}
          </ol>
        )}
      </details>
    </div>
  );
}
