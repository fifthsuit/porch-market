import { NextRequest, NextResponse } from "next/server";
import { getStripe, PLATFORM_FEE_PERCENT } from "@/lib/stripe";

// Create a checkout session — handles both subscriptions and one-time purchases
export async function POST(req: NextRequest) {
  try {
    const { price_id, account_id, mode } = await req.json();

    if (!price_id || !account_id) {
      return NextResponse.json(
        { error: "price_id and account_id required" },
        { status: 400 }
      );
    }

    const origin =
      req.headers.get("origin") || "https://porch-market.vercel.app";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionParams: any = {
      mode: mode === "subscription" ? "subscription" : "payment",
      line_items: [{ price: price_id, quantity: 1 }],
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/order/cancelled`,
      payment_intent_data:
        mode !== "subscription"
          ? {
              application_fee_amount: 0, // Calculated below
              transfer_data: { destination: account_id },
            }
          : undefined,
      subscription_data:
        mode === "subscription"
          ? {
              application_fee_percent: PLATFORM_FEE_PERCENT,
              transfer_data: { destination: account_id },
            }
          : undefined,
    };

    const session = await getStripe().checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
