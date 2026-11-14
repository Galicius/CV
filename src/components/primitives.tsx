import type { ReactNode } from "react";
import type { Translate } from "../context/LanguageContext";

export function ArrowUpRight() {
  return (
    <svg className="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function ArrowDown() {
  return (
    <svg className="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M8 2.5v9M4 8l4 4 4-4M3 14.5h10" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** Link to another site: opens in a new tab and says so to assistive tech. */
export function ExternalLink({
  href,
  t,
  className,
  children,
}: {
  href: string;
  t: Translate;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ArrowUpRight />
      <span className="sr-only"> {t("a11y.newTab")}</span>
    </a>
  );
}

/**
 * "Jun 2022 - Mar 2026" → two runs joined by an en dash, so the margin can
 * stack them. `current` sets the open end ("Present") in the accent colour.
 */
export function Period({ value, current = false }: { value: string; current?: boolean }) {
  const [start, end] = value.split(" - ");
  if (!end) return <span className="period">{value}</span>;
  return (
    <span className="period">
      <span className="period__start">{start}&nbsp;–</span> <span className={current ? "period__end period__end--current" : "period__end"}>{end}</span>
    </span>
  );
}

/** "https://gitlab.com/user/repo/" → "gitlab.com/user/repo" */
export function displayUrl(href: string) {
  const url = new URL(href);
  return `${url.hostname.replace(/^www\./, "")}${url.pathname}`.replace(/\/$/, "");
}

/** A numbered section with its heading in the left margin on wide screens. */
export function Section({
  id,
  number,
  title,
  intro,
  className,
  children,
}: {
  id: string;
  number: number;
  title: string;
  intro?: string;
  className?: string;
  children: ReactNode;
}) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className={`section page${className ? ` ${className}` : ""}`}>
      <div className="section__head">
        <p className="section__number" aria-hidden="true">
          §&nbsp;{number}
        </p>
        <h2 id={headingId} className="section__title">
          {title}
        </h2>
        {intro ? <p className="section__intro">{intro}</p> : null}
      </div>
      <div className="section__body">{children}</div>
    </section>
  );
}
