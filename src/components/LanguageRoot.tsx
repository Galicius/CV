"use client";

import { createContext, use, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { LANGUAGES, type Language } from "../context/LanguageContext";

const STORAGE_KEY = "lang";
const CHANGE_EVENT = "cv:langchange";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function readStoredLanguage(): Language {
  try {
    return localStorage.getItem(STORAGE_KEY) === "sl" ? "sl" : "en";
  } catch {
    return "en";
  }
}

const serverLanguage = (): Language => "en";

let restoreSwitchFocus = false;

function setLanguage(lang: Language) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Without storage the switch still works for this page view.
  }
  restoreSwitchFocus = true;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

const LanguageStateContext = createContext<Language>("en");

/**
 * Renders one of two server-rendered editions of the page and keeps
 * <html lang> in sync. Only used when LANGUAGE_SWITCH_ENABLED is true.
 */
export function LanguageRoot({ en, sl }: { en: ReactNode; sl: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readStoredLanguage, serverLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <LanguageStateContext value={lang}>{lang === "sl" ? sl : en}</LanguageStateContext>;
}

export function LanguageSwitch({ label, names }: { label: string; names: Record<Language, string> }) {
  const current = use(LanguageStateContext);

  useEffect(() => {
    if (!restoreSwitchFocus) return;
    restoreSwitchFocus = false;
    // The edition was swapped, so move focus to the equivalent control in the new tree.
    const button = document.querySelector<HTMLElement>(`.lang-switch [lang="${current}"]`);
    if (button?.offsetParent) button.focus();
    else document.querySelector<HTMLElement>(".menu-button")?.focus();
  }, [current]);

  return (
    <div role="group" aria-label={label} className="lang-switch">
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          lang={lang}
          aria-pressed={current === lang}
          onClick={() => setLanguage(lang)}
        >
          <span aria-hidden="true">{lang.toUpperCase()}</span>
          <span className="sr-only">{names[lang]}</span>
        </button>
      ))}
    </div>
  );
}
