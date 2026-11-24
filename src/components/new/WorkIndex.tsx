"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { LANES, LANE_LABEL, STATUS_LABEL, worksFor, type Work } from "../../data/showcase";
import { ParticleStage } from "./particles/ParticleStage";
import { store, useStore } from "./store";

/** Rows glide from their old position when the filter changes. */
function useFlip(key: string, list: React.RefObject<HTMLOListElement | null>) {
  const rects = useRef(new Map<string, number>());
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    for (const el of [...(list.current?.children ?? [])] as HTMLElement[]) {
      const slug = el.dataset.slug!;
      const top = el.getBoundingClientRect().top;
      const prev = rects.current.get(slug);
      rects.current.set(slug, top);
      if (reduced) continue;
      if (prev === undefined) el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250 });
      else if (Math.abs(prev - top) > 1)
        el.animate([{ transform: `translateY(${prev - top}px)` }, { transform: "none" }], {
          duration: 380,
          easing: "cubic-bezier(.2,.7,.2,1)",
        });
    }
  }, [key, list]);
}

function Row({ work, open, stage }: { work: Work; open: boolean; stage: boolean }) {
  const id = `work-${work.slug}`;
  return (
    <li id={id} data-slug={work.slug} className="ix-row" data-open={open || undefined}>
      <button
        type="button"
        className="ix-row__head"
        aria-expanded={open}
        aria-controls={`${id}-body`}
        onClick={() => store.openWork(open ? null : work.slug)}
      >
        <span className="ix-year">{work.year}</span>
        <span className="ix-title">{work.title}</span>
        <span className="ix-kicker">{work.kicker}</span>
        <span className="ix-status" data-status={work.status}>
          {STATUS_LABEL[work.status]}
        </span>
      </button>
      <div id={`${id}-body`} className="ix-body" hidden={!open}>
        {stage && <ParticleStage slug={work.slug} className="ix-stage" />}
        <div className="ix-body__text">
          <p>{work.summary}</p>
          <ul>
            {work.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="ix-stack">{work.stack.join(", ")}</p>
          {work.link && (
            <p>
              <a href={work.link.href} target="_blank" rel="noreferrer">
                {work.link.label}
              </a>
            </p>
          )}
        </div>
        {work.preview && (
          <Image
            className="ix-body__shot"
            src={work.preview.src}
            width={work.preview.width}
            height={work.preview.height}
            alt={`${work.title} home page`}
            sizes="(min-width: 900px) 24rem, 100vw"
          />
        )}
      </div>
    </li>
  );
}

const WIDE = "(min-width: 900px)";
const onWideChange = (cb: () => void) => {
  const query = window.matchMedia(WIDE);
  query.addEventListener("change", cb);
  return () => query.removeEventListener("change", cb);
};

/** True when the work list has room for the particle stage beside it. False on the server. */
function useWide() {
  return useSyncExternalStore(
    onWideChange,
    () => window.matchMedia(WIDE).matches,
    () => false,
  );
}

export function WorkIndex() {
  const lane = useStore((s) => s.lane);
  const source = useStore((s) => s.laneSource);
  const open = useStore((s) => s.openWork);
  const shown = worksFor(lane);
  const list = useRef<HTMLOListElement>(null);
  useFlip(shown.map((w) => w.slug).join(), list);
  const wide = useWide();
  const [hovered, setHovered] = useState<string | null>(null);
  const openShown = shown.some((w) => w.slug === open) ? open : null;
  const onPointerOver = (e: React.PointerEvent) => {
    const slug = (e.target as HTMLElement).closest<HTMLElement>("[data-slug]")?.dataset.slug;
    if (slug) setHovered(slug);
  };

  return (
    <>
      <div className="ix-filter" role="group" aria-label="Filter projects">
        {[null, ...LANES].map((l) => (
          <button key={l ?? "all"} type="button" aria-pressed={lane === l} onClick={() => store.setLane(l)}>
            {l ? LANE_LABEL[l] : "All"}
          </button>
        ))}
        {source === "jev" && lane && <span className="ix-note">Filtered by the fit check below</span>}
      </div>
      {/* Hover is tracked on the list and the stage together, so the shape holds while the pointer moves onto it. */}
      <div className="ix-wrap" onPointerOver={onPointerOver} onPointerLeave={() => setHovered(null)}>
        <ol className="ix" ref={list}>
          {shown.map((work) => (
            <Row key={work.slug} work={work} open={open === work.slug} stage={!wide && open === work.slug} />
          ))}
        </ol>
        {wide && (
          <div className="ix-aside">
            <ParticleStage slug={openShown ?? hovered} className="ix-stage" />
          </div>
        )}
      </div>
    </>
  );
}
