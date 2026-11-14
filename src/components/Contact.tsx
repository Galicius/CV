import { getTranslator, type Language } from "../context/LanguageContext";
import { personal } from "../data/portfolio";
import { ArrowDown, ArrowUpRight, Section } from "./primitives";

export function Contact({ lang }: { lang: Language }) {
  const t = getTranslator(lang);
  const newTab = <span className="sr-only"> {t("a11y.newTab")}</span>;

  return (
    <Section id="contact" number={6} title={t("contact.label")} className="section--contact">
      <p className="contact__statement">{t("contact.title")}</p>
      <p className="contact__text">{t("contact.text")}</p>

      <dl className="contact__list">
        <div className="contact__row">
          <dt>{t("contact.email")}</dt>
          <dd>
            <a href={`mailto:${personal.email}`} className="text-link">
              {personal.email}
            </a>
          </dd>
        </div>
        <div className="contact__row">
          <dt>{t("contact.location")}</dt>
          <dd>
            <a href="https://maps.google.com/?q=Maribor,Slovenia" target="_blank" rel="noopener noreferrer" className="text-link">
              {personal.location}
              <ArrowUpRight />
              {newTab}
            </a>
          </dd>
        </div>
        <div className="contact__row">
          <dt>{t("contact.github")}</dt>
          <dd>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="text-link print-url">
              Galicius
              <ArrowUpRight />
              {newTab}
            </a>
          </dd>
        </div>
      </dl>

      <ul className="actions actions--contact" role="list">
        <li>
          <a href={`mailto:${personal.email}`} className="button button--primary">
            {t("contact.button")}
          </a>
        </li>
        <li>
          <a href="/cv.pdf" download="Gal-Gustin-CV.pdf" className="button">
            <ArrowDown />
            {t("hero.downloadCv")}
          </a>
        </li>
      </ul>
    </Section>
  );
}
