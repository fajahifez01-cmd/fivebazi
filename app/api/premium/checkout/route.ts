/**
 * Create a Stripe Checkout session for the $9.9 Premium Destiny Report.
 *   POST /api/premium/checkout
 *   body: { name, email, chartInput: {year, month, day, hour, minute, isMale} }
 *   → { url: <stripe-checkout-url>, orderId: <stripe-session-id> }
 *
 * Stripe webhook (/api/premium/webhook) flips status pending → paid and
 * fires the background generation.
 */

import Stripe from "stripe";
import type { NextRequest } from "next/server";
import { calculateBaZi } from "@/lib/bazi";
import {
  saveOrder,
  type ChartInput,
  type PremiumOrder,
} from "@/lib/premiumOrder";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface RequestBody {
  name: string;
  email: string;
  chartInput: ChartInput;
}

const PRICE_CENTS = 990; // $9.90

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return Response.json({ error: "Server missing STRIPE_SECRET_KEY" }, { status: 500 });
  }
  const stripe = new Stripe(secret);

  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { name, email, chartInput } = body;
  if (!name?.trim() || !email?.trim() || !chartInput) {
    return Response.json(
      { error: "Missing name, email, or chartInput" },
      { status: 400 },
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  // Resolve the chart server-side so we know which portrait & slug applies.
  const chart = calculateBaZi(chartInput);
  const gender = chartInput.isMale ? "male" : "female";

  const origin = req.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: PRICE_CENTS,
          product_data: {
            name: "FiveBaZi Premium Destiny Report",
            description: `Personalized for ${name.trim()} · ${chart.dayMaster.label} · 6-dimension reading, awakened portrait, PDF emailed`,
          },
        },
      },
    ],
    success_url: `${origin}/premium-report/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/?premium=cancel`,
    metadata: {
      product: "premium-destiny-report",
      daySlug: chart.dayMaster.slug,
      gender,
    },
  });

  if (!session.id || !session.url) {
    return Response.json({ error: "Stripe session creation failed" }, { status: 502 });
  }

  // Persist a pending order keyed by the Stripe Session ID.
  const order: PremiumOrder = {
    orderId: session.id,
    email: email.trim().toLowerCase(),
    name: name.trim(),
    chartInput,
    daySlug: chart.dayMaster.slug,
    gender,
    status: "pending",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  await saveOrder(order);

  return Response.json({ url: session.url, orderId: session.id });
}
