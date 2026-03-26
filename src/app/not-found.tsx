export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "420px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: "16px",
          }}
        >
          Not Found
        </p>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            lineHeight: 0.95,
            marginBottom: "16px",
            color: "var(--text-primary)",
          }}
        >
          This page does not exist.
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            lineHeight: 1.7,
          }}
        >
          The page you were looking for could not be found.
        </p>
      </div>
    </main>
  );
}
