import type { ReactNode } from "react";
import type { Translator, TranslationKey } from "../context/LanguageContext";

/** Page sections in page order; drives the nav, the indices and the anchors. */
export const SECTIONS = [
  { id: "about", nav: "nav.about" },
  { id: "work", nav: "nav.work" },
  { id: "experience", nav: "nav.experience" },
  { id: "education", nav: "nav.education" },
  { id: "skills", nav: "nav.skills" },
  { id: "languages", nav: "nav.languages" },
  { id: "contact", nav: "nav.contact" },
] as const satisfies readonly { id: string; nav: TranslationKey }[];

export type SectionId = (typeof SECTIONS)[number]["id"];

export const pad = (n: number) => String(n).padStart(2, "0");

export const sectionNumber = (id: SectionId) => pad(SECTIONS.findIndex((s) => s.id === id) + 1);

type ArrowDirection = "out" | "down" | "right" | "up";

const ARROW_PATHS: Record<ArrowDirection, string> = {
  out: "M7 17 17 7M8 7h9v9",
  down: "M12 4v15M5 12l7 7 7-7",
  right: "M4 12h15M12 5l7 7-7 7",
  up: "M12 20V5M5 12l7-7 7 7",
};

export function Arrow({ dir, className = "arrow" }: { dir: ArrowDirection; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d={ARROW_PATHS[dir]} stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

/** External link that opens in a new tab and says so to assistive tech. */
export function ExternalLink({
  href,
  t,
  className,
  children,
}: {
  href: string;
  t: Translator;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> {t("a11y.newTab")}</span>
    </a>
  );
}

export function SectionHead({
  id,
  title,
  intro,
}: {
  id: SectionId;
  title: string;
  intro?: string;
}) {
  return (
    <header className="sec-head grid-12">
      <p className="sec-index col-span-full lg:col-span-3" aria-hidden="true">
        <span>{sectionNumber(id)}</span>
        <span>/ {pad(SECTIONS.length)}</span>
      </p>
      <h2 id={`${id}-title`} className="sec-title col-span-full lg:col-span-9">
        {title}
      </h2>
      {intro ? <p className="sec-intro col-span-full lg:col-span-6 lg:col-start-4">{intro}</p> : null}
    </header>
  );
}
