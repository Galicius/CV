import { personal } from "../data/portfolio";
import { useFadeInUp } from "../hooks/useScrollAnimation";
import { useLanguage } from "../context/LanguageContext";

export function About() {
  const { t, lang } = useLanguage();
  const headRef = useFadeInUp(0);
  const bioRef = useFadeInUp(0.1);
  const statsRef = useFadeInUp(0.2);

  const stats = [
    { value: "4+", label: t("about.years") },
    { value: "8+", label: t("about.projects") },
    { value: "15+", label: t("about.tech") },
    { value: "3", label: t("about.langs") },
  ];

  return (
    <section id="about" className="section">
      <div className="section-inner">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="about-grid">
          {/* Left */}
          <div ref={headRef as React.RefObject<HTMLDivElement>}>
            <p className="section-label">{t("about.label")}</p>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "32px" }}>
              {t("about.title1")}<br />
              <span style={{ color: "var(--text-muted)" }}>{t("about.title2")}</span>
            </h2>
            <p
              ref={bioRef as React.RefObject<HTMLParagraphElement>}
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                fontSize: "15px",
                marginBottom: "24px",
              }}
            >
              {personal.about[lang as keyof typeof personal.about]}
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href={`mailto:${personal.email}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                {personal.email}
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Right — Stats */}
          <div
            ref={statsRef as React.RefObject<HTMLDivElement>}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px 40px",
            }}
          >
            {stats.map((stat, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.03em",
                    marginBottom: "8px",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
