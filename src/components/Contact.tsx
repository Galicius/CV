import { personal } from "../data/portfolio";
import { useLanguage } from "../context/LanguageContext";

const contactItems = [
  {
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: "Location",
    value: personal.location,
    href: "https://maps.google.com/?q=Maribor,Slovenia",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "Galicius",
    href: personal.github,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
];

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section">
      <div className="section-inner">
        <div
          style={{ textAlign: "center", maxWidth: "540px", margin: "0 auto 64px" }}
        >
          <p className="section-label" style={{ justifyContent: "center" }}>{t("contact.label")}</p>
          <h2 className="section-title" style={{ marginBottom: "20px" }}>
            {t("contact.title1")}<br /><span style={{ color: "var(--text-muted)" }}>{t("contact.title2")}</span>
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
          }}>
            {t("contact.text")}
          </p>
        </div>

        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {contactItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              target={item.label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                padding: "24px 28px",
                background: "#10151e",
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
                textDecoration: "none",
                transition: "background-color 180ms ease, box-shadow 180ms ease",
                gridColumn: i === contactItems.length - 1 && contactItems.length % 2 !== 0 ? "1 / -1" : undefined,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#151c27")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#10151e")}
            >
              <div style={{ color: "var(--text-muted)" }}>{item.icon}</div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}>
                {item.label}
              </div>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "var(--text-primary)",
                fontWeight: 500,
                wordBreak: "break-all",
              }}>
                {item.value}
              </div>
            </a>
          ))}
        </div>

        {/* Big email CTA */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <a
            href={`mailto:${personal.email}`}
            className="btn-primary"
            style={{ fontSize: "16px", padding: "18px 40px" }}
          >
            {t("contact.button")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
