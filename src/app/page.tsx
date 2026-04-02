import Image from "next/image";
import WaitlistForm from "./components/WaitlistForm";

export default function Home() {
  return (
    <main>
      {/* Nav */}
      <nav className="nav">
        <span className="nav-logo">Porch Market</span>
        <div className="nav-links">
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#vendors" className="nav-link">For Vendors</a>
          <a href="#waitlist" className="btn-primary nav-cta">Join the Waitlist</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div>
          <p
            style={{
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--terracotta)",
              marginBottom: "20px",
            }}
          >
            Northshore &amp; Greater New Orleans
          </p>
          <h1
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: 1.05,
              color: "var(--ink)",
              marginBottom: "24px",
            }}
          >
            The market
            <br />
            comes to you.
          </h1>
          <p
            style={{
              fontSize: "19px",
              lineHeight: 1.7,
              color: "var(--stone)",
              maxWidth: "440px",
              marginBottom: "36px",
            }}
          >
            Subscribe to weekly boxes from your favorite local vendors, or shop
            single items — delivered straight to your porch.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="#waitlist" className="btn-primary">
              Get Early Access
            </a>
            <a href="#how-it-works" className="btn-secondary">
              See How It Works
            </a>
          </div>
        </div>
        <div className="hero-image">
          <Image
            src="/hero-porch.png"
            alt="Fresh produce in wooden crates on a Southern porch"
            fill
            priority
            className="img-warm"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      {/* Social proof strip */}
      <section
        style={{
          background: "var(--cream)",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            color: "var(--stone)",
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          Connecting local farmers, bakers, and makers with homes across the Northshore and Greater New Orleans
        </p>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section">
        <p
          style={{
            fontWeight: 600,
            fontSize: "13px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--terracotta)",
            marginBottom: "16px",
          }}
        >
          How It Works
        </p>
        <h2
          style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            color: "var(--ink)",
            marginBottom: "48px",
            maxWidth: "500px",
          }}
        >
          Farm fresh, three easy steps.
        </h2>

        <div className="steps-grid">
          {[
            {
              num: "01",
              title: "Browse Local Vendors",
              desc: "Explore farmers, bakers, and artisans in your area. See what\u2019s fresh this week \u2014 it changes with the seasons.",
            },
            {
              num: "02",
              title: "Subscribe or Buy Once",
              desc: "Set up a weekly or biweekly box, or just grab what you need. Flexible plans, cancel anytime.",
            },
            {
              num: "03",
              title: "Delivered to Your Porch",
              desc: "Your order arrives fresh on your delivery day. No crowds, no parking, no wilting in the car.",
            },
          ].map((step) => (
            <div key={step.num}>
              <span
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "48px",
                  color: "var(--cream)",
                  display: "block",
                  marginBottom: "12px",
                  lineHeight: 1,
                  WebkitTextStroke: "1px var(--forest)",
                }}
              >
                {step.num}
              </span>
              <h3
                style={{
                  fontSize: "22px",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginBottom: "12px",
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--stone)" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Market image break */}
      <section className="image-break">
        <Image
          src="/hero-market.png"
          alt="Vibrant farmers market with fresh produce"
          fill
          className="img-warm"
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(250,247,242,0.3), rgba(250,247,242,0))",
          }}
        />
      </section>

      {/* For Vendors */}
      <section
        id="vendors"
        style={{
          background: "var(--forest)",
          padding: "60px 24px",
        }}
      >
        <div className="vendor-grid">
          <div>
            <p
              style={{
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--terracotta-light)",
                marginBottom: "16px",
              }}
            >
              For Vendors
            </p>
            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 48px)",
                color: "var(--white)",
                marginBottom: "24px",
              }}
            >
              Sell beyond the Saturday market.
            </h2>
            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.75)",
                marginBottom: "36px",
                maxWidth: "460px",
              }}
            >
              You grow it, bake it, make it. We handle the subscriptions,
              payments, and delivery logistics. More customers, less standing in
              the heat.
            </p>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "40px",
              }}
            >
              {[
                "Set your own prices and availability",
                "Subscription revenue you can count on",
                "We handle delivery \u2014 you handle freshness",
                "Dashboard to manage orders and inventory",
                "Stripe payouts direct to your bank",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <span style={{ color: "var(--terracotta-light)", fontSize: "18px", lineHeight: "24px" }}>
                    &#10003;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#waitlist"
              className="btn-primary"
              style={{ background: "var(--terracotta)" }}
            >
              Apply as a Vendor
            </a>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              borderRadius: "16px",
              padding: "32px 24px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontWeight: 700,
                color: "var(--white)",
                marginBottom: "32px",
              }}
            >
              Revenue Example
            </h3>
            {[
              { label: "Weekly subscribers", value: "50 homes" },
              { label: "Average box price", value: "$35" },
              { label: "Weekly revenue", value: "$1,750" },
              { label: "Monthly revenue", value: "$7,000" },
              { label: "Platform fee", value: "12%" },
              { label: "Your monthly take", value: "$6,160" },
            ].map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  borderBottom:
                    i < 5 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px" }}>
                  {row.label}
                </span>
                <span
                  style={{
                    color: i === 5 ? "var(--terracotta-light)" : "var(--white)",
                    fontWeight: i === 5 ? 700 : 500,
                    fontSize: i === 5 ? "20px" : "15px",
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's in the Box */}
      <section className="section">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p
            style={{
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--terracotta)",
              marginBottom: "16px",
            }}
          >
            What You Get
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              color: "var(--ink)",
              marginBottom: "16px",
            }}
          >
            Straight from the source.
          </h2>
          <p style={{ fontSize: "18px", color: "var(--stone)", maxWidth: "520px", margin: "0 auto" }}>
            Every vendor curates their own offerings. Here&apos;s the kind of thing you&apos;ll find.
          </p>
        </div>
        <div className="category-grid">
          {[
            {
              emoji: "\ud83c\udf45",
              title: "Seasonal Produce",
              desc: "Creole tomatoes, okra, peppers, greens \u2014 whatever\u2019s ripe this week.",
            },
            {
              emoji: "\ud83c\udf5e",
              title: "Fresh Bread & Pastries",
              desc: "Sourdough, beignets, king cake in season. Baked that morning.",
            },
            {
              emoji: "\ud83e\uddc0",
              title: "Dairy & Eggs",
              desc: "Farm eggs, local cheeses, fresh butter. The good stuff.",
            },
            {
              emoji: "\ud83c\udf36\ufe0f",
              title: "Sauces & Preserves",
              desc: "Hot sauce, pepper jelly, seasonal jams. Louisiana flavor in a jar.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "var(--cream)",
                borderRadius: "12px",
                padding: "24px 20px",
              }}
            >
              <span style={{ fontSize: "32px", display: "block", marginBottom: "12px" }}>
                {item.emoji}
              </span>
              <h3
                style={{
                  fontSize: "17px",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginBottom: "8px",
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--stone)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist CTA */}
      <section
        id="waitlist"
        style={{
          background: "var(--cream)",
          padding: "60px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              color: "var(--ink)",
              marginBottom: "16px",
            }}
          >
            Get first pick.
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "var(--stone)",
              marginBottom: "40px",
              lineHeight: 1.7,
            }}
          >
            We&apos;re launching soon on the Northshore and Greater New Orleans. Join
            the waitlist to get early access — whether you&apos;re hungry or selling.
          </p>

          <WaitlistForm />
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "var(--ink)",
          color: "rgba(255,255,255,0.5)",
          padding: "40px 24px",
        }}
      >
        <div className="footer-inner">
          <div>
            <span
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "22px",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Porch Market
            </span>
            <p style={{ fontSize: "13px", marginTop: "8px" }}>
              Northshore &amp; Greater New Orleans
            </p>
          </div>
          <p style={{ fontSize: "13px" }}>
            &copy; 2026 Porch Market. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
