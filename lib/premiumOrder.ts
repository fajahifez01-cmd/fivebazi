/**
 * Order types + Netlify Blobs persistence for the $9.9 Premium Destiny Report.
 *
 * Lifecycle:
 *   pending  → Stripe Checkout session created, user is on hosted page
 *   paid     → Stripe webhook confirmed payment; background gen kicked off
 *   generating → background fn running (Claude + portrait fetch + email)
 *   done     → reading saved, portrait ready, email sent
 *   error    → something failed; manual refund follow-up
 */

import { getStore } from "@netlify/blobs";
import type { BaZiChart } from "./bazi";
import type { PremiumReading } from "./premiumReading";

export type OrderStatus =
  | "pending"
  | "paid"
  | "generating"
  | "done"
  | "error";

export interface ChartInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  isMale: boolean;
}

export interface PremiumOrder {
  orderId: string; // doubles as Stripe Checkout Session ID
  email: string;
  name: string;
  chartInput: ChartInput;
  /** Resolved at order creation so we know which portrait to show */
  daySlug: string;
  gender: "male" | "female";
  status: OrderStatus;
  reading?: PremiumReading;
  /** Path to awakened portrait relative to origin */
  awakenedPortraitPath?: string;
  errorMessage?: string;
  emailSent?: boolean;
  createdAt: number;
  updatedAt: number;
}

const STORE_NAME = "premium-orders";

export function getOrderStore() {
  return getStore(STORE_NAME);
}

export async function saveOrder(order: PremiumOrder): Promise<void> {
  const store = getOrderStore();
  await store.setJSON(order.orderId, {
    ...order,
    updatedAt: Date.now(),
  } satisfies PremiumOrder);
}

export async function getOrder(orderId: string): Promise<PremiumOrder | null> {
  const store = getOrderStore();
  return (await store.get(orderId, { type: "json" })) as PremiumOrder | null;
}

export async function updateOrder(
  orderId: string,
  patch: Partial<PremiumOrder>,
): Promise<PremiumOrder | null> {
  const existing = await getOrder(orderId);
  if (!existing) return null;
  const merged: PremiumOrder = {
    ...existing,
    ...patch,
    updatedAt: Date.now(),
  };
  await saveOrder(merged);
  return merged;
}

/** Strip secrets before sending the order back to the client. */
export function publicOrderView(order: PremiumOrder) {
  return {
    orderId: order.orderId,
    name: order.name,
    status: order.status,
    daySlug: order.daySlug,
    gender: order.gender,
    reading: order.reading,
    awakenedPortraitPath: order.awakenedPortraitPath,
    errorMessage: order.errorMessage,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    // intentionally not exposing email or chartInput
  };
}

export function chartInputFromOrder(order: PremiumOrder): ChartInput {
  return order.chartInput;
}

export function dayMasterSlugForOrder(chart: BaZiChart): string {
  return chart.dayMaster.slug;
}
