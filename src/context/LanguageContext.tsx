/**
 * UI strings (EN / SL) and the language helpers.
 *
 * The page is rendered on the server, so there is no React context any more:
 * server components call `getTranslator(lang)` with the language resolved by
 * `getLang()` in `src/lib/i18n.ts`. The language switch in the header is gated
 * behind `LANGUAGE_SWITCH_ENABLED`; while it is `false` the site is English
 * only and fully static.
 */

export type Language = "en" | "sl";

export const LANGUAGES: readonly Language[] = ["en", "sl"];

/** Flip to `true` to show the EN / SL switch in the header. */
export const LANGUAGE_SWITCH_ENABLED = false;

const en = {
  "a11y.skip": "Skip to content",
  "a11y.newTab": "(opens in a new tab)",

  "nav.label": "Sections",
  "nav.home": "Gal Guštin, back to top",
  "nav.menu": "Menu",
  "nav.close": "Close",
  "nav.about": "About",
  "nav.work": "Work",
  "nav.experience": "Experience",
  "nav.education": "Education",
  "nav.skills": "Skills",
  "nav.languages": "Languages",
  "nav.contact": "Contact",

  "theme.label": "Colour theme",
  "theme.light": "Light",
  "theme.dark": "Dark",
  "langSwitch.label": "Language",

  "hero.role": "Role",
  "hero.based": "Based in",
  "hero.status": "Status",
  "hero.available": "Available for opportunities",
  "hero.getInTouch": "Get in Touch",
  "hero.downloadCv": "Download CV (PDF, EN)",
  "hero.cvLabel": "Curriculum vitae",

  "about.label": "About me",
  "about.years": "Years of study",
  "about.projects": "Projects built",
  "about.tech": "Technologies",
  "about.langs": "Languages spoken",

  "projects.label": "Selected Work",
  "projects.intro": "Recent client work first, then the study projects that shaped how I build products.",
  "projects.client": "Client work",
  "projects.study": "Study projects",
  "projects.visit": "Visit site",
  "projects.open": "Open project",
  "projects.preview": "Screenshot of the {title} website",

  "col.no": "No.",
  "col.project": "Project",
  "col.description": "Description",
  "col.periodStack": "Period / Stack",
  "col.role": "Role",
  "col.periodPlace": "Period / Location",
  "col.degree": "Degree",
  "col.institution": "Institution",

  "exp.label": "Work Experience",

  "edu.label": "Education",
  "edu.current": "Current",

  "skills.label": "Technical Skills",
  "skills.group1": "Languages",
  "skills.group2": "Frameworks & Libraries",
  "skills.group3": "Databases",
  "skills.group4": "Tools & Platforms",
  "skills.group5": "Deployment",

  "lang.label": "Languages",
  "lang.caption": "Spoken languages by CEFR skill",
  "lang.skill": "Skill",
  "lang.overall": "Overall",
  "lang.listening": "Listening",
  "lang.reading": "Reading",
  "lang.speaking": "Speaking",
  "lang.interaction": "Interaction",
  "lang.writing": "Writing",
  "lang.native": "Native",
  "lang.scale": "CEFR Scale",
  "lang.basic": "Basic",
  "lang.independent": "Independent",
  "lang.proficient": "Proficient",

  "contact.label": "Contact",
  "contact.title": "Let’s work together",
  "contact.text": "I’m open to internships, full-time positions, and interesting project collaborations. Feel free to reach out!",
  "contact.button": "Say Hello",
  "contact.email": "Email",
  "contact.location": "Location",
  "contact.github": "GitHub",

  "footer.credit": "Built with Next.js and Tailwind CSS",
  "footer.top": "Back to top",

  "notFound.label": "Error 404",
  "notFound.title": "This page does not exist.",
  "notFound.text": "The page you were looking for could not be found.",
  "notFound.home": "Back to the homepage",
} as const;

export type TranslationKey = keyof typeof en;

