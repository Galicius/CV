/**
 * Builds public/cv.pdf, the one-page résumé behind the "Download CV" button,
 * from the same data as the site (src/data/portfolio.ts).
 *
 *   node scripts/cv-pdf.mjs
 *
 * Prints with headless Chromium: $CHROME if set, otherwise the newest browser
 * Playwright has downloaded (npx playwright install chromium).
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";
import {
  aiSkills,
  databaseSkills,
  deploymentSkills,
  education,
  experiences,
  frameworkSkills,
  languages,
  personal,
  programmingSkills,
  projects,
  toolSkills,
} from "../src/data/portfolio.ts";

const OUT = resolve(import.meta.dirname, "../public/cv.pdf");
const SITE = "galgustin.com";
const PROJECTS = ["Piranha", "Vozniski", "Alja Fakin", "FERIbot"];

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const en = (v) => (typeof v === "string" ? v : v.en);
const dates = (v) => esc(en(v).replace(" - ", " – "));
const host = (href) => {
  const url = new URL(href);
  return `${url.hostname.replace(/^www\./, "")}${url.pathname}`.replace(/\/$/, "");
};

const [current] = experiences;
const summary = `${current.role.en} at ${current.company}, building AI agents for businesses, and Master's student in Computer Science and Data Technologies at FERI.`;
const firstSentence = (text) => text.split(/(?<=\.) /)[0];

const row = (title, period, sub, text, extra = "") => `
  <article>
    <header><h3>${title}</h3><time>${period}</time></header>
    ${sub ? `<p class="sub">${sub}</p>` : ""}
    ${text ? `<p>${esc(text)}${extra}</p>` : ""}
  </article>`;

const experience = experiences
  .map((e) => row(esc(e.role.en), dates(e.period), esc([e.company, e.location && en(e.location)].filter(Boolean).join(" · ")), e.description.en))
  .join("");

const work = PROJECTS.map((title) => projects.find((p) => p.title === title))
  .map((p) =>
    row(
      `${esc(p.title)} <span class="link">${esc(host(p.links.live))}</span>`,
      dates(p.period),
      "",
      firstSentence(p.description.en),
      ` <span class="stack">${esc(p.tech.join(", "))}</span>`,
    ),
  )
  .join("");

const schooling = education
  .filter((e) => e.level)
  .map((e) => row(esc(e.degree.en), dates(e.period), esc(`${en(e.institution)}, University of Maribor · ${e.level}`), ""))
  .join("");

const skills = [
  ["AI & agents", aiSkills],
  ["Languages", programmingSkills],
  ["Frameworks", frameworkSkills],
  ["Data & cloud", [...databaseSkills, ...deploymentSkills]],
  ["Tools", toolSkills],
]
  .map(([label, list]) => `<dt>${label}</dt><dd>${esc(list.join(", "))}</dd>`)
  .join("");

const spoken = [...languages]
  .sort((a, b) => (b.level.en === "Native") - (a.level.en === "Native"))
  .map((l) => `${esc(l.name.en)} <span>${esc(l.level.en)}</span>`)
  .join(" · ");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(personal.name)} — CV</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=IBM+Plex+Mono:wght@400&family=Schibsted+Grotesk:wght@400;500;600&display=block">
<style>
  @page { size: A4; margin: 13mm 15mm 11mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --ink: #1c1a16; --muted: #5d584e; --rule: #cfc8b8; --accent: #a63a22; }
  body { font: 400 8.9pt/1.42 "Schibsted Grotesk", system-ui, sans-serif; color: var(--ink); }
  h1 { font: 500 25pt/1 Fraunces, Georgia, serif; letter-spacing: -0.01em; }
  .role { margin-top: 4pt; font: 400 8.6pt "IBM Plex Mono", monospace; color: var(--accent); }
  .contact { margin-top: 3pt; font: 400 8pt "IBM Plex Mono", monospace; color: var(--muted); }
  .contact a { color: inherit; text-decoration: none; }
  .summary { margin-top: 9pt; padding-top: 8pt; border-top: 1.2pt solid var(--ink); }
  h2 { margin: 11pt 0 4pt; padding-bottom: 2.5pt; border-bottom: 0.6pt solid var(--rule);
       font: 400 7.6pt "IBM Plex Mono", monospace; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
  article { margin-top: 5.5pt; break-inside: avoid; }
  article header { display: flex; justify-content: space-between; gap: 12pt; align-items: baseline; }
  h3 { font: 600 9.3pt/1.3 "Schibsted Grotesk", sans-serif; }
  time { flex: none; font: 400 7.8pt "IBM Plex Mono", monospace; color: var(--muted); }
  .sub { color: var(--muted); }
  .link { font-weight: 400; color: var(--muted); }
  .stack { color: var(--muted); font-size: 8pt; }
  .stack::before { content: "Stack: "; }
  dl { display: grid; grid-template-columns: 22mm 1fr; gap: 2pt 8pt; margin-top: 5pt; }
  dt { font-weight: 600; }
  .langs { margin-top: 5pt; }
  .langs span { color: var(--muted); }
</style>
</head>
<body>
  <h1>${esc(personal.name)}</h1>
  <p class="role">${esc(personal.title)}</p>
  <p class="contact">${esc(personal.location)} · <a href="mailto:${esc(personal.email)}">${esc(personal.email)}</a> · <a href="https://${SITE}">${SITE}</a> · <a href="${esc(personal.github)}">${esc(personal.github.replace("https://", ""))}</a></p>
  <p class="summary">${esc(summary)}</p>
  <h2>Experience</h2>${experience}
  <h2>Selected projects</h2>${work}
  <h2>Education</h2>${schooling}
  <h2>Skills</h2><dl>${skills}</dl>
  <h2>Languages</h2><p class="langs">${spoken}</p>
</body>
</html>`;

function chrome() {
  if (process.env.CHROME) return process.env.CHROME;
  const cache = join(homedir(), ".cache/ms-playwright");
  const dir = existsSync(cache) && readdirSync(cache).filter((d) => /^chromium-\d+$/.test(d)).sort().at(-1);
  const bin = dir && [join(cache, dir, "chrome-linux64/chrome"), join(cache, dir, "chrome-linux/chrome")].find(existsSync);
  if (!bin) throw new Error("No Chromium found. Set CHROME or run: npx playwright install chromium");
  return bin;
}

const page = join(mkdtempSync(join(tmpdir(), "cv-pdf-")), "cv.html");
writeFileSync(page, html);
execFileSync(chrome(), [
  "--headless",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--virtual-time-budget=10000",
  `--print-to-pdf=${OUT}`,
  `file://${page}`,
], { stdio: "ignore" });
console.log(`Wrote ${OUT}`);
