"use client";

import { useState, FormEvent } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("customer");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        style={{
          background: "var(--forest)",
          color: "var(--white)",
          padding: "20px 32px",
          borderRadius: "8px",
          fontSize: "17px",
          fontWeight: 600,
          maxWidth: "480px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {message}
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "12px",
          maxWidth: "480px",
          margin: "0 auto 16px",
        }}
      >
        <input
          type="email"
          placeholder="Your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            flex: 1,
            padding: "14px 20px",
            borderRadius: "8px",
            border: "1px solid rgba(45, 80, 22, 0.2)",
            background: "var(--white)",
            fontSize: "16px",
            fontFamily: "var(--font-body), system-ui, sans-serif",
            outline: "none",
          }}
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={status === "loading"}
          style={{ opacity: status === "loading" ? 0.7 : 1 }}
        >
          {status === "loading" ? "..." : "Join"}
        </button>
      </form>

      <div
        style={{
          display: "flex",
          gap: "24px",
          justifyContent: "center",
          marginTop: "32px",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            color: "var(--stone)",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="type"
            value="customer"
            checked={type === "customer"}
            onChange={() => setType("customer")}
            style={{ accentColor: "var(--forest)" }}
          />
          I want to buy
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            color: "var(--stone)",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="type"
            value="vendor"
            checked={type === "vendor"}
            onChange={() => setType("vendor")}
            style={{ accentColor: "var(--forest)" }}
          />
          I want to sell
        </label>
      </div>

      {status === "error" && (
        <p style={{ color: "var(--terracotta)", textAlign: "center", marginTop: "12px", fontSize: "14px" }}>
          {message}
        </p>
      )}
    </>
  );
}
