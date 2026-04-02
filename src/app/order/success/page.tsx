export default function OrderSuccess() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--parchment)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <div>
        <p style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</p>
        <h1
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "36px",
            color: "var(--ink)",
            marginBottom: "12px",
          }}
        >
          Order confirmed!
        </h1>
        <p style={{ fontSize: "17px", color: "var(--stone)", marginBottom: "32px", lineHeight: 1.7 }}>
          Your fresh goods are on the way. Check your email for delivery details.
        </p>
        <a href="/" className="btn-primary">Back to Porch Market</a>
      </div>
    </main>
  );
}
