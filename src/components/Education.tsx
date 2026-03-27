import { useStaggerReveal } from "../hooks/useScrollAnimation";
import { education } from "../data/portfolio";
import { useLanguage } from "../context/LanguageContext";

export function Education() {
  const { t, lang } = useLanguage();
  const containerRef = useStaggerReveal(".stagger-item");

  return (
    <section id="education" className="section">
      <div className="section-inner">
        <p className="section-label">{t("edu.label")}</p>
        <h2 className="section-title">{t("edu.title1")}<br /><span style={{ color: "var(--text-muted)" }}>{t("edu.title2")}</span></h2>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="education-grid mobile-horizontal-scroll"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "0" }}
        >
          {education.map((edu, i) => (
            <div
              key={edu.id}
              className="stagger-item mobile-horizontal-scroll__item mobile-horizontal-scroll__item--education"
              style={{
                position: "relative",
                padding: "32px 0",
                borderBottom: i < education.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-muted)",
                marginBottom: "16px",
                letterSpacing: "0.05em",
              }}>
                {edu.period[lang as keyof typeof edu.period]}
              </div>

              <h3 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--text-primary)",
                lineHeight: 1.4,
                marginBottom: "12px",
              }}>
                {edu.degree[lang as keyof typeof edu.degree]}
              </h3>

              <a
                href={edu.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "8px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
              >
                {typeof edu.institution === "string" ? edu.institution : edu.institution[lang as keyof typeof edu.institution]}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </a>

              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
                {edu.location[lang as keyof typeof edu.location]}
                {edu.level && (
                  <>
                    <span style={{ color: "rgba(255,247,234,0.2)" }}>·</span>
                    <span>{edu.level}</span>
                  </>
                )}
                {i === 0 && (
                  <>
                    <span style={{ color: "rgba(255,247,234,0.2)" }}>·</span>
                    <span style={{ color: "var(--accent)", fontSize: "10px", letterSpacing: "0.12em" }}>{t("edu.current")}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
