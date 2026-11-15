import { getTranslator, pick, type Language } from "../context/LanguageContext";
import { education } from "../data/portfolio";
import { ExternalLink, Period, Section } from "./primitives";

export function Education({ lang }: { lang: Language }) {
  const t = getTranslator(lang);

  return (
    <Section id="education" number={3} title={t("edu.label")}>
      <ol className="entries" role="list">
        {education.map((item, index) => (
          <li key={item.id} className="entry">
            <p className="entry__meta">
              <Period value={pick(item.period, lang)} current={index === 0} />
            </p>
            <div className="entry__body">
              <h3 className="entry__title">{pick(item.degree, lang)}</h3>
              <p className="entry__org">
                <ExternalLink href={item.url} t={t} className="text-link text-link--block print-url">
                  {pick(item.institution, lang)}
                </ExternalLink>
                <span className="entry__sep" aria-hidden="true">
                  {" "}
                  ·{" "}
                </span>
                <span className="sr-only">, </span>
                {pick(item.location, lang)}
              </p>
              {item.level ? <p className="entry__note">{item.level}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
