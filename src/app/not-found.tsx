import Link from "next/link";
import { getTranslator } from "../context/LanguageContext";
import { personal } from "../data/portfolio";
import { getLang } from "../lib/i18n";
import { Arrow } from "../components/ui";

export default async function NotFound() {
  const t = getTranslator(await getLang());

  return (
    <main className="lost">
      <div className="wrap site-header__bar border-b border-[var(--rule)]">
        <Link href="/" className="brand">
          {personal.name}
        </Link>
      </div>
      <div className="wrap grid-12 flex-1 content-end gap-y-6 pb-10 pt-12">
        <p className="label col-span-full">{t("notFound.label")}</p>
        <p className="lost__code col-span-full" aria-hidden="true">
          404
        </p>
        <div className="col-span-full border-t-2 border-[var(--rule-strong)] pt-4 lg:col-span-6">
          <h1 className="sec-title text-[clamp(2.25rem,5vw,4.5rem)]">{t("notFound.title")}</h1>
          <p className="sec-intro mt-4">{t("notFound.text")}</p>
          <Link href="/" className="feature__visit">
            {t("notFound.home")}
            <Arrow dir="right" />
          </Link>
        </div>
      </div>
    </main>
  );
}
