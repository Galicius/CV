import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Fade-up reveal for a single element ref */
export function useFadeInUp(delay = 0) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(el, {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    });
    return () => mm.revert();
  }, [delay]);
  return ref;
}

/** Stagger reveal for a list of children inside a container */
export function useStaggerReveal(selector = ".stagger-item") {
  const containerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>(selector, container);
      gsap.from(items, {
        y: 35,
        autoAlpha: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    });
    return () => mm.revert();
  }, [selector]);
  return containerRef;
}

/** Track mouse position for project card glow spotlight */
export function useMouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("mousemove", onMouseMove);
    return () => el.removeEventListener("mousemove", onMouseMove);
  }, []);
  return ref;
}
