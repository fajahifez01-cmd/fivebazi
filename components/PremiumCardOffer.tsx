"use client";

import { useRef, useState } from "react";
import type { BaZiChart } from "@/lib/bazi";

interface Props {
  chart: BaZiChart;
}

type Status = "idle" | "uploaded" | "generating" | "ready" | "error";

export default function PremiumCardOffer({ chart }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const gender = chart.isMale ? "male" : "female";
  const slug = chart.dayMaster.slug;

  function handleFile(file: File) {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG / PNG).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image too large — please use one under 10 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoDataUrl(reader.result as string);
      setStatus("uploaded");
      setResultUrl(null);
    };
    reader.onerror = () => setError("Could not read that file.");
    reader.readAsDataURL(file);
  }

  async function generate() {
    if (!photoDataUrl) return;
    setStatus("generating");
    setError(null);
    setElapsed(0);

    try {
      const res = await fetch("/api/face-swap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photoDataUrl,
          daySlug: slug,
          gender,
        }),
      });

      if (!res.ok || !res.body) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(j?.error ?? `Request failed (HTTP ${res.status})`);
      }

      // Stream of NDJSON events: {type:"progress",elapsed} or {type:"done",imageUrl} or {type:"error",message}
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          let event: { type: string; elapsed?: number; imageUrl?: string; message?: string };
          try {
            event = JSON.parse(line);
          } catch {
            continue;
          }
          if (event.type === "progress" && typeof event.elapsed === "number") {
            setElapsed(event.elapsed);
          } else if (event.type === "done" && event.imageUrl) {
            setResultUrl(event.imageUrl);
            setStatus("ready");
            return;
          } else if (event.type === "error") {
            throw new Error(event.message ?? "Generation failed");
          }
        }
      }
      throw new Error("Stream ended without a result");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed.");
      setStatus("error");
    }
  }

  function reset() {
    setPhotoDataUrl(null);
    setResultUrl(null);
    setError(null);
    setStatus("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function downloadResult() {
    if (!resultUrl) return;
    const res = await fetch(resultUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}-${gender}-premium.jpeg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <section className="rounded-2xl border border-gold/30 bg-gradient-to-br from-cream to-cream/60 p-6 shadow-sm sm:p-8">
      <div className="mb-5 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
          ✦ Premium Card ✦
        </p>
        <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
          Become your Day Master
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
          Upload one selfie. AI styles you into <strong>{chart.dayMaster.label}</strong> —
          a one-of-one collectible card in <em>{chart.dayMaster.element.toLowerCase()}-element</em> regalia.
        </p>
        <p className="mt-1 text-xs text-ink-soft/80">
          $9.9 · delivered in under a minute
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        {/* Template preview — what archetype they'll become */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className="relative h-28 w-24 overflow-hidden rounded-lg border border-gold/40 bg-cream">
              {photoDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoDataUrl}
                  alt="Your selfie"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[10px] text-ink-soft">
                  your photo
                </div>
              )}
            </div>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-ink-soft">
              you
            </p>
          </div>

          <span className="text-2xl text-gold">→</span>

          <div className="flex flex-col items-center">
            <div className="relative h-28 w-24 overflow-hidden rounded-lg border border-gold/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/portraits/${slug}-${gender}.jpeg`}
                alt={`${chart.dayMaster.label} template`}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-ink-soft">
              archetype
            </p>
          </div>
        </div>

        {/* Action area — adapts to current status */}
        {status === "idle" && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream shadow-sm transition hover:bg-ink/90"
            >
              Upload your photo
            </button>
            <p className="text-xs text-ink-soft">
              Front-facing selfie works best · JPG or PNG · up to 10 MB
            </p>
          </>
        )}

        {status === "uploaded" && (
          <>
            <button
              type="button"
              onClick={generate}
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream shadow-sm transition hover:bg-ink/90"
            >
              ✦ Generate Premium Card — Free Preview ✦
            </button>
            <button
              type="button"
              onClick={reset}
              className="text-xs text-ink-soft underline-offset-2 hover:underline"
            >
              choose a different photo
            </button>
          </>
        )}

        {status === "generating" && (
          <div className="flex flex-col items-center gap-3 py-4">
            <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gold/30 border-t-gold" />
            <p className="text-sm text-ink-soft">
              AI is painting your card… {elapsed}s elapsed
            </p>
            <p className="text-xs text-ink-soft/60">
              usually takes 40-50 seconds
            </p>
          </div>
        )}

        {status === "ready" && resultUrl && (
          <>
            <div className="overflow-hidden rounded-xl border border-gold/40 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resultUrl}
                alt="Your premium destiny card"
                className="w-full max-w-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={downloadResult}
                className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-cream transition hover:bg-ink/90"
              >
                Download
              </button>
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-gold/40 bg-cream px-5 py-2 text-sm text-ink transition hover:bg-gold/10"
              >
                Try another photo
              </button>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <p className="text-sm text-red-700">{error}</p>
            <button
              type="button"
              onClick={() => setStatus(photoDataUrl ? "uploaded" : "idle")}
              className="rounded-full bg-ink px-5 py-2 text-sm text-cream"
            >
              Try again
            </button>
          </>
        )}

        {error && status !== "error" && (
          <p className="text-xs text-red-700">{error}</p>
        )}
      </div>
    </section>
  );
}
