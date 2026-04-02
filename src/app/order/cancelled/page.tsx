export default function OrderCancelled() {
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
        <h1
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "36px",
            color: "var(--ink)",
            marginBottom: "12px",
          }}
        >
          Order cancelled
        </h1>
        <p style={{ fontSize: "17px", color: "var(--stone)", marginBottom: "32px" }}>
          No worries — your cart will be here when you&apos;re ready.
        </p>
        <a href="/" className="btn-primary">Back to Porch Market</a>
      </div>
    </main>
  );
}
