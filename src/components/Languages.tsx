import { getTranslator, pick, type Language, type TranslationKey } from "../context/LanguageContext";
import { languages } from "../data/portfolio";
import { Section } from "./primitives";

const CODES: Record<string, string> = { English: "EN", Slovenian: "SL", German: "DE", Russian: "RU" };

const SKILL_ROWS: { key: keyof (typeof languages)[number]["skills"]; label: TranslationKey }[] = [
  { key: "listening", label: "lang.listening" },
  { key: "reading", label: "lang.reading" },
  { key: "production", label: "lang.speaking" },
  { key: "interaction", label: "lang.interaction" },
  { key: "writing", label: "lang.writing" },
];

export function Languages({ lang }: { lang: Language }) {
  const t = getTranslator(lang);
  const level = (value: string) => (value === "Native" ? t("lang.native") : value);
  const scale = [
    { range: "A1–A2", label: t("lang.basic") },
    { range: "B1–B2", label: t("lang.independent") },
    { range: "C1–C2", label: t("lang.proficient") },
  ];

  return (
    <Section id="languages" number={5} title={t("lang.label")}>
      <div className="cefr">
        <table className="cefr__table">
          <caption className="sr-only">{t("lang.caption")}</caption>
          <thead>
            <tr>
              <td />
              {languages.map((language) => {
                const name = pick(language.name, lang);
                return (
                  <th key={language.keyName} scope="col">
                    <span className="cefr__name">{name}</span>
                    <abbr className="cefr__code" title={name}>
                      {CODES[language.keyName] ?? language.keyName.slice(0, 2).toUpperCase()}
                    </abbr>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr className="cefr__overall">
              <th scope="row">{t("lang.overall")}</th>
              {languages.map((language) => (
                <td key={language.keyName}>{pick(language.level, lang)}</td>
              ))}
            </tr>
            {SKILL_ROWS.map((row) => (
              <tr key={row.key}>
                <th scope="row">{t(row.label)}</th>
                {languages.map((language) => (
                  <td key={language.keyName}>{level(language.skills[row.key])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="cefr__scale">
          <dt>{t("lang.scale")}</dt>
          {scale.map((item) => (
            <dd key={item.range}>
              <span className="cefr__range">{item.range}</span> {item.label}
            </dd>
          ))}
        </dl>
      </div>
    </Section>
  );
}
