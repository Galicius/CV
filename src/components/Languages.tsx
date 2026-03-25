import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { languages } from "../data/portfolio";
import { useStaggerReveal } from "../hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

const levelPercent: Record<string, number> = {
  A1: 12, A2: 25, B1: 45, B2: 60, C1: 80, C2: 95, Native: 100,
};

const skillLabels = [
  { key: "listening", label: "Listening" },
  { key: "reading", label: "Reading" },
  { key: "production", label: "Speaking" },
  { key: "interaction", label: "Interaction" },
  { key: "writing", label: "Writing" },
];

export function Languages() {
  const containerRef = useStaggerReveal(".stagger-item");
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = barsRef.current;
    if (!container) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.create({
        trigger: container,
        start: "top 80%",
        once: true,
        onEnter: () => {
          const fills = container.querySelectorAll<HTMLElement>(".level-fill");
          fills.forEach((fill) => fill.classList.add("animated"));
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="languages" className="section" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-inner">
        <p className="section-label">Languages</p>
        <h2 className="section-title">Language<br /><span style={{ color: "var(--text-muted)" }}>proficiencies</span></h2>

        <div
          ref={barsRef}
          style={{ display: "block" }}
        >
          <div
            ref={containerRef as React.RefObject<HTMLDivElement>}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {languages.map((lang) => (
              <div key={lang.name} className="stagger-item card">
                {/* Header */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "22px" }}>{lang.flag}</span>
                    <span style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}>
                      {lang.name}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border)",
                    padding: "3px 10px",
                    borderRadius: "100px",
                  }}>
                    {lang.level}
                  </span>
                </div>

                {/* Skill bars */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {skillLabels.map(({ key, label }) => {
                    const lvl = lang.skills[key as keyof typeof lang.skills];
                    const pct = levelPercent[lvl] ?? 0;
                    return (
                      <div key={key}>
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "6px",
                        }}>
                          <span style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "12px",
                            color: "var(--text-muted)",
                          }}>
                            {label}
                          </span>
                          <span style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            color: "var(--text-secondary)",
                          }}>
                            {lvl}
                          </span>
                        </div>
                        <div className="level-bar">
                          <div
                            className="level-fill"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CEFR legend */}
        <div style={{
          marginTop: "48px",
          padding: "20px 24px",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          alignItems: "center",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}>
            CEFR Scale
          </span>
          {[
            { range: "A1 – A2", desc: "Basic" },
            { range: "B1 – B2", desc: "Independent" },
            { range: "C1 – C2", desc: "Proficient" },
          ].map((item) => (
            <div key={item.range} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-secondary)" }}>
                {item.range}
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--text-muted)" }}>
                — {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
