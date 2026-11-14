/**
 * i18n for the CV.
 *
 * This module is shared by Server and Client Components, so it holds data and
 * pure helpers only (no React context, no "use client"). Sections render on the
 * server for a given `lang`; the optional client-side switch lives in
 * `src/components/LanguageRoot.tsx`.
 */

export type Language = "en" | "sl";

export const LANGUAGES: readonly Language[] = ["en", "sl"];

/**
 * Shows the EN/SL switch in the header. Off by default: the site owner keeps
 * the site English-only for now. When true, both language editions are
 * rendered and the visitor's choice is stored in localStorage ("lang").
 */
export const LANGUAGE_SWITCH_ENABLED: boolean = false;

export const translations = {
  en: {
    "a11y.skip": "Skip to content",
    "a11y.newTab": "(opens in a new tab)",
    "a11y.download": "(PDF download)",

    "nav.label": "Sections",
    "nav.menu": "Menu",
    "nav.work": "Work",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.skills": "Skills",
    "nav.languages": "Languages",
    "nav.contact": "Contact",

    "theme.dark": "Dark theme",
    "switch.label": "Language",
    "switch.en": "English",
    "switch.sl": "Slovenščina",

    "masthead.kicker": "Curriculum Vitae",
    "hero.available": "Available for opportunities",
    "hero.downloadCv": "Download CV (PDF, EN)",

    "about.years": "Years of study",
    "about.projects": "Projects built",
    "about.tech": "Technologies",
    "about.langs": "Languages spoken",

    "projects.label": "Selected work",
    "projects.intro": "Live sites built for clients, followed by the study projects that shaped how I build products.",
    "projects.tab.client": "Client work",
    "projects.tab.study": "Study projects",
    "projects.visit": "Visit site",
    "projects.figure": "Fig.",
    "projects.alt": "Home page of the {title} website",
    "projects.stack": "Stack",
    "projects.link": "Link",

    "exp.label": "Work experience",

    "edu.label": "Education",

    "skills.label": "Technical skills",
    "skills.group1": "Languages",
    "skills.group2": "Frameworks & libraries",
    "skills.group3": "Databases",
    "skills.group4": "Tools & platforms",
    "skills.group5": "Deployment",

    "lang.label": "Languages",
    "lang.caption": "Spoken languages by skill, on the CEFR scale",
    "lang.overall": "Overall",
    "lang.listening": "Listening",
    "lang.reading": "Reading",
    "lang.speaking": "Speaking",
    "lang.interaction": "Interaction",
    "lang.writing": "Writing",
    "lang.native": "Native",
    "lang.scale": "CEFR scale",
    "lang.basic": "Basic",
    "lang.independent": "Independent",
    "lang.proficient": "Proficient",

    "contact.label": "Contact",
    "contact.title": "Let’s work together.",
    "contact.text": "I’m open to internships, full-time positions, and interesting project collaborations. Feel free to reach out!",
    "contact.button": "Say hello",
    "contact.email": "Email",
    "contact.location": "Location",
    "contact.github": "GitHub",

    "footer.copyright": "Copyright",
    "footer.built": "Built with Next.js and Tailwind CSS.",
    "footer.colophon": "Set in Fraunces, Schibsted Grotesk and IBM Plex Mono.",
    "footer.top": "Back to top",

    "notFound.kicker": "Error 404",
    "notFound.title": "This page does not exist.",
    "notFound.text": "The page you were looking for could not be found.",
    "notFound.back": "Back to the CV",
  },
  sl: {
    "a11y.skip": "Preskoči na vsebino",
    "a11y.newTab": "(odpre se v novem zavihku)",
    "a11y.download": "(prenos PDF)",

    "nav.label": "Razdelki",
    "nav.menu": "Meni",
    "nav.work": "Delo",
    "nav.experience": "Izkušnje",
    "nav.education": "Izobraževanje",
    "nav.skills": "Veščine",
    "nav.languages": "Jeziki",
    "nav.contact": "Kontakt",

    "theme.dark": "Temna tema",
    "switch.label": "Jezik",
    "switch.en": "English",
    "switch.sl": "Slovenščina",

    "masthead.kicker": "Življenjepis",
    "hero.available": "Na voljo za priložnosti",
    "hero.downloadCv": "Prenesi CV (PDF, EN)",

    "about.years": "Leta študija",
    "about.projects": "Ustvarjeni projekti",
    "about.tech": "Tehnologije",
    "about.langs": "Govorjeni jeziki",

    "projects.label": "Izbrano delo",
    "projects.intro": "Spletne strani, ki sem jih izdelal za naročnike in so v živo, ter študijski projekti, ki so oblikovali moj način gradnje produktov.",
    "projects.tab.client": "Delo za naročnike",
    "projects.tab.study": "Študijski projekti",
    "projects.visit": "Obišči stran",
    "projects.figure": "Sl.",
    "projects.alt": "Domača stran spletne strani {title}",
    "projects.stack": "Tehnologije",
    "projects.link": "Povezava",

    "exp.label": "Delovne izkušnje",

    "edu.label": "Izobraževanje",

    "skills.label": "Tehnične veščine",
    "skills.group1": "Jeziki",
    "skills.group2": "Ogrodja in knjižnice",
    "skills.group3": "Podatkovne baze",
    "skills.group4": "Orodja in platforme",
    "skills.group5": "Uvajanje (Deployment)",

    "lang.label": "Jeziki",
    "lang.caption": "Govorjeni jeziki po veščinah, po lestvici CEFR",
    "lang.overall": "Skupno",
    "lang.listening": "Slušno razumevanje",
    "lang.reading": "Bralno razumevanje",
    "lang.speaking": "Govorno izražanje",
    "lang.interaction": "Govorna interakcija",
    "lang.writing": "Pisno izražanje",
    "lang.native": "Materni",
    "lang.scale": "Lestvica CEFR",
    "lang.basic": "Osnovno",
    "lang.independent": "Samostojno",
    "lang.proficient": "Napredno",

    "contact.label": "Kontakt",
    "contact.title": "Sodelujmo skupaj.",
    "contact.text": "Sem odprt za prakse, zaposlitve za polni delovni čas in zanimive projektne kolaboracije. Z veseljem me kontaktirajte!",
    "contact.button": "Reci živijo",
    "contact.email": "E-pošta",
    "contact.location": "Lokacija",
    "contact.github": "GitHub",

    "footer.copyright": "Copyright",
    "footer.built": "Izdelano z Next.js in Tailwind CSS.",
    "footer.colophon": "Stavljeno v pisavah Fraunces, Schibsted Grotesk in IBM Plex Mono.",
    "footer.top": "Na vrh",

    "notFound.kicker": "Napaka 404",
    "notFound.title": "Ta stran ne obstaja.",
    "notFound.text": "Strani, ki ste jo iskali, ni mogoče najti.",
    "notFound.back": "Nazaj na življenjepis",
  },
} satisfies Record<Language, Record<string, string>>;

export type TranslationKey = keyof (typeof translations)["en"];

// Compile-time check that both languages define exactly the same keys.
const slHasEveryKey: Record<TranslationKey, string> = translations.sl;
void slHasEveryKey;

export type Translate = (key: TranslationKey, vars?: Record<string, string>) => string;

export function getTranslator(lang: Language): Translate {
  const dict: Record<TranslationKey, string> = translations[lang];
  return (key, vars) => {
    const text = dict[key] ?? translations.en[key];
    return vars ? text.replace(/\{(\w+)\}/g, (_, name: string) => vars[name] ?? "") : text;
  };
}

/** Picks the right edition of a `{ en, sl }` field; plain strings pass through. */
export function pick(value: string | Record<Language, string>, lang: Language): string {
  return typeof value === "string" ? value : value[lang];
}
