import { useStaggerReveal } from "../hooks/useScrollAnimation";
import {
  programmingSkills, frameworkSkills, databaseSkills,
  toolSkills, deploymentSkills,
} from "../data/portfolio";

const groups = [
  { label: "Languages", skills: programmingSkills },
  { label: "Frameworks & Libraries", skills: frameworkSkills },
  { label: "Databases", skills: databaseSkills },
  { label: "Tools & Platforms", skills: toolSkills },
  { label: "Deployment", skills: deploymentSkills },
];

export function Skills() {
  const containerRef = useStaggerReveal(".skill-group");

  return (
    <section id="skills" className="section" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-inner">
        <p className="section-label">Technical Skills</p>
        <h2 className="section-title">What I<br /><span style={{ color: "var(--text-muted)" }}>work with</span></h2>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          style={{ display: "flex", flexDirection: "column", gap: "36px" }}
        >
          {groups.map((group) => (
            <div key={group.label} className="skill-group">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    flexShrink: 0,
                  }}
                >
                  {group.label}
                </span>
                <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
              </div>

              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "var(--text-secondary)",
                lineHeight: 2,
              }}>
                {group.skills.map((skill, i) => (
                  <span key={skill} className="skill-item">
                    <span
                      style={{ transition: "color 0.2s", cursor: "default" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
                    >
                      {skill}
                    </span>
                    {i < group.skills.length - 1 && (
                      <span style={{ color: "rgba(255,247,234,0.2)", margin: "0 10px" }}>·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
