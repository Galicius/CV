"use client";

import { useEffect } from "react";
import { store } from "./store";
import { invoke, tools } from "./tools";

type ModelContext = {
  registerTool(
    tool: {
      name: string;
      description: string;
      inputSchema: object;
      annotations?: { readOnlyHint?: boolean };
      execute: (input: Record<string, unknown>) => Promise<unknown>;
    },
    options?: { signal?: AbortSignal },
  ): unknown;
};

/** `document.modelContext` is current; Chromium 150 deprecated `navigator.modelContext`. */
function modelContext(): ModelContext | null {
  const doc = document as Document & { modelContext?: ModelContext };
  const nav = navigator as Navigator & { modelContext?: ModelContext };
  return doc.modelContext ?? nav.modelContext ?? null;
}

export function WebMcpBridge() {
  useEffect(() => {
    const mc = modelContext();
    if (!mc) {
      store.setWebMcp("absent");
      return;
    }
    const controller = new AbortController();
    Promise.all(
      tools.map((tool) =>
        mc.registerTool(
          {
            name: tool.name,
            description: tool.description,
            inputSchema: tool.inputSchema,
            annotations: { readOnlyHint: tool.readOnly },
            execute: (input) => invoke(tool, input, "agent"),
          },
          { signal: controller.signal },
        ),
      ),
    ).then(
      () => store.setWebMcp(controller.signal.aborted ? "checking" : "active"),
      (error) => {
        console.error("WebMCP registration failed", error);
        store.setWebMcp("absent");
      },
    );
    return () => controller.abort();
  }, []);

  return null;
}
