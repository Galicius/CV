import type { Translator } from "../context/LanguageContext";
import { personal } from "../data/portfolio";
import { Arrow, ExternalLink, SECTIONS, pad, sectionNumber } from "./ui";

export function Contact({ t }: { t: Translator }) {
  const githubHandle = personal.github.replace(/^https?:\/\/(www\.)?github\.com\//, "");

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <header className="sec-head grid-12">
          <p className="sec-index col-span-full lg:col-span-3">
            <span aria-hidden="true">{sectionNumber("contact")}</span>
            <span aria-hidden="true">/ {pad(SECTIONS.length)}</span>
            <span className="ml-3">{t("contact.label")}</span>
          </p>
          <h2 id="contact-title" className="contact__title col-span-full lg:col-span-9">
            {t("contact.title")}
          </h2>
          <p className="contact__text col-span-full mt-4 lg:col-span-6 lg:col-start-4">{t("contact.text")}</p>
        </header>

        <ul className="contact-list">
          <li>
            <a href={`mailto:${personal.email}`} className="contact-row bleed rule-b">
              <span className="label">{t("contact.email")}</span>
              <span className="contact-row__value">{personal.email}</span>
              <Arrow dir="right" />
            </a>
          </li>
          <li>
            <div className="contact-row bleed rule-b">
              <span className="label">{t("contact.location")}</span>
              <span className="contact-row__value">{personal.location}</span>
            </div>
          </li>
          <li>
            <ExternalLink href={personal.github} t={t} className="contact-row bleed rule-b">
              <span className="label">{t("contact.github")}</span>
              <span className="contact-row__value">{githubHandle}</span>
              <Arrow dir="out" />
            </ExternalLink>
          </li>
        </ul>

        <a href={`mailto:${personal.email}`} className="hello">
          {t("contact.button")}
          <Arrow dir="right" />
        </a>
      </div>
    </section>
  );
}
