import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

interface ProjectCardProps {
  project: typeof projects[0];
  featured?: boolean;
}

function ProjectCard({ project, featured }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("mousemove", onMouseMove);
    return () => el.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div ref={cardRef} className={`project-card stagger-item ${featured ? "featured" : ""}`}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <h3 style={{
              fontFamily: "var(--font-heading)",
              fontSize: featured ? "20px" : "16px",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}>
              {project.title}
            </h3>
            <span
              className="status-active"
              style={{ opacity: project.status === "Active" ? 1 : 0.5 }}
            >
              {project.status}
            </span>
          </div>
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "var(--text-muted)",
          }}>
            {project.subtitle}
          </div>
        </div>
        {/* Links */}
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              }}
              title="Live demo"
            >
              <ExternalLinkIcon />
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              }}
              title="Source code"
            >
              <GitHubIcon />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "var(--font-body)",
        fontSize: "13px",
        color: "var(--text-secondary)",
        lineHeight: 1.75,
        marginBottom: "20px",
      }}>
        {project.description}
      </p>

      {/* Embedded Iframe */}
      {(project as any).iframeSrc && (
        <div style={{
          width: "100%",
          height: "320px",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "20px",
          border: "1px solid var(--border)",
          background: "var(--bg-primary)",
        }}>
          <iframe 
            src={(project as any).iframeSrc} 
            title={project.title}
            style={{ width: "100%", height: "100%", border: "none" }}
            loading="lazy"
          />
        </div>
      )}

      {/* Footer */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.tech.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          color: "var(--text-muted)",
          letterSpacing: "0.05em",
          flexShrink: 0,
        }}>
          {project.period}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>(".stagger-item", container);
      gsap.from(items, {
        y: 40,
        autoAlpha: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <p className="section-label">Projects</p>
        <h2 className="section-title">Things I've<br /><span style={{ color: "var(--text-muted)" }}>built</span></h2>
        <div ref={containerRef}>
          {/* Featured — 2 columns */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "16px",
            marginBottom: "16px",
          }}>
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p as any} featured />
            ))}
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}>
            {rest.map((p) => (
              <ProjectCard key={p.id} project={p as any} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
