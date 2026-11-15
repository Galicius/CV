import { LANGUAGE_SWITCH_ENABLED, getTranslator, type Language } from "../context/LanguageContext";
import { personal } from "../data/portfolio";
import { LanguageSwitch } from "./LanguageRoot";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

/** Same order as the sections on the page. */
export const SECTIONS = [
  { id: "work", label: "nav.work" },
  { id: "experience", label: "nav.experience" },
  { id: "education", label: "nav.education" },
  { id: "skills", label: "nav.skills" },
  { id: "languages", label: "nav.languages" },
  { id: "contact", label: "nav.contact" },
] as const;

export function Header({ lang }: { lang: Language }) {
  const t = getTranslator(lang);

  return (
    <header className="site-header">
      <div className="site-header__inner page">
        <a href="#top" className="site-header__name">
          {personal.name}
        </a>
        <MobileMenu label={t("nav.menu")} navLabel={t("nav.label")}>
          <ol className="site-nav__list">
            {SECTIONS.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="site-nav__link">
                  <span className="site-nav__number" aria-hidden="true">
                    {index + 1}
                  </span>
                  {t(section.label)}
                </a>
              </li>
            ))}
          </ol>
          {LANGUAGE_SWITCH_ENABLED ? (
            <LanguageSwitch label={t("switch.label")} names={{ en: t("switch.en"), sl: t("switch.sl") }} />
          ) : null}
        </MobileMenu>
        <ThemeToggle label={t("theme.dark")} />
      </div>
    </header>
  );
}
