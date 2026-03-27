import { useStaggerReveal } from "../hooks/useScrollAnimation";
import {
  programmingSkills, frameworkSkills, databaseSkills,
  toolSkills, deploymentSkills,
} from "../data/portfolio";

import { useLanguage } from "../context/LanguageContext";

export function Skills() {
  const { t } = useLanguage();
  const containerRef = useStaggerReveal(".skill-group");

  const groups = [
    { label: t("skills.group1"), skills: programmingSkills },
    { label: t("skills.group2"), skills: frameworkSkills },
    { label: t("skills.group3"), skills: databaseSkills },
    { label: t("skills.group4"), skills: toolSkills },
    { label: t("skills.group5"), skills: deploymentSkills },
  ];

  return (
    <section id="skills" className="section" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-inner">
        <p className="section-label">{t("skills.label")}</p>
        <h2 className="section-title">{t("skills.title1")}<br /><span style={{ color: "var(--text-muted)" }}>{t("skills.title2")}</span></h2>

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
