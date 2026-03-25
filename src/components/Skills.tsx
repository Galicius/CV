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
          style={{ display: "flex", flexDirection: "column", gap: "48px" }}
        >
          {groups.map((group) => (
            <div key={group.label} className="skill-group">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                  }}
                >
                  {group.label}
                </span>
                <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-badge">
                    {skill}
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
