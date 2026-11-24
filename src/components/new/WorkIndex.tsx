"use client";

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@ui-sdk/react/accordion";
import { createHoverCardController, HoverCard, HoverCardContent } from "@ui-sdk/react/hover-card";
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
} from "@ui-sdk/react/segmented-control";
import Image from "next/image";
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { LANES, LANE_LABEL, STATUS_LABEL, workBySlug, worksFor, type Work } from "../../data/showcase";
import { ParticleStage } from "./particles/ParticleStage";
import { store, useStore } from "./store";

/** Rows glide from their old position when the filter changes. */
function useFlip(key: string, list: React.RefObject<HTMLElement | null>) {
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

function Row({ work, stage }: { work: Work; stage: boolean }) {
  return (
    <AccordionItem value={work.slug} id={`work-${work.slug}`} data-slug={work.slug} className="ix-row" render={<li />}>
      <AccordionHeader>
        <AccordionTrigger className="ix-row__head" data-preview={work.preview ? work.slug : undefined}>
          <span className="ix-year">{work.year}</span>
          <span className="ix-title">{work.title}</span>
          <span className="ix-kicker">{work.kicker}</span>
          <span className="ix-status" data-status={work.status}>
            {STATUS_LABEL[work.status]}
          </span>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionPanel className="mn-panel">
        <div className="ix-body">
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
      </AccordionPanel>
    </AccordionItem>
  );
}

/** Screenshot that follows the pointer while it is over a closed row that has one. */
function HoverPreview({ list }: { list: React.RefObject<HTMLElement | null> }) {
  const [card] = useState(() => createHoverCardController<Work>());
  // The card re-reads a virtual anchor every frame while it is open, so it tracks the pointer.
  const [pointer] = useState(() => {
    const at = { x: 0, y: 0, getBoundingClientRect: () => new DOMRect(at.x, at.y, 0, 0) };
    return at;
  });

  useLayoutEffect(() => {
    const el = list.current!;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const move = (e: PointerEvent) => {
      if (!fine.matches) return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      const head = (e.target as Element).closest<HTMLElement>("[data-preview]");
      const work = head && !head.hasAttribute("data-open") ? workBySlug.get(head.dataset.preview!) : undefined;
      if (!work) card.close();
      else if (!card.isOpen() || card.getPayload() !== work) card.open({ payload: work });
    };
    const leave = () => card.close();
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [list, card, pointer]);

  return (
    <HoverCard controller={card}>
      <HoverCardContent<Work>
        className="ix-float"
        anchor={pointer}
        side="right"
        align="start"
        sideOffset={24}
        alignOffset={-90}
        collisionPadding={16}
        aria-hidden="true"
      >
        {({ payload }) =>
          payload?.preview && <Image src={payload.preview.src} width={480} height={300} alt="" loading="eager" />
        }
      </HoverCardContent>
    </HoverCard>
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

/** `particles` shows the particle stage; without it a screenshot follows the pointer over rows. */
export function WorkIndex({ particles = false }: { particles?: boolean }) {
  const lane = useStore((s) => s.lane);
  const source = useStore((s) => s.laneSource);
  const open = useStore((s) => s.openWork);
  const shown = worksFor(lane);
  const list = useRef<HTMLOListElement>(null);
  useFlip(shown.map((w) => w.slug).join(), list);
  const wide = useWide() && particles;
  const [hovered, setHovered] = useState<string | null>(null);
  const openShown = shown.some((w) => w.slug === open) ? open : null;
  const onPointerOver = (e: React.PointerEvent) => {
    const slug = (e.target as HTMLElement).closest<HTMLElement>("[data-slug]")?.dataset.slug;
    if (slug) setHovered(slug);
  };

  return (
    <>
      <div className="ix-filter">
        <SegmentedControl
          aria-label="Filter projects"
          value={lane ?? "all"}
          onValueChange={(value) => store.setLane(LANES.find((l) => l === value) ?? null)}
        >
          <SegmentedControlIndicator />
          {[null, ...LANES].map((l) => (
            <SegmentedControlItem key={l ?? "all"} value={l ?? "all"}>
              {l ? LANE_LABEL[l] : "All"}
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
        {source === "jev" && lane && <span className="ix-note">Filtered by the fit check below</span>}
      </div>
      {/* Hover is tracked on the list and the stage together, so the shape holds while the pointer moves onto it. */}
      <div className="ix-wrap" data-stage={particles || undefined} onPointerOver={onPointerOver} onPointerLeave={() => setHovered(null)}>
        <Accordion
          render={<ol ref={list} />}
          className="ix"
          value={open ? [open] : []}
          onValueChange={(value) => store.openWork(value[0] ?? null)}
        >
          {shown.map((work) => (
            <Row key={work.slug} work={work} stage={particles && !wide} />
          ))}
        </Accordion>
        {wide && (
          <div className="ix-aside">
            <ParticleStage slug={openShown ?? hovered} className="ix-stage" />
          </div>
        )}
      </div>
      {!particles && <HoverPreview list={list} />}
    </>
  );
}
