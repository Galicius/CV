import { useStaggerReveal } from "../hooks/useScrollAnimation";
import { education } from "../data/portfolio";

export function Education() {
  const containerRef = useStaggerReveal(".stagger-item");

  return (
    <section id="education" className="section">
      <div className="section-inner">
        <p className="section-label">Education</p>
        <h2 className="section-title">Academic<br /><span style={{ color: "var(--text-muted)" }}>background</span></h2>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}
        >
          {education.map((edu, i) => (
            <div
              key={edu.id}
              className="stagger-item card"
              style={{
                position: "relative",
                borderColor: i === 0 ? "rgba(255,255,255,0.12)" : "var(--border)",
              }}
            >
              {i === 0 && (
                <div style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  background: "rgba(255,255,255,0.05)",
                  padding: "4px 10px",
                  borderRadius: "100px",
                  border: "1px solid var(--border)",
                }}>
                  Current
                </div>
              )}

              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-muted)",
                marginBottom: "16px",
                letterSpacing: "0.05em",
              }}>
                {edu.period}
              </div>

              <h3 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--text-primary)",
                lineHeight: 1.4,
                marginBottom: "12px",
              }}>
                {edu.degree}
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
                {edu.institution}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </a>

              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-muted)",
              }}>
                {edu.location}
                {edu.level && (
                  <span style={{
                    marginLeft: "12px",
                    padding: "2px 8px",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                  }}>
                    {edu.level}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
