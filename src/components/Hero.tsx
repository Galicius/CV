import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { personal } from "../data/portfolio";
import { useLanguage } from "../context/LanguageContext";

export function Hero() {
  const { t, lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ delay: 0.12, defaults: { ease: "power2.out" } });
      tl.from([metaRef.current, titleRef.current], {
        y: 22,
        autoAlpha: 0,
        duration: 0.72,
        stagger: 0.08,
      }).from(
        [subtitleRef.current, ctaRef.current],
        { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.06 },
        "-=0.36",
      );
    });
    return () => mm.revert();
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "120px 40px 80px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Meta line */}
        <div
          ref={metaRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#2ecc71",
              display: "inline-block",
              boxShadow: "0 0 12px rgba(46, 204, 113, 0.4)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            {t("hero.available")}
          </span>
        </div>

        {/* Main title */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            color: "var(--text-primary)",
            marginBottom: "32px",
          }}
        >
          {personal.name.split(" ").map((word, i) => (
            <span
              key={i}
              style={{
                display: "block",
                color: i === 1 ? "rgba(255,255,255,0.35)" : "var(--text-primary)",
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(14px, 2vw, 17px)",
            color: "var(--text-secondary)",
            maxWidth: "540px",
            lineHeight: 1.7,
            marginBottom: "48px",
            fontWeight: 400,
          }}
        >
          {personal.subtitle[lang as keyof typeof personal.subtitle]}
          <span style={{ display: "block", marginTop: "8px", color: "var(--text-muted)", fontSize: "13px", fontFamily: "var(--font-mono)" }}>
            {personal.location}
          </span>
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
        >
          <a
            href="#projects"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("hero.viewProjects")}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="btn-outline"
          >
            {t("hero.getInTouch")}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        onClick={scrollToAbout}
        style={{
          position: "absolute",
          bottom: "48px",
          left: "40px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          opacity: 0.4,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.4")}
      >
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "var(--text-secondary)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            transform: "rotate(90deg) translateX(-20px)",
            whiteSpace: "nowrap",
          }}
        >
          {t("hero.scroll")}
        </span>
      </div>
    </section>
  );
}
