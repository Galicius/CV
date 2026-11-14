"use client";

import { useSyncExternalStore } from "react";
import { applyTheme } from "../lib/theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";
const isDarkOnServer = () => false;

export function ThemeToggle({ label }: { label: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, isDarkOnServer);

  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      aria-pressed={dark}
      title={label}
      onClick={() => applyTheme(dark ? "light" : "dark")}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3.75a8.25 8.25 0 0 1 0 16.5Z" fill="currentColor" />
      </svg>
      <span className="sr-only">{label}</span>
    </button>
  );
}
