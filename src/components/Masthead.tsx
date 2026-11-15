import { getTranslator, pick, type Language } from "../context/LanguageContext";
import { personal } from "../data/portfolio";
import { ArrowDown, ArrowUpRight, displayUrl } from "./primitives";

export function Masthead({ lang }: { lang: Language }) {
  const t = getTranslator(lang);
  const facts = [
    { value: "4+", label: t("about.years") },
    { value: "8+", label: t("about.projects") },
    { value: "15+", label: t("about.tech") },
    { value: "3", label: t("about.langs") },
  ];

  return (
    <div className="masthead page">
      <p className="masthead__kicker">
        <span>{personal.title}</span>
        <span>{personal.location}</span>
      </p>

      <h1 className="masthead__name">{personal.name}</h1>

      <div className="masthead__grid">
        <div className="masthead__role">
          <p className="masthead__status">{t("hero.available")}</p>
        </div>

        <div className="masthead__lede">
          <p className="lede">{pick(personal.subtitle, lang)}</p>
          <p className="masthead__print-contact print-only">
            {personal.email} · {displayUrl(personal.github)} · {personal.location}
          </p>

          <ul className="actions" role="list">
            <li>
              <a href="/cv.pdf" download="Gal-Gustin-CV.pdf" className="button button--primary">
                <ArrowDown />
                {t("hero.downloadCv")}
              </a>
            </li>
            <li>
              <a href={`mailto:${personal.email}`} className="button">
                {personal.email}
              </a>
            </li>
            <li>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="button">
                GitHub
                <ArrowUpRight />
                <span className="sr-only"> {t("a11y.newTab")}</span>
              </a>
            </li>
          </ul>

          <p id="about" className="masthead__about">
            {pick(personal.about, lang)}
          </p>
        </div>

        <dl className="facts">
          {facts.map((fact) => (
            <div key={fact.label} className="facts__row">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
