import type { Lane } from "../data/showcase";

export const FITS = ["strong", "solid", "stretch", "mismatch"] as const;
export type Fit = (typeof FITS)[number];

export const FIT_LABEL: Record<Fit, string> = {
  strong: "Strong fit",
  solid: "Solid fit",
  stretch: "Stretch",
  mismatch: "Not a fit",
};

export const BRIEF_MAX = 1200;

type Distribution<K extends string> = Partial<Record<K, number>> | null;

export type JevVerdict = {
  /** "demo" when the server has no Jev access and answered with a keyword heuristic. */
  mode: "live" | "demo";
  fit: { choice: Fit; probabilities: Distribution<Fit> };
  closest: { choice: string; probabilities: Distribution<string> };
  lane: { choice: Lane; probabilities: Distribution<Lane> };
  /** Probability that the answer to the brief, read as "should Gal take this on?", is yes. */
  verdict: number;
};
