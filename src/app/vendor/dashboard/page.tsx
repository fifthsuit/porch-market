"use client";

import { useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function DashboardContent() {
  const searchParams = useSearchParams();
  const accountId = searchParams.get("account");

  const [products, setProducts] = useState<
    Array<{ name: string; price: string; type: string; id?: string }>
  >([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productType, setProductType] = useState("subscription");
  const [saving, setSaving] = useState(false);

  async function handleAddProduct(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/stripe/create-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_id: accountId,
          name,
          description,
          price_cents: Math.round(parseFloat(price) * 100),
          recurring: productType === "subscription" ? "weekly" : null,
        }),
      });
      const data = await res.json();

      if (data.productId) {
        setProducts([
          ...products,
          { name, price: `$${price}`, type: productType, id: data.productId },
        ]);
        setName("");
        setDescription("");
        setPrice("");
        setShowForm(false);
      }
    } catch {
      alert("Failed to create product");
    } finally {
      setSaving(false);
    }
  }

  if (!accountId) {
    return (
      <main style={{ minHeight: "100vh", background: "var(--parchment)", padding: "40px 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", paddingTop: "80px" }}>
          <h1 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "32px", color: "var(--ink)", marginBottom: "16px" }}>
            No account connected
          </h1>
          <p style={{ color: "var(--stone)", marginBottom: "24px" }}>
            You need to complete vendor onboarding first.
          </p>
          <a href="/vendor" className="btn-primary">Set Up Vendor Account</a>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--parchment)" }}>
      {/* Header */}
      <header
        style={{
          padding: "20px 40px",
          borderBottom: "1px solid rgba(45, 80, 22, 0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "24px",
            color: "var(--forest)",
            textDecoration: "none",
          }}
        >
          Porch Market
        </a>
        <span
          style={{
            fontSize: "13px",
            color: "var(--stone)",
            background: "var(--cream)",
            padding: "6px 12px",
            borderRadius: "20px",
          }}
        >
          Vendor Dashboard
        </span>
      </header>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "32px",
                color: "var(--ink)",
                marginBottom: "4px",
              }}
            >
              Your Products
            </h1>
            <p style={{ color: "var(--stone)", fontSize: "15px" }}>
              Manage what you sell on Porch Market
            </p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "+ Add Product"}
          </button>
        </div>

        {/* Add Product Form */}
        {showForm && (
          <form
            onSubmit={handleAddProduct}
            style={{
              background: "var(--cream)",
              borderRadius: "12px",
              padding: "32px",
              marginBottom: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "var(--ink)", marginBottom: "6px" }}>
                Product Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Weekly Veggie Box"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid rgba(45, 80, 22, 0.15)",
                  background: "var(--white)",
                  fontSize: "16px",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "var(--ink)", marginBottom: "6px" }}>
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's included? How much produce?"
                rows={3}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid rgba(45, 80, 22, 0.15)",
                  background: "var(--white)",
                  fontSize: "16px",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "var(--ink)", marginBottom: "6px" }}>
                  Price ($)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="35.00"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(45, 80, 22, 0.15)",
                    background: "var(--white)",
                    fontSize: "16px",
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "var(--ink)", marginBottom: "6px" }}>
                  Type
                </label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(45, 80, 22, 0.15)",
                    background: "var(--white)",
                    fontSize: "16px",
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="subscription">Weekly Subscription</option>
                  <option value="single">Single Purchase</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={saving}
              style={{ alignSelf: "flex-start", opacity: saving ? 0.7 : 1 }}
            >
              {saving ? "Creating..." : "Create Product"}
            </button>
          </form>
        )}

        {/* Product List */}
        {products.length === 0 && !showForm ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "var(--cream)",
              borderRadius: "12px",
            }}
          >
            <p style={{ fontSize: "40px", marginBottom: "16px" }}>🌱</p>
            <p style={{ fontSize: "18px", color: "var(--ink)", fontWeight: 600, marginBottom: "8px" }}>
              No products yet
            </p>
            <p style={{ fontSize: "15px", color: "var(--stone)" }}>
              Add your first product to start selling on Porch Market.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {products.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 24px",
                  background: "var(--white)",
                  borderRadius: "10px",
                  border: "1px solid rgba(45, 80, 22, 0.08)",
                }}
              >
                <div>
                  <p style={{ fontWeight: 600, fontSize: "16px", color: "var(--ink)" }}>
                    {p.name}
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--stone)", marginTop: "2px" }}>
                    {p.type === "subscription" ? "Weekly subscription" : "One-time purchase"}
                  </p>
                </div>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "var(--forest)",
                  }}
                >
                  {p.price}
                  {p.type === "subscription" && (
                    <span style={{ fontSize: "13px", fontWeight: 400, color: "var(--stone)" }}>/wk</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function VendorDashboard() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--parchment)" }} />}>
      <DashboardContent />
    </Suspense>
  );
}
