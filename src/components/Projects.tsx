import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type Project } from "../data/portfolio";
import { useLanguage } from "../context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
    </svg>
  );
}

function ClientWorkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 7h18M7 3v8M17 3v8M5 11h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function StudyProjectIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 4 3 9l9 5 9-5-9-5Z" />
      <path d="M7 11.2V16c0 1.2 2.2 3 5 3s5-1.8 5-3v-4.8" />
    </svg>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { t, lang } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const onMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      element.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    element.addEventListener("mousemove", onMouseMove);
    return () => element.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <article ref={cardRef} className="project-card stagger-item">
      {project.previewImg ? (
        <a
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="project-preview-link"
        >
          <div className="project-shot">
            <Image
              src={project.previewImg}
              alt={`${project.title} website preview`}
              fill
              sizes="(max-width: 768px) 84vw, (max-width: 1200px) 50vw, 33vw"
              className="project-shot__image"
            />
            <div className="preview-overlay">
              <span className="preview-overlay__label">
                {t("projects.visit")} <ExternalLinkIcon />
              </span>
            </div>
          </div>
        </a>
      ) : null}

      <div className="project-card__header">
        <div>
          <div className="project-card__title-row">
            <h3 className="project-card__title">{project.title}</h3>
            <span className="status-active">{project.status[lang as keyof typeof project.status]}</span>
          </div>
          <p className="project-card__subtitle">{project.subtitle[lang as keyof typeof project.subtitle]}</p>
        </div>
        <a
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card__icon"
          title={`Visit ${project.title}`}
          aria-label={`Visit ${project.title}`}
        >
          <ExternalLinkIcon />
        </a>
      </div>

      <p className="project-card__description">{project.description[lang as keyof typeof project.description]}</p>

      <div className="project-card__footer">
        <div className="project-card__tags">
          {project.tech.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>
        <span className="project-card__period">{project.period[lang as keyof typeof project.period]}</span>
      </div>
    </article>
  );
}

export function Projects() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"client" | "study">("client");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>(".stagger-item", container);
      gsap.from(items, {
        y: 40,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 82%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  const visibleProjects = projects.filter((project) => {
    if (project.category === mode) return true;
    if (mode === "client" && project.showOnClientView) return true;
    return false;
  });

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <div className="projects-heading">
          <div>
            <p className="section-label">{t("projects.label")}</p>
            <h2 className="section-title">
              {t("projects.title1")}
              <br />
              <span style={{ color: "var(--text-muted)" }}>{t("projects.title2")}</span>
            </h2>
          </div>
          <p className="projects-intro">
            {t("projects.intro")}
          </p>
        </div>

        <div className="project-toggle" role="tablist" aria-label="Project categories">
          <button
            type="button"
            className={`project-toggle__button${mode === "client" ? " is-active" : ""}`}
            onClick={() => setMode("client")}
            aria-pressed={mode === "client"}
          >
            <ClientWorkIcon />
            {t("projects.tab.client")}
          </button>
          <button
            type="button"
            className={`project-toggle__button${mode === "study" ? " is-active" : ""}`}
            onClick={() => setMode("study")}
            aria-pressed={mode === "study"}
          >
            <StudyProjectIcon />
            {t("projects.tab.study")}
          </button>
        </div>

        <div ref={containerRef}>
          <div className="projects-grid projects-grid--all mobile-horizontal-scroll">
            {visibleProjects.map((project) => (
              <div key={project.id} className="mobile-horizontal-scroll__item mobile-horizontal-scroll__item--project">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
