"use client";

import { Button } from "@ui-sdk/react/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@ui-sdk/react/popover";
import { Progress, ProgressIndicator, ProgressTrack } from "@ui-sdk/react/progress";
import { useEffect, useState, type CSSProperties } from "react";
import { applyTheme, type Theme } from "../../lib/theme";
import styles from "./BombDefuse.module.css";

const WIRES = ["blue", "red"] as const;
type Wire = (typeof WIRES)[number];
type Phase = "armed" | "defused" | "boom";

const FUSE_MS = 5000;
const TICK_MS = 100;
const RESULT_SHOWN_MS = 1200;

/**
 * The theme switch on /new/1. Going dark is instant; going light from dark
 * drops a C4 charge under the switch. Cut both wires within five seconds and
 * the page stays dark. Let the timer run out and the lights come on.
 * Escape or a press outside walks away from it, which also stays dark.
 */
export function ThemeBomb({ theme }: { theme: Theme | null }) {
  const [open, setOpen] = useState(false);
  // A new key per open, so every charge starts with a full fuse and both wires intact.
  const [round, setRound] = useState(0);

  return (
    <Popover
      open={open}
      onOpenChange={(next, details) => {
        if (next && theme !== "dark") {
          details.cancel();
          applyTheme("dark");
          return;
        }
        if (next) setRound((r) => r + 1);
        setOpen(next);
      }}
    >
      <PopoverTrigger disabled={!theme} render={<Button />}>
        {theme === "dark" ? "Light" : "Dark"}
      </PopoverTrigger>
      <PopoverContent className={styles.pop} side="bottom" align="end" sideOffset={12} collisionPadding={12}>
        <Charge
          key={round}
          onDone={(phase) => {
            setOpen(false);
            if (phase === "boom") applyTheme("light");
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

function Charge({ onDone }: { onDone: (phase: Exclude<Phase, "armed">) => void }) {
  const [cut, setCut] = useState<ReadonlySet<Wire>>(new Set());
  const [remaining, setRemaining] = useState(FUSE_MS);
  const phase: Phase = cut.size === WIRES.length ? "defused" : remaining === 0 ? "boom" : "armed";

  useEffect(() => {
    if (phase !== "armed") return;
    const end = performance.now() + remaining;
    const id = setInterval(() => setRemaining(Math.max(0, Math.round(end - performance.now()))), TICK_MS);
    return () => clearInterval(id);
    // The fuse is set once per armed stretch; `remaining` only seeds it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (phase === "armed") return;
    const id = setTimeout(() => onDone(phase), RESULT_SHOWN_MS);
    return () => clearTimeout(id);
  }, [phase, onDone]);

  const snip = (wire: Wire) => {
    if (phase === "armed") setCut((prev) => new Set(prev).add(wire));
  };

  const seconds = Math.ceil(remaining / 1000);
  const status =
    phase === "defused"
      ? "Defused. Staying dark."
      : phase === "boom"
        ? "Boom. Lights on."
        : cut.size === 1
          ? "One more."
          : "Cut both wires before it hits zero.";

  return (
    <div className={styles.charge} data-phase={phase}>
      <PopoverTitle className={styles.title}>Light mode is armed</PopoverTitle>
      <PopoverDescription className={styles.sr}>
        Cut the blue and the red wire within five seconds to stay in dark mode.
      </PopoverDescription>

      <DotArt seconds={seconds} cut={cut} onCut={snip} />

      <Progress className={styles.fuse} value={(remaining / FUSE_MS) * 100} aria-label="Fuse">
        <ProgressTrack className={styles.track}>
          <ProgressIndicator className={styles.burn} />
        </ProgressTrack>
      </Progress>

      <div className={styles.cutters}>
        {WIRES.map((wire) => (
          <Button
            key={wire}
            className={styles.cutter}
            data-wire={wire}
            onClick={() => snip(wire)}
            disabled={phase !== "armed" || cut.has(wire)}
          >
            {cut.has(wire) ? `${wire} cut` : `Cut ${wire}`}
          </Button>
        ))}
      </div>

      <p className={styles.status} role="status">
        {status}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------ dot art -- */

/** Grid step in SVG units, and the art's size in grid cells. */
const U = 6;
const COLS = 46;
const ROWS = 32;
const CENTER = { x: 23, y: 19 };

type Dot = { x: number; y: number; r: number; o?: number };

/** 3×5 dot-matrix glyphs, one string of five rows per glyph. */
const GLYPHS: Record<string, string[]> = {
  "0": ["111", "101", "101", "101", "111"],
  "1": ["010", "110", "010", "010", "111"],
  "2": ["111", "001", "111", "100", "111"],
  "3": ["111", "001", "111", "001", "111"],
  "4": ["101", "101", "111", "001", "001"],
  "5": ["111", "100", "111", "001", "111"],
  C: ["111", "100", "100", "100", "111"],
};

function glyph(char: string, col: number, row: number, r = 1.6): Dot[] {
  return GLYPHS[char].flatMap((line, dy) =>
    [...line].flatMap((bit, dx) => (bit === "1" ? [{ x: col + dx, y: row + dy, r }] : [])),
  );
}

/** The parts of the charge that never change: the brick, its tape, the detonator box and the "C4" stamp. */
function buildCharge(): Dot[] {
  const dots: Dot[] = [];
  const brick = { l: 1, r: 44, t: 16, b: 30 };
  const bands = [8, 9, 10, 35, 36, 37];
  const stamp = new Set([...glyph("C", 20, 21), ...glyph("4", 24, 21)].map((d) => `${d.x},${d.y}`));

  for (let y = brick.t; y <= brick.b; y++) {
    for (let x = brick.l; x <= brick.r; x++) {
      const edgeX = x === brick.l || x === brick.r;
      const edgeY = y === brick.t || y === brick.b;
      if (edgeX && edgeY) continue; // rounded corners
      if (bands.includes(x)) continue;
      if (stamp.has(`${x},${y}`)) dots.push({ x, y, r: 1.6 });
      else if (edgeX || edgeY) dots.push({ x, y, r: 1.5 });
      else if ((x + y) % 2 === 0) dots.push({ x, y, r: 0.9, o: 0.45 });
    }
  }
  // Tape wraps past the brick by a row at each side.
  for (const x of bands) for (let y = brick.t - 1; y <= brick.b + 1; y++) dots.push({ x, y, r: 1.7 });

  // Detonator box, standing on two legs.
  const box = { l: 13, r: 33, t: 2, b: 12 };
  for (let x = box.l; x <= box.r; x++) dots.push({ x, y: box.t, r: 1.5 }, { x, y: box.b, r: 1.5 });
  for (let y = box.t + 1; y < box.b; y++) dots.push({ x: box.l, y, r: 1.5 }, { x: box.r, y, r: 1.5 });
  for (const x of [17, 29]) for (let y = box.b + 1; y < brick.t - 1; y++) dots.push({ x, y, r: 1.5 });
  return dots;
}

type Point = { x: number; y: number };

function bezier([a, b, c, d]: [number, number][], t: number): Point {
  const m = 1 - t;
  return {
    x: m * m * m * a[0] + 3 * m * m * t * b[0] + 3 * m * t * t * c[0] + t * t * t * d[0],
    y: m * m * m * a[1] + 3 * m * m * t * b[1] + 3 * m * t * t * c[1] + t * t * t * d[1],
  };
}

/** Dots along a cubic Bézier, about one grid step apart, with their position along it (0 to 1). */
function wireDots(p: [number, number][]): (Dot & { t: number })[] {
  const at = (t: number) => bezier(p, t);
  const out: (Dot & { t: number })[] = [];
  let last = at(0);
  out.push({ ...last, r: 1.9, t: 0 });
  for (let i = 1; i <= 400; i++) {
    const t = i / 400;
    const pt = at(t);
    if (Math.hypot(pt.x - last.x, pt.y - last.y) >= 0.95) {
      out.push({ ...pt, r: 1.9, t });
      last = pt;
    }
  }
  return out;
}

const WIRE_PATHS: Record<Wire, [number, number][]> = {
  blue: [
    [13, 6],
    [3, 3],
    [-1, 12],
    [5, 15],
  ],
  red: [
    [33, 6],
    [43, 3],
    [47, 12],
    [41, 15],
  ],
};

/** The stretch of wire the cutters take out, as positions along it. */
const GAP = [0.36, 0.64] as const;
const SWING_DEG = 16;

/**
 * Which way each half of a cut wire swings, in degrees about the end it is
 * still attached to: the way that moves its loose end away from the gap.
 */
function swing(p: [number, number][], half: "head" | "tail"): number {
  const anchor = bezier(p, half === "head" ? 0 : 1);
  const loose = bezier(p, half === "head" ? GAP[0] : GAP[1]);
  const gap = bezier(p, 0.5);
  // Rotating clockwise (positive, with y pointing down) moves the loose end along (-v.y, v.x).
  const v = { x: loose.x - anchor.x, y: loose.y - anchor.y };
  const away = { x: loose.x - gap.x, y: loose.y - gap.y };
  return Math.sign(-v.y * away.x + v.x * away.y) * SWING_DEG;
}

const CHARGE = buildCharge();
const WIRE_DOTS = { blue: wireDots(WIRE_PATHS.blue), red: wireDots(WIRE_PATHS.red) };
const SWING = {
  blue: { head: swing(WIRE_PATHS.blue, "head"), tail: swing(WIRE_PATHS.blue, "tail") },
  red: { head: swing(WIRE_PATHS.red, "head"), tail: swing(WIRE_PATHS.red, "tail") },
};

/** A small, stable pseudo-random number per dot, so the blast looks the same every time. */
const jitter = (i: number) => {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  return s - Math.floor(s);
};

/** Each dot's flight when the charge goes off: away from the centre, farther for the dots near it. */
function blast(d: Dot, i: number): CSSProperties {
  const dx = d.x - CENTER.x;
  const dy = d.y - CENTER.y;
  const len = Math.hypot(dx, dy) || 1;
  const power = (14 + jitter(i) * 26) * U;
  return {
    "--dx": `${(dx / len) * power}px`,
    "--dy": `${(dy / len) * power}px`,
    "--delay": `${jitter(i + 7) * 90}ms`,
  } as CSSProperties;
}

function DotArt({
  seconds,
  cut,
  onCut,
}: {
  seconds: number;
  cut: ReadonlySet<Wire>;
  onCut: (wire: Wire) => void;
}) {
  const digits = [...glyph("0", 15, 5), ...glyph("0", 19, 5), ...glyph("0", 25, 5), ...glyph(String(seconds), 29, 5)];

  const dot = (d: Dot, i: number, key: string) => (
    <circle key={key} cx={d.x * U} cy={d.y * U} r={d.r} opacity={d.o} style={blast(d, i)} />
  );

  return (
    <svg className={styles.art} viewBox={`${-U} ${-U} ${(COLS + 2) * U} ${(ROWS + 2) * U}`} aria-hidden="true">
      <g className={styles.body}>{CHARGE.map((d, i) => dot(d, i, `c${i}`))}</g>

      {/* 00:0N on the detonator. The colon blinks while it's armed. */}
      <g className={styles.digits}>
        {digits.map((d, i) => dot(d, i + 900, `d${i}`))}
      </g>
      <g className={styles.colon}>
        {dot({ x: 23, y: 6, r: 1.6 }, 980, "k1")}
        {dot({ x: 23, y: 8, r: 1.6 }, 981, "k2")}
      </g>

      {WIRES.map((wire) => {
        const isCut = cut.has(wire);
        const [start, c1, c2, end] = WIRE_PATHS[wire].map(([x, y]) => [x * U, y * U]);
        return (
          <g
            key={wire}
            className={styles.wire}
            data-wire={wire}
            data-cut={isCut || undefined}
            onClick={() => onCut(wire)}
          >
            {/* A fat invisible stroke makes the wire easy to hit with a pointer. */}
            <path
              className={styles.hit}
              d={`M${start} C${c1} ${c2} ${end}`}
            />
            {(["head", "tail"] as const).map((half) => (
              <g
                key={half}
                className={styles.half}
                data-half={half}
                style={{
                  transformOrigin: (half === "head" ? start : end).map((v) => `${v}px`).join(" "),
                  rotate: isCut ? `${SWING[wire][half]}deg` : undefined,
                }}
              >
                {WIRE_DOTS[wire]
                  .filter((d) => (half === "head" ? d.t < 0.5 : d.t >= 0.5))
                  .filter((d) => !isCut || d.t < GAP[0] || d.t > GAP[1])
                  .map((d, i) => dot(d, i + (wire === "blue" ? 600 : 700) + (half === "tail" ? 50 : 0), `${wire}${half}${i}`))}
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
