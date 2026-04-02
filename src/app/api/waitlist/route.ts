import { NextRequest, NextResponse } from "next/server";

const CORTEX_URL = process.env.CORTEX_URL || "http://cortex.nova";

export async function POST(req: NextRequest) {
  try {
    const { email, type } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    const role = type === "vendor" ? "vendor" : "customer";

    // Store in Cortex as a contact
    const res = await fetch(`${CORTEX_URL}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: email.split("@")[0],
        email,
        source: "porch-market-waitlist",
        tags: [`waitlist-${role}`, "porch-market"],
        notes: `Waitlist signup: ${role}. Signed up ${new Date().toISOString()}.`,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      // Duplicate email is fine — they're already on the list
      if (text.includes("duplicate") || text.includes("unique")) {
        return NextResponse.json({ success: true, message: "Already on the list!" });
      }
      throw new Error(`Cortex error: ${res.status}`);
    }

    // Log activity
    await fetch(`${CORTEX_URL}/activity`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        actor: "website",
        action: "signed_up",
        entity_type: "contact",
        summary: `New ${role} waitlist signup: ${email}`,
      }),
    }).catch(() => {}); // Don't fail on activity log errors

    return NextResponse.json({
      success: true,
      message: "You're on the list!",
    });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
