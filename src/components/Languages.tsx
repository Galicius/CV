import { pick, type Language, type Translator } from "../context/LanguageContext";
import { languages } from "../data/portfolio";
import { SectionHead } from "./ui";

const ISO_CODE: Record<string, string> = {
  English: "EN",
  Slovenian: "SL",
  German: "DE",
  Russian: "RU",
};

/**
 * CEFR breakdown as one table: skills down the side, languages across.
 * Four narrow value columns keep it intact on a 360px phone.
 */
export function Languages({ lang, t }: { lang: Language; t: Translator }) {
  const skills = [
    { key: "listening", label: t("lang.listening") },
    { key: "reading", label: t("lang.reading") },
    { key: "production", label: t("lang.speaking") },
    { key: "interaction", label: t("lang.interaction") },
    { key: "writing", label: t("lang.writing") },
  ] as const;

  const display = (level: string) => (level === "Native" ? t("lang.native") : level);
  const levelClass = (level: string) => `cefr__level${level.length > 2 ? " cefr__level--word" : ""}`;

  return (
    <section id="languages" className="section" aria-labelledby="languages-title">
      <div className="wrap">
        <SectionHead id="languages" title={t("lang.label")} />

        <table className="cefr">
          <caption className="sr-only">{t("lang.caption")}</caption>
          <colgroup>
            <col className="cefr__col-skill" />
            {languages.map((language) => (
              <col key={language.keyName} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="label">
                {t("lang.skill")}
              </th>
              {languages.map((language) => (
                <th key={language.keyName} scope="col">
                  <span className="cefr__lang-code" aria-hidden="true">
                    {ISO_CODE[language.keyName]}
                  </span>
                  <span className="cefr__lang-name">{pick(language.name, lang)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="cefr__overall">
              <th scope="row">{t("lang.overall")}</th>
              {languages.map((language) => {
                const level = pick(language.level, lang);
                return (
                  <td key={language.keyName}>
                    <span className={levelClass(level)}>{level}</span>
                  </td>
                );
              })}
            </tr>
            {skills.map((skill) => (
              <tr key={skill.key}>
                <th scope="row">{skill.label}</th>
                {languages.map((language) => {
                  const level = language.skills[skill.key];
                  return (
                    <td key={language.keyName}>
                      <span className={levelClass(display(level))}>{display(level)}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cefr-key mono">
          <p className="label w-full sm:w-auto">{t("lang.scale")}</p>
          <dl className="contents">
          {[
            { range: "A1–A2", desc: t("lang.basic") },
            { range: "B1–B2", desc: t("lang.independent") },
            { range: "C1–C2", desc: t("lang.proficient") },
          ].map((item) => (
            <div key={item.range}>
              <dt>{item.range}</dt>
              <dd>{item.desc}</dd>
            </div>
          ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
