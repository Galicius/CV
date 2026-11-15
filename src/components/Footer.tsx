import type { Translator } from "../context/LanguageContext";
import { personal } from "../data/portfolio";
import { Arrow, ExternalLink } from "./ui";

export function Footer({ t }: { t: Translator }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner mono">
        <p>
          © {year} {personal.name}
        </p>
        <p className="site-footer__credit">{t("footer.credit")}</p>
        <div className="site-footer__end">
          <ExternalLink href={personal.github} t={t}>
            GitHub
            <Arrow dir="out" />
          </ExternalLink>
          <a href="#top">
            {t("footer.top")}
            <Arrow dir="up" />
          </a>
        </div>
      </div>
    </footer>
  );
}
