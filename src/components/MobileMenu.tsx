"use client";

import { useEffect, useRef, useState, type FocusEvent, type ReactNode } from "react";

/**
 * Disclosure for the section navigation on narrow screens. On wide screens the
 * navigation is always shown and the button is hidden (see .site-nav in CSS).
 */
export function MobileMenu({ label, navLabel, children }: { label: string; navLabel: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    const target = event.relatedTarget;
    if (!(target instanceof Node) || (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target))) {
      setOpen(false);
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        onBlur={onBlur}
        type="button"
        className="menu-button"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{label}</span>
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
          <path className="menu-button__top" d="M3 7h14" />
          <path className="menu-button__bottom" d="M3 13h14" />
        </svg>
      </button>
      <nav
        ref={panelRef}
        onBlur={onBlur}
        id="site-nav"
        className="site-nav"
        aria-label={navLabel}
        data-open={open}
        onClick={(event) => {
          if ((event.target as Element).closest("a")) setOpen(false);
        }}
      >
        {children}
      </nav>
    </>
  );
}
