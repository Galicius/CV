"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type NavItem = { href: string; num: string; label: string };

/**
 * Below 1280px the section list lives in a disclosure panel under the header.
 * Escape and outside clicks close it, and focus returns to the button.
 */
export function NavMenu({
  items,
  menuLabel,
  closeLabel,
  navLabel,
  footer,
}: {
  items: NavItem[];
  menuLabel: string;
  closeLabel: string;
  navLabel: string;
  footer?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? closeLabel : menuLabel}
        <span className="menu-btn__icon" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>
      <div ref={panelRef} id={panelId} className="nav-panel" hidden={!open}>
        <nav className="wrap" aria-label={navLabel}>
          <ul className="nav-panel__list">
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  <span className="nav-link__num" aria-hidden="true">
                    {item.num}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {footer ? <div className="nav-panel__foot">{footer}</div> : null}
        </nav>
      </div>
    </>
  );
}
