"use client";

import { Button } from "@ui-sdk/react/button";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@ui-sdk/react/collapsible";
import { Field, FieldError, FieldLabel } from "@ui-sdk/react/field";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@ui-sdk/react/tabs";
import { Textarea } from "@ui-sdk/react/textarea";
import { Timeline, TimelineDescription, TimelineItem, TimelineTime, TimelineTitle } from "@ui-sdk/react/timeline";
import { useState } from "react";
import { useStore, type LogEntry } from "./store";
import { invoke, tools, type Tool } from "./tools";

const json = (v: unknown) => JSON.stringify(v, null, 2);

function parse(text: string): Record<string, unknown> | undefined {
  try {
    return JSON.parse(text || "{}");
  } catch {
    return undefined;
  }
}

function ToolRunner({ tool }: { tool: Tool }) {
  const [args, setArgs] = useState(() => JSON.stringify(tool.example));
  const [output, setOutput] = useState<string | null>(null);
  const parsed = parse(args);

  return (
    <>
      <p>{tool.description}</p>
      <Field invalid={parsed === undefined}>
        <FieldLabel>Arguments (JSON)</FieldLabel>
        <Textarea rows={3} spellCheck={false} value={args} onValueChange={setArgs} />
        <FieldError>That isn&apos;t valid JSON.</FieldError>
      </Field>
      <Button
        className="mn-btn"
        disabled={parsed === undefined}
        pendingAnnouncement={`Running ${tool.name}`}
        onClick={async () => setOutput(json(await invoke(tool, parsed!, "visitor")))}
      >
        Run {tool.name}
      </Button>
      {output && <pre>{output}</pre>}
    </>
  );
}

function Call({ entry }: { entry: LogEntry }) {
  return (
    <TimelineItem className="ag-call" data-error={entry.ok ? undefined : ""}>
      <TimelineTitle>
        {entry.caller === "agent" ? "Agent" : "You"} ran {entry.tool}
        {entry.ok ? "" : " (error)"}
      </TimelineTitle>
      <TimelineTime dateTime={new Date(entry.at).toISOString()}>
        {new Date(entry.at).toLocaleTimeString("en-GB")}
      </TimelineTime>
      <TimelineDescription render={<div />}>
        <Collapsible>
          <CollapsibleTrigger className="mn-link">Input and result</CollapsibleTrigger>
          <CollapsiblePanel className="mn-panel">
            <p>Input</p>
            <pre>{json(entry.args)}</pre>
            <p>Result</p>
            <pre>{json(entry.result)}</pre>
          </CollapsiblePanel>
        </Collapsible>
      </TimelineDescription>
    </TimelineItem>
  );
}

export function AgentConsole() {
  const webmcp = useStore((s) => s.webmcp);
  const log = useStore((s) => s.log);

  return (
    <div className="ag">
      <p>
        {webmcp === "active"
          ? "Your browser supports WebMCP, so an AI agent can use these tools on this page right now."
          : "Your browser doesn't support WebMCP yet. In browsers that do, an AI agent can use these tools on this page."}{" "}
        The agent gets typed actions like &ldquo;list projects&rdquo; or &ldquo;draft a message&rdquo; instead of
        guessing which buttons to press. It can draft a message but can&apos;t send one.
      </p>

      <Collapsible>
        <CollapsibleTrigger className="mn-link">Try the tools yourself</CollapsibleTrigger>
        <CollapsiblePanel className="mn-panel">
          <Tabs className="ag-grid" orientation="vertical">
            <TabsList aria-label="Tools">
              {tools.map((t) => (
                <TabsTab key={t.name} value={t.name}>
                  {t.name}
                </TabsTab>
              ))}
            </TabsList>
            {tools.map((t) => (
              <TabsPanel key={t.name} value={t.name} className="ag-run" keepMounted>
                <ToolRunner tool={t} />
              </TabsPanel>
            ))}
          </Tabs>
          {log.length > 0 && (
            <Timeline aria-label="Recent calls" className="ag-log">
              {log.map((e) => (
                <Call key={e.id} entry={e} />
              ))}
            </Timeline>
          )}
        </CollapsiblePanel>
      </Collapsible>
    </div>
  );
}
