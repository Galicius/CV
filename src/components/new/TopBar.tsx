"use client";

import { useEffect, useState } from "react";
import { applyTheme, type Theme } from "../../lib/theme";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#setup", label: "Setup" },
  { href: "#fit", label: "Fit check" },
  { href: "#contact", label: "Contact" },
];

export function TopBar() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const read = () => setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <header className="mn-bar">
      <a className="mn-bar__name" href="#top">
        Gal Guštin
      </a>
      <nav aria-label="Sections">
        {NAV.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <button type="button" onClick={() => applyTheme(next)} disabled={!theme}>
          {next === "dark" ? "Dark" : "Light"}
        </button>
      </nav>
    </header>
  );
}
