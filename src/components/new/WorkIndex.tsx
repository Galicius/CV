"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { LANES, LANE_LABEL, STATUS_LABEL, worksFor, type Work } from "../../data/showcase";
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

function Row({ work, open }: { work: Work; open: boolean }) {
  const id = `work-${work.slug}`;
  return (
    <li id={id} data-slug={work.slug} className="ix-row" data-open={open || undefined}>
      <button
        type="button"
        className="ix-row__head"
        aria-expanded={open}
        aria-controls={`${id}-body`}
        onClick={() => store.openWork(open ? null : work.slug)}
        data-preview={work.slug}
      >
        <span className="ix-year">{work.year}</span>
        <span className="ix-title">{work.title}</span>
        <span className="ix-kicker">{work.kicker}</span>
        <span className="ix-status" data-status={work.status}>
          {STATUS_LABEL[work.status]}
        </span>
      </button>
      <div id={`${id}-body`} className="ix-body" hidden={!open}>
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

/** Screenshot that follows the pointer while it is over a row that has one. */
function HoverPreview({ list }: { list: React.RefObject<HTMLOListElement | null> }) {
  const [slug, setSlug] = useState<string | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = list.current!;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const move = (e: PointerEvent) => {
      if (!fine.matches) return;
      const row = (e.target as HTMLElement).closest<HTMLElement>("[data-preview]");
      const next = row?.closest("[data-open]") ? null : (row?.dataset.preview ?? null);
      setSlug(next);
      box.current?.style.setProperty("transform", `translate(${e.clientX + 24}px, ${e.clientY - 90}px)`);
    };
    const leave = () => setSlug(null);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [list]);

  const work = slug ? worksFor(null).find((w) => w.slug === slug) : undefined;
  return (
    <div ref={box} className="ix-float" aria-hidden="true" data-on={Boolean(work?.preview) || undefined}>
      {work?.preview && <Image src={work.preview.src} width={480} height={300} alt="" loading="eager" />}
    </div>
  );
}

export function WorkIndex() {
  const lane = useStore((s) => s.lane);
  const source = useStore((s) => s.laneSource);
  const open = useStore((s) => s.openWork);
  const shown = worksFor(lane);
  const list = useRef<HTMLOListElement>(null);
  useFlip(shown.map((w) => w.slug).join(), list);

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
      <ol className="ix" ref={list}>
        {shown.map((work) => (
          <Row key={work.slug} work={work} open={open === work.slug} />
        ))}
      </ol>
      <HoverPreview list={list} />
    </>
  );
}
