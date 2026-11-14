import { pick, type Language, type Translator } from "../context/LanguageContext";
import { experiences } from "../data/portfolio";
import { SectionHead, pad } from "./ui";

export function Experience({ lang, t }: { lang: Language; t: Translator }) {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="wrap">
        <SectionHead id="experience" title={t("exp.label")} />

        <div className="index-head grid-12 label border-t border-[var(--rule-strong)]" aria-hidden="true">
          <span className="col-span-1">{t("col.no")}</span>
          <span className="col-span-4">{t("col.role")}</span>
          <span className="col-span-4">{t("col.description")}</span>
          <span className="col-span-3">{t("col.periodPlace")}</span>
        </div>
        <ol className="max-lg:border-t max-lg:border-[var(--rule-strong)]">
          {experiences.map((exp, i) => (
            <li key={exp.id} className="row grid-12 bleed rule-b">
              <span className="row__idx col-span-full lg:col-span-1">{pad(i + 1)}</span>
              <div className="col-span-full lg:col-span-4">
                <h3 className="row__title">{pick(exp.role, lang)}</h3>
                <p className="row__sub">{exp.company}</p>
              </div>
              <p className="row__desc col-span-full lg:col-span-4">{pick(exp.description, lang)}</p>
              <p className="row__meta col-span-full lg:col-span-3">
                <span className="mono">{pick(exp.period, lang)}</span>
                <span className="mono">{pick(exp.location, lang)}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
