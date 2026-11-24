"use client";

import { useSyncExternalStore } from "react";
import type { Lane } from "../../data/showcase";
import type { JevVerdict } from "../../lib/jev";

export type Desk =
  | { status: "idle" }
  | { status: "running"; brief: string }
  | { status: "done"; brief: string; result: JevVerdict }
  | { status: "error"; brief: string; message: string };

export type Caller = "agent" | "visitor";

export type LogEntry = {
  id: number;
  caller: Caller;
  tool: string;
  args: unknown;
  result: unknown;
  ok: boolean;
  at: number;
};

export type Draft = { name: string; email: string; message: string };

export type WebMcp = "checking" | "active" | "absent";

type State = {
  /** Kind of work the index is filtered to; `null` shows everything. */
  lane: Lane | null;
  /** Set when the filter came from a Jev answer rather than a click. */
  laneSource: "visitor" | "jev";
  openWork: string | null;
  brief: string;
  desk: Desk;
  draft: Draft;
  log: LogEntry[];
  webmcp: WebMcp;
};

let state: State = {
  lane: null,
  laneSource: "visitor",
  openWork: null,
  brief: "",
  desk: { status: "idle" },
  draft: { name: "", email: "", message: "" },
  log: [],
  webmcp: "checking",
};

const listeners = new Set<() => void>();

/** The fit check in flight. A newer run or a stop aborts it and owns the desk from then on. */
let deskRun: AbortController | null = null;

function set(patch: Partial<State>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export const store = {
  get: () => state,
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  setLane: (lane: Lane | null, laneSource: State["laneSource"] = "visitor") => set({ lane, laneSource }),
  openWork: (slug: string | null) => set({ openWork: slug }),
  setBrief: (brief: string) => set({ brief }),
  setDraft: (draft: Partial<Draft>) => set({ draft: { ...state.draft, ...draft } }),
  setWebMcp: (webmcp: WebMcp) => set({ webmcp }),

  log(entry: Omit<LogEntry, "id" | "at">) {
    const id = (state.log[0]?.id ?? 0) + 1;
    set({ log: [{ ...entry, id, at: Date.now() }, ...state.log].slice(0, 30) });
  },

  async runDesk(brief: string): Promise<Desk> {
    deskRun?.abort();
    const run = (deskRun = new AbortController());
    set({ brief, desk: { status: "running", brief } });
    let desk: Desk;
    try {
      const res = await fetch("/api/jev", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ brief }),
        signal: run.signal,
      });
      const body = (await res.json()) as JevVerdict | { error: string };
      desk =
        "error" in body
          ? { status: "error", brief, message: body.error }
          : { status: "done", brief, result: body };
    } catch {
      desk = run.signal.aborted ? { status: "idle" } : { status: "error", brief, message: "Could not reach the server." };
    }
    if (deskRun !== run) return desk;
    deskRun = null;
    set({ desk });
    if (desk.status === "done") store.setLane(desk.result.lane.choice, "jev");
    return desk;
  },

  stopDesk() {
    deskRun?.abort();
    deskRun = null;
    set({ desk: { status: "idle" } });
  },
};

export function useStore<T>(select: (s: State) => T): T {
  return useSyncExternalStore(
    store.subscribe,
    () => select(state),
    () => select(state),
  );
}
