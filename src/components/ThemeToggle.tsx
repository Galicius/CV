"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const THEME_COLORS: Record<Theme, string> = { dark: "#0e0e0d", light: "#f1eee7" };
const listeners = new Set<() => void>();

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute("content", THEME_COLORS[theme]));
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => listeners.delete(notify);
}

export function ThemeToggle({ label, lightLabel, darkLabel }: { label: string; lightLabel: string; darkLabel: string }) {
  // null on the server: the active state is then drawn by CSS from `data-theme`.
  const theme = useSyncExternalStore(subscribe, readTheme, () => null);

  useEffect(() => {
    // Keep the browser chrome in sync with an explicit choice, and follow the
    // system setting live as long as the visitor has not picked a theme.
    applyTheme(readTheme());
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {}
      if (!stored) applyTheme(media.matches ? "light" : "dark");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const choose = (next: Theme) => {
    try {
      localStorage.setItem("theme", next);
    } catch {}
    applyTheme(next);
  };

  return (
    <div className="seg theme-toggle" role="group" aria-label={label}>
      {(["light", "dark"] as const).map((value) => (
        <button
          key={value}
          type="button"
          className="seg__btn"
          data-value={value}
          aria-pressed={theme === null ? undefined : theme === value}
          onClick={() => choose(value)}
        >
          {value === "light" ? lightLabel : darkLabel}
        </button>
      ))}
    </div>
  );
}
