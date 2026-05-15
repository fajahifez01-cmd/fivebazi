/**
 * Stripe webhook — confirms payment and kicks off background generation.
 *   POST /api/premium/webhook
 *
 * Configure in Stripe Dashboard:
 *   URL: https://fivebazi.com/api/premium/webhook
 *   Events: checkout.session.completed
 *   Signing secret → STRIPE_WEBHOOK_SECRET
 */

import Stripe from "stripe";
import type { NextRequest } from "next/server";
import { getOrder, updateOrder } from "@/lib/premiumOrder";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !webhookSecret) {
    return Response.json(
      { error: "Server missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET" },
      { status: 500 },
    );
  }

  const stripe = new Stripe(secret);
  const sig = req.headers.get("stripe-signature");
  if (!sig) return Response.json({ error: "Missing signature" }, { status: 400 });

  const rawBody = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    return Response.json(
      { error: `Signature verification failed: ${err instanceof Error ? err.message : err}` },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.id;

    const existing = await getOrder(orderId);
    if (!existing) {
      // Unknown order — possibly a race or a test event. ACK so Stripe stops retrying.
      return Response.json({ received: true, note: "order not found" });
    }

    // Idempotent: don't double-fire if already paid.
    if (existing.status === "pending") {
      await updateOrder(orderId, { status: "paid" });

      // Trigger the background generator (fire-and-forget; bg fn returns 202).
      const origin = new URL(req.url).origin;
      try {
        await fetch(`${origin}/.netlify/functions/premium-generate-background`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
      } catch (err) {
        await updateOrder(orderId, {
          status: "error",
          errorMessage: `Failed to trigger generation: ${err instanceof Error ? err.message : err}`,
        });
      }
    }
  }

  return Response.json({ received: true });
}
