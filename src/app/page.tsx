import { Contact } from "../components/Contact";
import { Education } from "../components/Education";
import { Experience } from "../components/Experience";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Languages } from "../components/Languages";
import { Navbar } from "../components/Navbar";
import { Projects } from "../components/Projects";
import { Skills } from "../components/Skills";
import { getTranslator } from "../context/LanguageContext";
import { getLang } from "../lib/i18n";

export default async function Home() {
  const lang = await getLang();
  const t = getTranslator(lang);

  return (
    <>
      <Navbar lang={lang} t={t} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero lang={lang} t={t} />
        <Projects lang={lang} t={t} />
        <Experience lang={lang} t={t} />
        <Education lang={lang} t={t} />
        <Skills t={t} />
        <Languages lang={lang} t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
