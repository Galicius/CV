import { pick, type Language, type Translator } from "../context/LanguageContext";
import { education } from "../data/portfolio";
import { Arrow, ExternalLink, SectionHead, pad } from "./ui";

export function Education({ lang, t }: { lang: Language; t: Translator }) {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="wrap">
        <SectionHead id="education" title={t("edu.label")} />

        <div className="index-head grid-12 label border-t border-[var(--rule-strong)]" aria-hidden="true">
          <span className="col-span-1">{t("col.no")}</span>
          <span className="col-span-4">{t("col.degree")}</span>
          <span className="col-span-4">{t("col.institution")}</span>
          <span className="col-span-3">{t("col.periodPlace")}</span>
        </div>
        <ol className="max-lg:border-t max-lg:border-[var(--rule-strong)]">
          {education.map((edu, i) => (
            <li key={edu.id} className="row grid-12 bleed rule-b">
              <span className="row__idx col-span-full lg:col-span-1">{pad(i + 1)}</span>
              <h3 className="row__title col-span-full lg:col-span-4">{pick(edu.degree, lang)}</h3>
              <div className="col-span-full lg:col-span-4 lg:pt-1">
                <p className="row__sub mt-0">
                  <ExternalLink href={edu.url} t={t} className="row-link">
                    {pick(edu.institution, lang)}
                  </ExternalLink>
                </p>
                {edu.level ? <p className="mono mt-1 text-[var(--ink-2)]">{edu.level}</p> : null}
              </div>
              <div className="row__meta col-span-full lg:col-span-3">
                <span className="mono">{pick(edu.period, lang)}</span>
                <span className="mono">{pick(edu.location, lang)}</span>
                {i === 0 ? (
                  <span className="row__flag mt-2">
                    <span className="sig" aria-hidden="true" />
                    {t("edu.current")}
                  </span>
                ) : null}
              </div>
              <Arrow dir="out" className="row__arrow" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
