"use client";

import { useEffect, useRef, useState } from "react";
import { applyTheme } from "../../lib/theme";
import styles from "./BombDefuse.module.css";

const WIRES = ["blue", "red"] as const;
type Wire = (typeof WIRES)[number];
type Phase = "armed" | "defused" | "boom";

const SECONDS = 5;
const RESULT_SHOWN_MS = 1100;

/**
 * Stands between a dark-mode visitor and a sudden white page. Cut both wires
 * within five seconds and the page stays dark; run out of time and the light
 * comes on. Closing the dialog (Escape) before then also stays dark.
 */
export function BombDefuse({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [cut, setCut] = useState<ReadonlySet<Wire>>(new Set());
  const [left, setLeft] = useState(SECONDS);
  const phase: Phase = cut.size === WIRES.length ? "defused" : left === 0 ? "boom" : "armed";

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  useEffect(() => {
    if (phase !== "armed") return;
    const id = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, left]);

  useEffect(() => {
    if (phase === "armed") return;
    const id = setTimeout(() => {
      if (phase === "boom") applyTheme("light");
      onClose();
    }, RESULT_SHOWN_MS);
    return () => clearTimeout(id);
  }, [phase, onClose]);

  const snip = (wire: Wire) => {
    if (phase === "armed") setCut((prev) => new Set(prev).add(wire));
  };

  const status =
    phase === "defused"
      ? "Defused. Staying dark."
      : phase === "boom"
        ? "Boom. Lights on."
        : "Cut both wires to stay in dark mode.";

  return (
    <dialog
      ref={dialog}
      className={styles.bomb}
      data-phase={phase}
      aria-label="Defuse the bomb to stay in dark mode"
      aria-describedby="bomb-status"
      onCancel={(e) => {
        e.preventDefault();
        if (phase === "armed") onClose();
      }}
    >
      <p className={styles.timer}>00:0{left}</p>

      <svg className={styles.wires} viewBox="0 0 240 90" aria-hidden="true">
        <rect x="2" y="10" width="14" height="70" className={styles.post} />
        <rect x="224" y="10" width="14" height="70" className={styles.post} />
        {WIRES.map((wire, i) => {
          const y = 30 + i * 30;
          return (
            <g key={wire} className={styles[wire]}>
              {cut.has(wire) ? (
                <>
                  <path d={`M16 ${y} C60 ${y - 18} 90 ${y + 18} 112 ${y + 4}`} />
                  <path d={`M128 ${y - 4} C150 ${y - 14} 190 ${y + 14} 224 ${y}`} />
                </>
              ) : (
                <path d={`M16 ${y} C80 ${y - 22} 160 ${y + 22} 224 ${y}`} />
              )}
            </g>
          );
        })}
      </svg>

      <div className={styles.cutters}>
        {WIRES.map((wire) => (
          <button
            key={wire}
            type="button"
            className={styles[wire]}
            onClick={() => snip(wire)}
            disabled={phase !== "armed" || cut.has(wire)}
          >
            {cut.has(wire) ? `${wire} cut` : `Cut ${wire}`}
          </button>
        ))}
      </div>

      <p id="bomb-status" className={styles.status} role="status">
        {status}
      </p>
    </dialog>
  );
}
