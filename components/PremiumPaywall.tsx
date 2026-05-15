"use client";

import { useState } from "react";
import type { BaZiChart } from "@/lib/bazi";

interface Props {
  chart: BaZiChart;
  /** Defaults to the name from the calculator form; user can edit it. */
  defaultName: string;
}

type Status = "idle" | "modal" | "submitting" | "error";

export default function PremiumPaywall({ chart, defaultName }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState(defaultName || "");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const gender = chart.isMale ? "male" : "female";
  const slug = chart.dayMaster.slug;

  function openModal() {
    setError(null);
    setStatus("modal");
  }

  function closeModal() {
    if (status === "submitting") return;
    setStatus("idle");
  }

  async function handlePay() {
    setError(null);
    if (!name.trim()) {
      setError("Please tell us your name — it appears on your report.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError("Please enter a valid email — we send the report there.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/premium/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          chartInput: chart.birth ? { ...chart.birth, isMale: chart.isMale } : null,
        }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(j?.error ?? `Checkout failed (HTTP ${res.status})`);
      }
      const { url } = (await res.json()) as { url: string };
      window.location.href = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start checkout.");
      setStatus("error");
    }
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-gold/40 p-6 shadow-lg sm:p-10"
      style={{
        background:
          "radial-gradient(ellipse at top, #f7ebd1 0%, #ede0bf 60%, #e2d2a3 100%)",
      }}
    >
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold">
          ✦ Premium Destiny Report ✦
        </p>
        <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
          Awaken your {chart.dayMaster.label}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          Unlock the awakened-form portrait of your Day Master, a 6-dimension
          destiny radar (Love · Career · Wealth · Health · Family · Soul), and
          a ~6,000-word personalized reading. Delivered to your email.
        </p>
      </div>

      {/* Locked-preview row: awakened portrait silhouette + radar hint */}
      <div className="mt-6 grid grid-cols-2 items-center gap-3 sm:gap-6">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-gold/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/portraits/${slug}-${gender}-awakened.jpeg`}
            alt="Awakened form preview"
            className="h-full w-full object-cover object-top blur-[6px]"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/30">
            <div className="rounded-full bg-cream/95 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-ink">
              🔒 Locked
            </div>
          </div>
        </div>
        <div className="space-y-2 text-xs leading-relaxed text-ink-soft sm:text-sm">
          <p>
            <strong className="text-ink">Awakened portrait</strong> — a unique
            high-res render of your Day Master in its ascended form
          </p>
          <p>
            <strong className="text-ink">6-dimension radar</strong> — your
            scored chart map you can share or print
          </p>
          <p>
            <strong className="text-ink">~6,000-word deep reading</strong> —
            written by AI grounded in your actual pillars
          </p>
          <p>
            <strong className="text-ink">Email + permanent link</strong> —
            yours forever, revisit anytime
          </p>
        </div>
      </div>

      <div className="mt-7 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={openModal}
          className="rounded-full bg-ink px-7 py-3 text-base font-medium text-cream shadow-md transition hover:bg-ink/90"
        >
          Unlock for $9.9 →
        </button>
        <p className="text-[11px] text-ink-soft">
          one-time payment · delivered in ~5 minutes · Stripe secure checkout
        </p>
      </div>

      {/* Modal */}
      {(status === "modal" || status === "submitting" || status === "error") && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-cream p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-2xl text-ink">Almost there</h3>
            <p className="mt-1 text-sm text-ink-soft">
              We'll email the full report when it's ready (~5 min).
            </p>

            <div className="mt-5 space-y-3">
              <label className="block">
                <span className="block text-xs font-medium uppercase tracking-widest text-ink-soft">
                  Name on report
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gold/30 bg-white px-3 py-2 text-base text-ink focus:border-gold focus:outline-none"
                  placeholder="Your name"
                  disabled={status === "submitting"}
                />
              </label>
              <label className="block">
                <span className="block text-xs font-medium uppercase tracking-widest text-ink-soft">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gold/30 bg-white px-3 py-2 text-base text-ink focus:border-gold focus:outline-none"
                  placeholder="you@example.com"
                  disabled={status === "submitting"}
                />
              </label>
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-700">{error}</p>
            )}

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={status === "submitting"}
                className="rounded-full px-4 py-2 text-sm text-ink-soft hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePay}
                disabled={status === "submitting"}
                className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-ink/90 disabled:opacity-60"
              >
                {status === "submitting" ? "Loading checkout…" : "Pay $9.9 →"}
              </button>
            </div>

            <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-ink-soft">
              Secure payment by Stripe · No subscriptions
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
