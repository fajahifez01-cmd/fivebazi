/**
 * Poll the status of a Premium Destiny Report order.
 *   GET /api/premium/status/[orderId]
 *   → public order view (no email / chartInput)
 *
 * The result page polls this every 5s while waiting for generation to finish,
 * then renders the full report once status === "done".
 */

import type { NextRequest } from "next/server";
import { getOrder, publicOrderView } from "@/lib/premiumOrder";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ orderId: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { orderId } = await params;
  if (!orderId) {
    return Response.json({ error: "Missing orderId" }, { status: 400 });
  }

  const order = await getOrder(orderId);
  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  return Response.json(publicOrderView(order));
}
