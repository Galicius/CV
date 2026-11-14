import { setLanguage } from "../app/actions";
import { LANGUAGES, type Language, type Translator } from "../context/LanguageContext";

/** EN / SL switch. A plain form posting to a server action: works without JS. */
export function LanguageSwitch({ lang, t }: { lang: Language; t: Translator }) {
  return (
    <form action={setLanguage} className="seg lang-switch" role="group" aria-label={t("langSwitch.label")}>
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="submit"
          name="lang"
          value={code}
          className="seg__btn"
          aria-pressed={code === lang}
          lang={code}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </form>
  );
}
