import { pick, type Language, type Translator } from "../context/LanguageContext";
import { personal } from "../data/portfolio";
import { Arrow, ExternalLink, sectionNumber } from "./ui";

/** Section 01: the poster. Name, role, pitch, actions, about text and stats. */
export function Hero({ lang, t }: { lang: Language; t: Translator }) {
  const [firstName, ...rest] = personal.name.split(" ");
  const githubHandle = personal.github.replace(/^https?:\/\//, "");

  const stats = [
    { value: "4+", label: t("about.years") },
    { value: "8+", label: t("about.projects") },
    { value: "15+", label: t("about.tech") },
    { value: "3", label: t("about.langs") },
  ];

  return (
    <section id="about" className="hero" aria-labelledby="name">
      <div className="guides" aria-hidden="true">
        <div className="wrap">
          <div className="grid-12">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className={i >= 4 ? "hidden lg:block" : undefined} />
            ))}
          </div>
        </div>
      </div>

      <div className="wrap">
        <dl className="hero-meta grid-12">
          <div className="rise col-span-6 md:col-span-4 lg:col-span-3">
            <dt className="label">{t("hero.role")}</dt>
            <dd>{personal.title}</dd>
          </div>
          <div className="rise d1 col-span-6 md:col-span-4 lg:col-span-3">
            <dt className="label">{t("hero.based")}</dt>
            <dd>{personal.location}</dd>
          </div>
          <div className="rise d2 col-span-full md:col-span-4 lg:col-span-6">
            <dt className="label">{t("hero.status")}</dt>
            <dd>
              <span className="sig" aria-hidden="true" />
              {t("hero.available")}
            </dd>
          </div>
        </dl>

        <h1 id="name" className="name rise d1">
          <span className="name__line">{firstName}</span> <span className="name__line">{rest.join(" ")}</span>
        </h1>

        <div className="hero-body grid-12">
          <p className="pitch rise d3 col-span-full lg:col-span-6">
            {pick(personal.subtitle, lang)}
          </p>

          <ul className="actions grid-12 col-span-full lg:row-start-2">
            <li className="col-span-full lg:col-span-4">
              <a href="/cv.pdf" download="Gal-Gustin-CV.pdf" className="action action--primary action--down bleed rule-b">
                <span className="label">{t("hero.cvLabel")}</span>
                <span className="action__value">{t("hero.downloadCv")}</span>
                <Arrow dir="down" />
              </a>
            </li>
            <li className="col-span-full lg:col-span-4">
              <a href={`mailto:${personal.email}`} className="action action--out bleed rule-b">
                <span className="label">{t("hero.getInTouch")}</span>
                <span className="action__value">{personal.email}</span>
                <Arrow dir="right" />
              </a>
            </li>
            <li className="col-span-full lg:col-span-4">
              <ExternalLink href={personal.github} t={t} className="action action--out bleed rule-b">
                <span className="label">GitHub</span>
                <span className="action__value">{githubHandle}</span>
                <Arrow dir="out" />
              </ExternalLink>
            </li>
          </ul>

          <div className="hero-about col-span-full lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <h2 className="label">
              {sectionNumber("about")} — {t("about.label")}
            </h2>
            <p className="lede">{pick(personal.about, lang)}</p>
          </div>
        </div>

        <ul className="stats grid-12">
          {stats.map((stat) => (
            <li key={stat.label} className="stat col-span-6 lg:col-span-3">
              <span className="stat__num">{stat.value}</span>
              <span className="label">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
