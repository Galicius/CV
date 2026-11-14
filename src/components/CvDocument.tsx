import { getTranslator, type Language } from "../context/LanguageContext";
import { Contact } from "./Contact";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Languages } from "./Languages";
import { Masthead } from "./Masthead";
import { Skills } from "./Skills";
import { Work } from "./Work";

/** The whole page in one language. Server-rendered; only the header tools hydrate. */
export function CvDocument({ lang }: { lang: Language }) {
  const t = getTranslator(lang);

  return (
    <>
      <a href="#main" className="skip-link">
        {t("a11y.skip")}
      </a>
      <Header lang={lang} />
      <main id="main" tabIndex={-1}>
        <Masthead lang={lang} />
        <Work lang={lang} />
        <Experience lang={lang} />
        <Education lang={lang} />
        <Skills lang={lang} />
        <Languages lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
