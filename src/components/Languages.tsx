import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { languages } from "../data/portfolio";
import { useStaggerReveal } from "../hooks/useScrollAnimation";
import { useLanguage } from "../context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const levelPercent: Record<string, number> = {
  A1: 12,
  A2: 25,
  B1: 45,
  B2: 60,
  C1: 80,
  C2: 95,
  Native: 100,
};

// Labels moved inside component

const flagByLanguage: Record<string, string> = {
  Slovenian: "SI",
  English: "EN",
  German: "DE",
  Russian: "RU",
};

export function Languages() {
  const { t, lang: currentLang } = useLanguage();
  const containerRef = useStaggerReveal(".stagger-item");
  const barsRef = useRef<HTMLDivElement>(null);

  const skillLabels = [
    { key: "listening", label: t("lang.listening") },
    { key: "reading", label: t("lang.reading") },
    { key: "production", label: t("lang.speaking") },
    { key: "interaction", label: t("lang.interaction") },
    { key: "writing", label: t("lang.writing") },
  ];

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
          container.querySelectorAll<HTMLElement>(".level-fill").forEach((fill) => {
            fill.classList.add("animated");
          });
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="languages" className="section" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-inner">
        <p className="section-label">{t("lang.label")}</p>
        <h2 className="section-title">
          {t("lang.title1")}
          <br />
          <span style={{ color: "var(--text-muted)" }}>{t("lang.title2")}</span>
        </h2>

        <div ref={barsRef}>
          <div
            ref={containerRef as React.RefObject<HTMLDivElement>}
            className="languages-grid mobile-horizontal-scroll"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "0 40px",
            }}
          >
            {languages.map((lang, i) => (
              <div
                key={lang.keyName}
                className="stagger-item mobile-horizontal-scroll__item mobile-horizontal-scroll__item--language"
                style={{
                  padding: "32px 0",
                  borderBottom: i < languages.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span className="language-chip">{flagByLanguage[lang.keyName] ?? lang.keyName.slice(0, 2).toUpperCase()}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {lang.name[currentLang as keyof typeof lang.name]}
                    </span>
                  </div>
                  <span className="language-level">{lang.level[currentLang as keyof typeof lang.level]}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {skillLabels.map(({ key, label }) => {
                    const level = lang.skills[key as keyof typeof lang.skills];
                    const percent = levelPercent[level] ?? (level === "Materni jezik" ? 100 : 0);

                    return (
                      <div key={key}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "6px",
                          }}
                        >
                          <span className="language-skill-label">{label}</span>
                          <span className="language-skill-value">{level}</span>
                        </div>
                        <div className="level-bar">
                          <div className="level-fill" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="language-legend">
          <span className="language-legend__label">{t("lang.scale")}</span>
          {[
            { range: "A1-A2", desc: t("lang.basic") },
            { range: "B1-B2", desc: t("lang.independent") },
            { range: "C1-C2", desc: t("lang.proficient") },
          ].map((item) => (
            <div key={item.range} className="language-legend__item">
              <span className="language-legend__range">{item.range}</span>
              <span className="language-legend__desc">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
