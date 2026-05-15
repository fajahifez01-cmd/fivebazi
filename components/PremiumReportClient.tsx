"use client";

import { useEffect, useRef, useState } from "react";
import { calculateBaZi, type BaZiChart } from "@/lib/bazi";
import PremiumReport from "./PremiumReport";
import type { PremiumReading } from "@/lib/premiumReading";

type OrderStatus = "pending" | "paid" | "generating" | "done" | "error";

interface OrderView {
  orderId: string;
  name: string;
  status: OrderStatus;
  daySlug: string;
  gender: "male" | "female";
  reading?: PremiumReading;
  awakenedPortraitPath?: string;
  errorMessage?: string;
  createdAt: number;
  updatedAt: number;
}

interface Props {
  orderId: string;
}

/**
 * Polls /api/premium/status/[orderId]. Shows a loader while pending/paid/
 * generating, renders the full PremiumReport when done.
 *
 * Note: chart is recomputed client-side from the persisted chartInput, which
 * the API intentionally does NOT echo back. To keep the chart visible to the
 * report renderer we re-derive it from the slug+gender (sufficient for
 * portrait + label). For pillars / element balance we don't strictly need
 * the original birth — the reading itself carries the narrative. The Day
 * Master label drives the layout.
 */
export default function PremiumReportClient({ orderId }: Props) {
  const [order, setOrder] = useState<OrderView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const stopped = useRef(false);

  useEffect(() => {
    stopped.current = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    async function poll() {
      if (stopped.current) return;
      try {
        const res = await fetch(`/api/premium/status/${orderId}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          const j = (await res.json().catch(() => null)) as { error?: string } | null;
          throw new Error(j?.error ?? `HTTP ${res.status}`);
        }
        const data = (await res.json()) as OrderView;
        setOrder(data);
        if (data.status === "done" || data.status === "error") return;
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load order");
        return;
      }
      timer = setTimeout(poll, 5000);
    }

    poll();
    return () => {
      stopped.current = true;
      if (timer) clearTimeout(timer);
    };
  }, [orderId]);

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="font-serif text-2xl text-ink">Something went sideways</p>
        <p className="mt-3 text-sm text-ink-soft">{error}</p>
      </div>
    );
  }

  if (!order) {
    return <LoadingState elapsed={0} />;
  }

  if (order.status === "error") {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="font-serif text-2xl text-ink">Generation failed</p>
        <p className="mt-3 text-sm text-ink-soft">
          {order.errorMessage ?? "Something went wrong — please contact support."}
        </p>
        <p className="mt-2 text-xs text-ink-soft">
          Order: {order.orderId}
        </p>
      </div>
    );
  }

  if (order.status !== "done" || !order.reading) {
    const elapsed = Math.round((Date.now() - order.createdAt) / 1000);
    return <LoadingState elapsed={elapsed} status={order.status} />;
  }

  // Done — render full report. Reconstruct a minimal chart for layout.
  const chart = chartFromOrder(order);
  return (
    <PremiumReport
      chart={chart}
      name={order.name}
      reading={order.reading}
      awakenedPortraitPath={order.awakenedPortraitPath}
    />
  );
}

function LoadingState({
  elapsed,
  status,
}: {
  elapsed: number;
  status?: OrderStatus;
}) {
  const label =
    status === "pending"
      ? "Confirming payment"
      : status === "paid"
        ? "Starting generation"
        : status === "generating"
          ? "Painting your awakened form…"
          : "Loading";

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold">
        ✦ Premium Destiny Report ✦
      </p>
      <span className="mt-8 inline-block h-12 w-12 animate-spin rounded-full border-4 border-gold/30 border-t-gold" />
      <p className="mt-6 font-serif text-2xl text-ink">{label}</p>
      <p className="mt-2 text-sm text-ink-soft">
        Your reading is being written and your awakened portrait is being prepared.
        Usually takes 3-5 minutes.
      </p>
      <p className="mt-4 text-xs text-ink-soft">
        {elapsed}s elapsed · you can safely close this tab — we'll email when ready.
      </p>
    </div>
  );
}

/**
 * The status endpoint hides chartInput, so we reconstruct enough of a chart
 * to satisfy the PremiumReport layout. Day-master slug + element + label are
 * the only chart bits that affect rendering once the reading is in hand.
 */
function chartFromOrder(order: OrderView): BaZiChart {
  // We don't have the original birth on the client, so synth a minimal chart
  // by reverse-lookup of the slug. The reading + awakened portrait carry the
  // real signal; PremiumReport only reads chart.dayMaster + chart.zodiac.
  const dummyChart = calculateBaZi({
    year: 1970,
    month: 1,
    day: 1,
    hour: 12,
    minute: 0,
    isMale: order.gender === "male",
  });
  // Override the bits PremiumReport actually displays in its header / radar accent.
  return {
    ...dummyChart,
    dayMaster: {
      ...dummyChart.dayMaster,
      slug: order.daySlug as typeof dummyChart.dayMaster.slug,
      label: slugToLabel(order.daySlug),
      element: slugToElement(order.daySlug),
    },
  };
}

const SLUG_TO_LABEL: Record<string, string> = {
  "yang-wood-jia": "Yang Wood Jiǎ",
  "yin-wood-yi": "Yin Wood Yǐ",
  "yang-fire-bing": "Yang Fire Bǐng",
  "yin-fire-ding": "Yin Fire Dīng",
  "yang-earth-wu": "Yang Earth Wù",
  "yin-earth-ji": "Yin Earth Jǐ",
  "yang-metal-geng": "Yang Metal Gēng",
  "yin-metal-xin": "Yin Metal Xīn",
  "yang-water-ren": "Yang Water Rén",
  "yin-water-gui": "Yin Water Guǐ",
};

function slugToLabel(slug: string): string {
  return SLUG_TO_LABEL[slug] ?? slug;
}

function slugToElement(
  slug: string,
): "Wood" | "Fire" | "Earth" | "Metal" | "Water" {
  if (slug.includes("wood")) return "Wood";
  if (slug.includes("fire")) return "Fire";
  if (slug.includes("earth")) return "Earth";
  if (slug.includes("metal")) return "Metal";
  return "Water";
}
