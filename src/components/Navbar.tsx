import { useEffect, useState } from "react";
import { personal } from "../data/portfolio";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        inset: "0 0 auto 0",
        zIndex: 1000,
        height: "72px",
        padding: "0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(8, 10, 15, 0.8)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255, 244, 227, 0.08)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <a
        href="#hero"
        onClick={(event) => handleNavClick(event, "#hero")}
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: "1rem",
          color: "var(--text-primary)",
          textDecoration: "none",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {personal.name}
      </a>

      <div className="nav-desktop" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(event) => handleNavClick(event, link.href)}
            className="nav-link"
          >
            {link.label}
          </a>
        ))}
      </div>

      <button
        onClick={() => setMenuOpen((open) => !open)}
        className="nav-hamburger"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        style={{
          display: "none",
          background: "none",
          border: "none",
          padding: "8px",
          cursor: "pointer",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            style={{
              width: index === 1 ? "18px" : "24px",
              height: "1.5px",
              background: "var(--text-primary)",
              display: "block",
            }}
          />
        ))}
      </button>

      {menuOpen ? (
        <div className="nav-mobile-menu">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className="nav-mobile-link"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}

      <style>{`
        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-family: var(--font-body);
          font-size: 13px;
          letter-spacing: 0.04em;
          transition: color 0.2s ease;
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-mobile-menu {
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          padding: 24px 40px 32px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          background: rgba(8, 10, 15, 0.96);
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(24px);
        }

        .nav-mobile-link {
          color: var(--text-primary);
          text-decoration: none;
          font-family: var(--font-heading);
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }

          .nav-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
