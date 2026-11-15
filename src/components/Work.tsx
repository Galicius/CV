import Image from "next/image";
import { getTranslator, pick, type Language, type Translate } from "../context/LanguageContext";
import { projects, type Project } from "../data/portfolio";
import { ExternalLink, Period, Section, displayUrl } from "./primitives";

function Stack({ project, t }: { project: Project; t: Translate }) {
  return (
    <p className="stack">
      <span className="stack__label">{t("projects.stack")}:</span>{" "}
      <span className="stack__items">{project.tech.join(", ")}</span>
    </p>
  );
}

function Plate({ project, index, lang }: { project: Project; index: number; lang: Language }) {
  const t = getTranslator(lang);
  const preview = project.preview;
  const titleId = `project-${project.id}`;

  return (
    <article className="plate" aria-labelledby={titleId}>
      {preview ? (
        <figure className="plate__figure">
          <div className="plate__frame">
            <Image
              src={preview.src}
              width={preview.width}
              height={preview.height}
              alt={t("projects.alt", { title: project.title })}
              sizes="(min-width: 1440px) 505px, (min-width: 1100px) calc(58vw - 280px), (min-width: 800px) calc(58vw - 80px), calc(100vw - 4rem)"
              className="plate__image"
            />
          </div>
          <figcaption className="plate__caption">
            <span>
              {t("projects.figure")} {index + 1}
            </span>
            <span>{displayUrl(project.links.live)}</span>
          </figcaption>
        </figure>
      ) : null}

      <div className="plate__text">
        <p className="plate__meta">
          {pick(project.status, lang)} · {pick(project.period, lang)}
        </p>
        <h4 id={titleId} className="plate__title">
          {project.title}
        </h4>
        <p className="plate__subtitle">{pick(project.subtitle, lang)}</p>
        <p className="plate__description">{pick(project.description, lang)}</p>
        <Stack project={project} t={t} />
        <ExternalLink href={project.links.live} t={t} className="text-link plate__link print-url">
          {t("projects.visit")}
          <span className="sr-only"> {displayUrl(project.links.live)}</span>
        </ExternalLink>
      </div>
    </article>
  );
}

function IndexEntry({ project, lang }: { project: Project; lang: Language }) {
  const t = getTranslator(lang);

  return (
    <li className="entry index-entry">
      <p className="entry__meta">
        <Period value={pick(project.period, lang)} />
        <span className="entry__status">{pick(project.status, lang)}</span>
      </p>
      <div className="entry__body">
        <h4 className="entry__title">
          {project.title}
        </h4>
        <p className="entry__subtitle">{pick(project.subtitle, lang)}</p>
        <p className="entry__text">{pick(project.description, lang)}</p>
        <Stack project={project} t={t} />
        <p className="entry__link">
          <span className="sr-only">{t("projects.link")}: </span>
          <ExternalLink href={project.links.live} t={t} className="text-link text-link--block text-link--mono">
            {displayUrl(project.links.live)}
          </ExternalLink>
        </p>
      </div>
    </li>
  );
}

export function Work({ lang }: { lang: Language }) {
  const t = getTranslator(lang);
  const client = projects.filter((project) => project.category === "client");
  const study = projects.filter((project) => project.category === "study");

  return (
    <Section id="work" number={1} title={t("projects.label")} intro={t("projects.intro")} className="section--work">
      <h3 className="subhead">{t("projects.tab.client")}</h3>
      <div className="plates">
        {client.map((project, index) => (
          <Plate key={project.id} project={project} index={index} lang={lang} />
        ))}
      </div>

      <h3 className="subhead subhead--spaced">{t("projects.tab.study")}</h3>
      <ol className="entries" role="list">
        {study.map((project) => (
          <IndexEntry key={project.id} project={project} lang={lang} />
        ))}
      </ol>
    </Section>
  );
}
