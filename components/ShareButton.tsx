"use client";

import { useState } from "react";
import html2canvas from "html2canvas";

interface Props {
  /** id of the element to capture */
  cardId: string;
  /** filename (without extension) for downloads + share */
  filename: string;
}

export default function ShareButton({ cardId, filename }: Props) {
  const [busy, setBusy] = useState(false);

  async function handle() {
    const el = document.getElementById(cardId);
    if (!el) return;

    setBusy(true);
    try {
      // Wait for webfonts & images so the snapshot matches what the user sees.
      await document.fonts.ready;
      await Promise.all(
        Array.from(el.querySelectorAll("img")).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise<void>((res) => {
            img.addEventListener("load", () => res(), { once: true });
            img.addEventListener("error", () => res(), { once: true });
          });
        }),
      );

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
        // html2canvas sometimes mis-renders aspect-ratio CSS; pin the actual rendered size.
        width: el.offsetWidth,
        height: el.offsetHeight,
      });

      const blob = await new Promise<Blob | null>((res) =>
        canvas.toBlob((b) => res(b), "image/png", 0.95),
      );
      if (!blob) throw new Error("Failed to create image blob");

      const file = new File([blob], `${filename}.png`, { type: "image/png" });

      // Mobile + Safari with file sharing: native share sheet (IG / WeChat / FB / save).
      const nav = navigator as Navigator & {
        canShare?: (data: ShareData) => boolean;
      };
      if (nav.canShare && nav.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My BaZi Destiny Card",
          text: "Discover your Four Pillars of Destiny at fivebazi.com",
        });
      } else {
        // Desktop fallback: download to disk.
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      // User-cancelled share — silent. Other errors surface to console.
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("share failed", err);
        alert("Could not export the card — please take a screenshot instead.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={busy}
      className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-cream px-5 py-2 text-sm font-medium text-ink shadow-sm transition hover:bg-gold/10 hover:shadow disabled:cursor-wait disabled:opacity-60"
    >
      {busy ? (
        <>
          <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          Preparing card…
        </>
      ) : (
        <>✦ Save &amp; Share Card ✦</>
      )}
    </button>
  );
}
