import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { personal } from "../data/portfolio";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(gridRef.current, { autoAlpha: 0, duration: 1.5, ease: "power2.out" })
        .from(metaRef.current, { y: 20, autoAlpha: 0, duration: 0.6, ease: "power3.out" }, "-=0.8")
        .from(titleRef.current, { y: 40, autoAlpha: 0, duration: 0.9, ease: "power3.out" }, "-=0.4")
        .from(subtitleRef.current, { y: 24, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .from(ctaRef.current, { y: 20, autoAlpha: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .from(scrollRef.current, { autoAlpha: 0, duration: 0.6, ease: "power2.out" }, "-=0.2");
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
      {/* Background grid lines removed */}

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

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
              background: "rgba(255,255,255,0.5)",
              display: "inline-block",
              boxShadow: "0 0 12px rgba(255,255,255,0.3)",
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
            Available for opportunities
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
          {personal.subtitle}
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
            View Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="btn-outline"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
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
            animation: "scrollLine 2s ease-in-out infinite",
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
          Scroll
        </span>
        <style>{`
          @keyframes scrollLine {
            0%, 100% { transform: scaleY(1); transform-origin: top; }
            50% { transform: scaleY(0.5); transform-origin: top; }
          }
        `}</style>
      </div>
    </section>
  );
}
