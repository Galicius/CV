"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "sl";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const defaultContext: LanguageContextType = {
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
};

export const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.skills": "Skills",
    "nav.work": "Work",
    "nav.contact": "Contact",

    "hero.available": "Available for opportunities",
    "hero.viewProjects": "View Projects",
    "hero.getInTouch": "Get in Touch",
    "hero.scroll": "Scroll",

    "about.label": "About me",
    "about.title1": "Building things",
    "about.title2": "that matter",
    "about.years": "Years of study",
    "about.projects": "Projects built",
    "about.tech": "Technologies",
    "about.langs": "Languages spoken",

    "projects.label": "Selected Work",
    "projects.title1": "Things I've",
    "projects.title2": "built",
    "projects.intro": "Browse recent client work by default, or switch to the study projects that shaped how I build products.",
    "projects.tab.client": "Client Work",
    "projects.tab.study": "Study Projects",
    "projects.visit": "Visit Site",

    "exp.label": "Work Experience",
    "exp.title1": "Where I've",
    "exp.title2": "worked",

    "edu.label": "Education",
    "edu.title1": "Academic",
    "edu.title2": "background",
    "edu.current": "CURRENT",

    "skills.label": "Technical Skills",
    "skills.title1": "What I",
    "skills.title2": "work with",
    "skills.group1": "Languages",
    "skills.group2": "Frameworks & Libraries",
    "skills.group3": "Databases",
    "skills.group4": "Tools & Platforms",
    "skills.group5": "Deployment",

    "lang.label": "Languages",
    "lang.title1": "Language",
    "lang.title2": "proficiencies",
    "lang.listening": "Listening",
    "lang.reading": "Reading",
    "lang.speaking": "Speaking",
    "lang.interaction": "Interaction",
    "lang.writing": "Writing",
    "lang.scale": "CEFR Scale",
    "lang.basic": "Basic",
    "lang.independent": "Independent",
    "lang.proficient": "Proficient",

    "contact.label": "Contact",
    "contact.title1": "Let's work",
    "contact.title2": "together",
    "contact.text": "I'm open to internships, full-time positions, and interesting project collaborations. Feel free to reach out!",
    "contact.button": "Say Hello",
  },
  sl: {
    "nav.about": "O meni",
    "nav.experience": "Izkušnje",
    "nav.education": "Izobraževanje",
    "nav.skills": "Veščine",
    "nav.work": "Delo",
    "nav.contact": "Kontakt",

    "hero.available": "Na voljo za priložnosti",
    "hero.viewProjects": "Poglej projekte",
    "hero.getInTouch": "Stopi v stik",
    "hero.scroll": "Drsaj",

    "about.label": "O meni",
    "about.title1": "Ustvarjanje stvari,",
    "about.title2": "ki štejejo",
    "about.years": "Leta študija",
    "about.projects": "Ustvarjeni projekti",
    "about.tech": "Tehnologije",
    "about.langs": "Govorjeni jeziki",

    "projects.label": "Izbrano delo",
    "projects.title1": "Stvari, ki sem",
    "projects.title2": "jih ustvaril",
    "projects.intro": "Brskaj med nedavnim delom za naročnike ali preklopi na študijske projekte, ki so oblikovali moj način gradnje produktov.",
    "projects.tab.client": "Delo za naročnike",
    "projects.tab.study": "Študijski projekti",
    "projects.visit": "Obišči stran",

    "exp.label": "Delovne izkušnje",
    "exp.title1": "Kje sem",
    "exp.title2": "delal",

    "edu.label": "Izobraževanje",
    "edu.title1": "Akademsko",
    "edu.title2": "ozadje",
    "edu.current": "TRENUTNO",

    "skills.label": "Tehnične veščine",
    "skills.title1": "S čim",
    "skills.title2": "delam",
    "skills.group1": "Jeziki",
    "skills.group2": "Ogrodja in knjižnice",
    "skills.group3": "Podatkovne baze",
    "skills.group4": "Orodja in platforme",
    "skills.group5": "Uvajanje (Deployment)",

    "lang.label": "Jeziki",
    "lang.title1": "Jezikovna",
    "lang.title2": "usposobljenost",
    "lang.listening": "Slušno razumevanje",
    "lang.reading": "Bralno razumevanje",
    "lang.speaking": "Govorno izražanje",
    "lang.interaction": "Govorna interakcija",
    "lang.writing": "Pisno izražanje",
    "lang.scale": "Lestvica CEFR",
    "lang.basic": "Osnovno",
    "lang.independent": "Samostojno",
    "lang.proficient": "Napredno",

    "contact.label": "Kontakt",
    "contact.title1": "Sodelujmo",
    "contact.title2": "skupaj",
    "contact.text": "Sem odprt za prakse, zaposlitve za polni delovni čas in zanimive projektne kolaboracije. Z veseljem me kontaktirajte!",
    "contact.button": "Reci Živijo",
  }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language;
    if (saved && (saved === "en" || saved === "sl")) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    localStorage.setItem("lang", newLang);
    setLangState(newLang);
  };

  const t = (key: string) => {
    return translations[lang]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
