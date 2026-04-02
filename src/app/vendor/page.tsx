"use client";

import { useState, FormEvent } from "react";

export default function VendorSignup() {
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/stripe/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, business_name: businessName }),
      });
      const data = await res.json();

      if (data.onboardingUrl) {
        window.location.href = data.onboardingUrl;
      } else {
        throw new Error(data.error || "Failed to create account");
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--parchment)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: "480px", width: "100%" }}>
        <a
          href="/"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "24px",
            color: "var(--forest)",
            textDecoration: "none",
            display: "block",
            marginBottom: "40px",
          }}
        >
          Porch Market
        </a>

        <h1
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "36px",
            color: "var(--ink)",
            marginBottom: "12px",
          }}
        >
          Start selling.
        </h1>
        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
            color: "var(--stone)",
            marginBottom: "40px",
          }}
        >
          Set up your vendor account in minutes. You&apos;ll be able to list
          products, create subscription boxes, and start taking orders.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: "6px",
              }}
            >
              Business or Farm Name
            </label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Bayou Fresh Farms"
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid rgba(45, 80, 22, 0.2)",
                background: "var(--white)",
                fontSize: "16px",
                fontFamily: "var(--font-body), system-ui, sans-serif",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: "6px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid rgba(45, 80, 22, 0.2)",
                background: "var(--white)",
                fontSize: "16px",
                fontFamily: "var(--font-body), system-ui, sans-serif",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={status === "loading"}
            style={{
              width: "100%",
              marginTop: "8px",
              opacity: status === "loading" ? 0.7 : 1,
              textAlign: "center",
            }}
          >
            {status === "loading" ? "Setting up..." : "Create Vendor Account"}
          </button>

          {error && (
            <p style={{ color: "var(--terracotta)", fontSize: "14px" }}>
              {error}
            </p>
          )}
        </form>

        <p
          style={{
            marginTop: "24px",
            fontSize: "13px",
            color: "var(--stone)",
            lineHeight: 1.6,
          }}
        >
          You&apos;ll be redirected to Stripe to complete account setup and
          verify your identity. Porch Market takes a {12}% platform fee on each
          sale. Payouts go directly to your bank.
        </p>
      </div>
    </main>
  );
}
