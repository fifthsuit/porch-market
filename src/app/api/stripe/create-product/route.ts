import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

// Create a product + price on the vendor's connected account
export async function POST(req: NextRequest) {
  try {
    const { account_id, name, description, price_cents, recurring } =
      await req.json();

    if (!account_id || !name || !price_cents) {
      return NextResponse.json(
        { error: "account_id, name, and price_cents required" },
        { status: 400 }
      );
    }

    // Create product on connected account
    const product = await getStripe().products.create(
      {
        name,
        description: description || undefined,
      },
      { stripeAccount: account_id }
    );

    // Create price — recurring for subscriptions, one_time for single sales
    const priceData: Stripe.PriceCreateParams = {
      product: product.id,
      currency: "usd",
      unit_amount: price_cents,
    };

    if (recurring) {
      priceData.recurring = {
        interval: recurring === "biweekly" ? "week" : "week",
        interval_count: recurring === "biweekly" ? 2 : 1,
      };
    }

    const price = await getStripe().prices.create(priceData, {
      stripeAccount: account_id,
    });

    return NextResponse.json({
      productId: product.id,
      priceId: price.id,
    });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
