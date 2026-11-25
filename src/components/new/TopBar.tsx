"use client";

import { Button } from "@ui-sdk/react/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ui-sdk/react/navigation-menu";
import { useEffect, useState } from "react";
import { applyTheme, type Theme } from "../../lib/theme";
import { BombDefuse } from "./BombDefuse";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#fit", label: "Fit check" },
  { href: "#setup", label: "Setup" },
  { href: "#contact", label: "Contact" },
];

/** `bomb`: switching from dark to light first asks the visitor to defuse a bomb (shown at /new/1). */
export function TopBar({ bomb = false }: { bomb?: boolean }) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [armed, setArmed] = useState(false);

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
      <NavigationMenu aria-label="Sections">
        <NavigationMenuList>
          {NAV.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink href={item.href}>{item.label}</NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
        <Button onClick={() => (bomb && next === "light" ? setArmed(true) : applyTheme(next))} disabled={!theme}>
          {next === "dark" ? "Dark" : "Light"}
        </Button>
      </NavigationMenu>
      {armed && <BombDefuse onClose={() => setArmed(false)} />}
    </header>
  );
}
