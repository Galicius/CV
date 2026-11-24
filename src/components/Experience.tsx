import { getTranslator, pick, type Language } from "../context/LanguageContext";
import { experiences } from "../data/portfolio";
import { Period, Section } from "./primitives";

export function Experience({ lang }: { lang: Language }) {
  const t = getTranslator(lang);

  return (
    <Section id="experience" number={2} title={t("exp.label")}>
      <ol className="entries" role="list">
        {experiences.map((item, index) => (
          <li key={item.id} className="entry">
            <p className="entry__meta">
              <Period value={pick(item.period, lang)} current={index === 0} />
            </p>
            <div className="entry__body">
              <h3 className="entry__title">{pick(item.role, lang)}</h3>
              <p className="entry__org">
                {item.company}
                <span className="entry__sep" aria-hidden="true">
                  {" "}
                  ·{" "}
                </span>
                <span className="sr-only">, </span>
                {pick(item.location, lang)}
              </p>
              <p className="entry__text">{pick(item.description, lang)}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
