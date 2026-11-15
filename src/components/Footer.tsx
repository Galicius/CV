import { getTranslator, type Language } from "../context/LanguageContext";
import { personal } from "../data/portfolio";
import { ExternalLink } from "./primitives";

export function Footer({ lang }: { lang: Language }) {
  const t = getTranslator(lang);
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer page">
      <p>
        {t("footer.copyright")} {year} {personal.name}
      </p>
      <p className="site-footer__colophon">
        {t("footer.built")} {t("footer.colophon")}
      </p>
      <p className="site-footer__links">
        <ExternalLink href={personal.github} t={t} className="text-link">
          GitHub
        </ExternalLink>
        <a href="#top" className="text-link">
          {t("footer.top")}
        </a>
      </p>
    </footer>
  );
}
