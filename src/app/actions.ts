"use server";

import { cookies } from "next/headers";
import { LANGUAGE_SWITCH_ENABLED } from "../context/LanguageContext";
import { LANG_COOKIE } from "../lib/i18n";

/** Store the visitor's language choice; setting a cookie re-renders the page. */
export async function setLanguage(formData: FormData) {
  if (!LANGUAGE_SWITCH_ENABLED) return;
  const lang = formData.get("lang") === "sl" ? "sl" : "en";
  (await cookies()).set(LANG_COOKIE, lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
