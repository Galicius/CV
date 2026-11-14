import Image from "next/image";
import { pick, type Language, type Translator } from "../context/LanguageContext";
import { projects, type Project } from "../data/portfolio";
import { Arrow, ExternalLink, SectionHead, pad } from "./ui";

type Props = { lang: Language; t: Translator };

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="stack">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** Client work: larger rows with a screenshot plate. */
function FeatureRow({ project, index, lang, t }: Props & { project: Project; index: number }) {
  return (
    <li className="row feature grid-12 bleed rule-b">
      <div className="col-span-full lg:col-span-5">
        <p className="feature__meta mono">
          <span>{pad(index)}</span>
          <span>{pick(project.period, lang)}</span>
          <span>{pick(project.status, lang)}</span>
        </p>
        <h4 className="feature__title">
          <ExternalLink href={project.links.live} t={t} className="row-link">
            {project.title}
          </ExternalLink>
        </h4>
        <p className="row__sub">{pick(project.subtitle, lang)}</p>
      </div>

      {project.preview ? (
        <div className="shot col-span-full lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <Image
            src={project.preview.src}
            width={project.preview.width}
            height={project.preview.height}
            alt={t("projects.preview", { title: project.title })}
            sizes="(min-width: 1680px) 950px, (min-width: 1024px) 57vw, calc(100vw - 32px)"
          />
        </div>
      ) : null}

      <div className="feature__body col-span-full lg:col-span-5">
        <p className="row__desc">{pick(project.description, lang)}</p>
        <div className="mt-4">
          <Stack items={project.tech} />
        </div>
        <span className="feature__visit" aria-hidden="true">
          {t("projects.visit")}
          <Arrow dir="out" />
        </span>
      </div>
      <Arrow dir="out" className="row__arrow" />
    </li>
  );
}

/** Study projects: dense index rows, description always visible. */
function IndexRow({ project, index, lang, t }: Props & { project: Project; index: number }) {
  return (
    <li className="row grid-12 bleed rule-b">
      <span className="row__idx col-span-full lg:col-span-1">{pad(index)}</span>
      <div className="col-span-full lg:col-span-4">
        <h4 className="row__title">
          <ExternalLink href={project.links.live} t={t} className="row-link">
            {project.title}
          </ExternalLink>
        </h4>
        <p className="row__sub">{pick(project.subtitle, lang)}</p>
      </div>
      <p className="row__desc col-span-full lg:col-span-4">{pick(project.description, lang)}</p>
      <div className="row__meta col-span-full lg:col-span-3">
        <span className="mono">{pick(project.period, lang)}</span>
        <Stack items={project.tech} />
      </div>
      <Arrow dir="out" className="row__arrow" />
    </li>
  );
}

export function Projects({ lang, t }: Props) {
  const client = projects.filter((project) => project.category === "client");
  const study = projects.filter((project) => project.category === "study");

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHead id="work" title={t("projects.label")} intro={t("projects.intro")} />

        <div className="group-head">
          <h3>{t("projects.client")}</h3>
          <span className="label">{pad(client.length)}</span>
        </div>
        <ol>
          {client.map((project, i) => (
            <FeatureRow key={project.id} project={project} index={i + 1} lang={lang} t={t} />
          ))}
        </ol>

        <div className="group-head mt-16 lg:mt-24">
          <h3>{t("projects.study")}</h3>
          <span className="label">{pad(study.length)}</span>
        </div>
        <div className="index-head grid-12 label" aria-hidden="true">
          <span className="col-span-1">{t("col.no")}</span>
          <span className="col-span-4">{t("col.project")}</span>
          <span className="col-span-4">{t("col.description")}</span>
          <span className="col-span-3">{t("col.periodStack")}</span>
        </div>
        <ol>
          {study.map((project, i) => (
            <IndexRow key={project.id} project={project} index={client.length + i + 1} lang={lang} t={t} />
          ))}
        </ol>
      </div>
    </section>
  );
}
