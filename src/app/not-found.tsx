import type { Metadata } from "next";
import Link from "next/link";
import { getTranslator } from "../context/LanguageContext";
import { personal } from "../data/portfolio";

export const metadata: Metadata = {
  title: "Page not found | Gal Guštin",
};

export default function NotFound() {
  const t = getTranslator("en");

  return (
    <main id="main" className="not-found page">
      <p className="masthead__kicker">
        <span>{personal.name}</span>
        <span>{t("notFound.kicker")}</span>
      </p>
      <h1 className="not-found__title">{t("notFound.title")}</h1>
      <p className="not-found__text">{t("notFound.text")}</p>
      <p>
        <Link href="/" className="button button--primary">
          {t("notFound.back")}
        </Link>
      </p>
    </main>
  );
}