const sl: Record<TranslationKey, string> = {
  "a11y.skip": "Preskoči na vsebino",
  "a11y.newTab": "(odpre se v novem zavihku)",

  "nav.label": "Razdelki",
  "nav.home": "Gal Guštin, na vrh strani",
  "nav.menu": "Meni",
  "nav.close": "Zapri",
  "nav.about": "O meni",
  "nav.work": "Delo",
  "nav.experience": "Izkušnje",
  "nav.education": "Izobraževanje",
  "nav.skills": "Veščine",
  "nav.languages": "Jeziki",
  "nav.contact": "Kontakt",

  "theme.label": "Barvna tema",
  "theme.light": "Svetla",
  "theme.dark": "Temna",
  "langSwitch.label": "Jezik",

  "hero.role": "Vloga",
  "hero.based": "Lokacija",
  "hero.status": "Status",
  "hero.available": "Na voljo za priložnosti",
  "hero.getInTouch": "Stopi v stik",
  "hero.downloadCv": "Prenesi CV (PDF, EN)",
  "hero.cvLabel": "Življenjepis",

  "about.label": "O meni",
  "about.years": "Leta študija",
  "about.projects": "Ustvarjeni projekti",
  "about.tech": "Tehnologije",
  "about.langs": "Govorjeni jeziki",

  "projects.label": "Izbrano delo",
  "projects.intro": "Najprej nedavno delo za naročnike, nato študijski projekti, ki so oblikovali moj način gradnje produktov.",
  "projects.client": "Delo za naročnike",
  "projects.study": "Študijski projekti",
  "projects.visit": "Obišči stran",
  "projects.open": "Odpri projekt",
  "projects.preview": "Posnetek zaslona spletne strani {title}",

  "col.no": "Št.",
  "col.project": "Projekt",
  "col.description": "Opis",
  "col.periodStack": "Obdobje / Tehnologije",
  "col.role": "Vloga",
  "col.periodPlace": "Obdobje / Kraj",
  "col.degree": "Naziv",
  "col.institution": "Ustanova",

  "exp.label": "Delovne izkušnje",

  "edu.label": "Izobraževanje",
  "edu.current": "Trenutno",

  "skills.label": "Tehnične veščine",
  "skills.group1": "Jeziki",
  "skills.group2": "Ogrodja in knjižnice",
  "skills.group3": "Podatkovne baze",
  "skills.group4": "Orodja in platforme",
  "skills.group5": "Uvajanje (Deployment)",

  "lang.label": "Jeziki",
  "lang.caption": "Govorjeni jeziki po veščinah CEFR",
  "lang.skill": "Veščina",
  "lang.overall": "Skupno",
  "lang.listening": "Slušno razumevanje",
  "lang.reading": "Bralno razumevanje",
  "lang.speaking": "Govorno izražanje",
  "lang.interaction": "Govorna interakcija",
  "lang.writing": "Pisno izražanje",
  "lang.native": "Materni jezik",
  "lang.scale": "Lestvica CEFR",
  "lang.basic": "Osnovno",
  "lang.independent": "Samostojno",
  "lang.proficient": "Napredno",

  "contact.label": "Kontakt",
  "contact.title": "Sodelujmo skupaj",
  "contact.text": "Sem odprt za prakse, zaposlitve za polni delovni čas in zanimive projektne kolaboracije. Z veseljem me kontaktirajte!",
  "contact.button": "Reci Živijo",
  "contact.email": "E-pošta",
  "contact.location": "Lokacija",
  "contact.github": "GitHub",

  "footer.credit": "Izdelano z Next.js in Tailwind CSS",
  "footer.top": "Na vrh",

  "notFound.label": "Napaka 404",
  "notFound.title": "Ta stran ne obstaja.",
  "notFound.text": "Strani, ki ste jo iskali, ni bilo mogoče najti.",
  "notFound.home": "Nazaj na domačo stran",
};

export const translations: Record<Language, Record<TranslationKey, string>> = { en, sl };

export type Translator = (key: TranslationKey, vars?: Record<string, string>) => string;

export function getTranslator(lang: Language): Translator {
  const dict = translations[lang];
  return (key, vars) => {
    let value = dict[key] ?? translations.en[key];
    if (vars) {
      for (const [name, replacement] of Object.entries(vars)) {
        value = value.replace(`{${name}}`, replacement);
      }
    }
    return value;
  };
}

/** Pick the right variant of a `{ en, sl }` content field. */
export function pick<T>(value: T | Record<Language, T>, lang: Language): T {
  if (value && typeof value === "object" && "en" in (value as object) && "sl" in (value as object)) {
    return (value as Record<Language, T>)[lang];
  }
  return value as T;
}
