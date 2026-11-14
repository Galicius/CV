import { cookies } from "next/headers";
import { LANGUAGE_SWITCH_ENABLED, type Language } from "../context/LanguageContext";

export const LANG_COOKIE = "lang";

/**
 * Resolve the language for this request.
 *
 * While the switch is disabled this never touches the request, so the page is
 * prerendered statically in English. Once enabled, the choice is read from the
 * `lang` cookie written by the `setLanguage` server action.
 */
export async function getLang(): Promise<Language> {
  if (!LANGUAGE_SWITCH_ENABLED) return "en";
  const value = (await cookies()).get(LANG_COOKIE)?.value;
  return value === "sl" ? "sl" : "en";
}
