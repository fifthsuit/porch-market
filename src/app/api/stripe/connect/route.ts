import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

// Create a Stripe Connect account for a vendor and return the onboarding link
export async function POST(req: NextRequest) {
  try {
    const { email, business_name } = await req.json();

    if (!email || !business_name) {
      return NextResponse.json(
        { error: "Email and business name required" },
        { status: 400 }
      );
    }

    // Create a Connect Express account
    const account = await getStripe().accounts.create({
      type: "express",
      email,
      business_type: "individual",
      business_profile: {
        name: business_name,
        mcc: "5411", // Grocery stores
        product_description:
          "Local farmers market vendor selling fresh produce and goods via Porch Market",
      },
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    // Create onboarding link
    const origin = req.headers.get("origin") || "https://porch-market.vercel.app";
    const accountLink = await getStripe().accountLinks.create({
      account: account.id,
      refresh_url: `${origin}/vendor?refresh=true`,
      return_url: `${origin}/vendor/dashboard?account=${account.id}`,
      type: "account_onboarding",
    });

    return NextResponse.json({
      accountId: account.id,
      onboardingUrl: accountLink.url,
    });
  } catch (error) {
    console.error("Stripe Connect error:", error);
    return NextResponse.json(
      { error: "Failed to create vendor account" },
      { status: 500 }
    );
  }
}
