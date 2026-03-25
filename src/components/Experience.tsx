import { useRef } from "react";
import { experiences } from "../data/portfolio";
import { useStaggerReveal } from "../hooks/useScrollAnimation";

export function Experience() {
  const containerRef = useStaggerReveal(".stagger-item");
  const headRef = useRef<HTMLDivElement>(null);

  return (
    <section id="experience" className="section" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-inner">
        <div ref={headRef}>
          <p className="section-label">Work Experience</p>
          <h2 className="section-title">Where I've<br /><span style={{ color: "var(--text-muted)" }}>worked</span></h2>
        </div>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          style={{ display: "flex", flexDirection: "column", gap: "0" }}
        >
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className="stagger-item timeline-item"
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1px 1fr",
                gap: "0 32px",
                paddingBottom: i < experiences.length - 1 ? "48px" : "0",
                alignItems: "start",
              }}
            >
              {/* Date / Company */}
              <div style={{ paddingTop: "4px", textAlign: "right" }}>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  letterSpacing: "0.05em",
                  marginBottom: "8px",
                }}>
                  {exp.period}
                </div>
                <div style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                }}>
                  {exp.company}
                </div>
                <div style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  marginTop: "4px",
                }}>
                  {exp.location}
                </div>
              </div>

              {/* Timeline line + dot */}
              <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="timeline-dot" style={{ marginTop: "6px" }} />
                {i < experiences.length - 1 && (
                  <div className="timeline-line" style={{ flex: 1, marginTop: "8px" }} />
                )}
              </div>

              {/* Content */}
              <div
                className="card"
                style={{ marginBottom: i < experiences.length - 1 ? "0" : "0" }}
              >
                <h3 style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "12px",
                }}>
                  {exp.role}
                </h3>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-item {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .timeline-item > :first-child { text-align: left !important; }
          .timeline-line, .timeline-dot { display: none !important; }
        }
      `}</style>
    </section>
  );
}
