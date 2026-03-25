import { personal } from "../data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "32px 40px",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--text-muted)",
        letterSpacing: "0.05em",
      }}>
        © {year} {personal.name}
      </div>
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--text-muted)",
        letterSpacing: "0.05em",
      }}>
        Built with React · GSAP · Tailwind
      </div>
      <a
        href={personal.github}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-muted)",
          textDecoration: "none",
          letterSpacing: "0.05em",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text-primary)")}
        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}
      >
        GitHub ↗
      </a>
    </footer>
  );
}
