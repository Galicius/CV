export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** Browser chrome colours; keep in sync with --paper in globals.css. */
export const THEME_COLORS: Record<Theme, string> = {
  light: "#f3eee4",
  dark: "#16130f",
};

/**
 * Runs in <head> before first paint: applies the stored theme, or the system
 * preference when nothing is stored, and keeps following the system until the
 * visitor makes an explicit choice. Must stay dependency-free.
 */
export const themeScript = `(function(){try{var d=document.documentElement,k=${JSON.stringify(
  THEME_STORAGE_KEY,
)},c=${JSON.stringify(THEME_COLORS)},m=window.matchMedia("(prefers-color-scheme: dark)");function a(t){d.setAttribute("data-theme",t);var e=document.querySelector('meta[name="theme-color"]');if(!e){e=document.createElement("meta");e.name="theme-color";document.head.prepend(e);}e.setAttribute("content",c[t]);}function s(){try{var v=localStorage.getItem(k);return v==="light"||v==="dark"?v:null}catch(e){return null}}a(s()||(m.matches?"dark":"light"));m.addEventListener("change",function(e){if(!s())a(e.matches?"dark":"light")});}catch(e){}})();`;

/** Client-side counterpart of the inline script, used by the toggle. */
export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.prepend(meta);
  }
  meta.content = THEME_COLORS[theme];
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the choice then lasts for this page view.
  }
}
