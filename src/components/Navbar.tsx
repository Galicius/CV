import { LANGUAGE_SWITCH_ENABLED, type Language, type Translator } from "../context/LanguageContext";
import { personal } from "../data/portfolio";
import { LanguageSwitch } from "./LanguageSwitch";
import { NavMenu } from "./NavMenu";
import { ThemeToggle } from "./ThemeToggle";
import { SECTIONS, pad } from "./ui";

export function Navbar({ lang, t }: { lang: Language; t: Translator }) {
  const items = SECTIONS.map((section, i) => ({
    href: `#${section.id}`,
    num: pad(i + 1),
    label: t(section.nav),
  }));

  return (
    <header id="top" className="site-header">
      <a href="#main" className="skip-link">
        {t("a11y.skip")}
      </a>
      <div className="wrap site-header__bar">
        <a href="#top" className="brand" aria-label={t("nav.home")}>
          {personal.name}
        </a>

        <nav aria-label={t("nav.label")}>
          <ul className="nav-list">
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link">
                  <span className="nav-link__num" aria-hidden="true">
                    {item.num}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-tools">
          {LANGUAGE_SWITCH_ENABLED ? <LanguageSwitch lang={lang} t={t} /> : null}
          <ThemeToggle label={t("theme.label")} lightLabel={t("theme.light")} darkLabel={t("theme.dark")} />
          <NavMenu
            items={items}
            menuLabel={t("nav.menu")}
            closeLabel={t("nav.close")}
            navLabel={t("nav.label")}
            footer={LANGUAGE_SWITCH_ENABLED ? <LanguageSwitch lang={lang} t={t} /> : null}
          />
        </div>
      </div>
    </header>
  );
}
