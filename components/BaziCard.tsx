"use client";

import { useState, type ReactElement } from "react";
import type { BaZiChart, Element } from "@/lib/bazi";

const ELEMENT_HEX: Record<Element, string> = {
  Wood:  "#5e7b56",
  Fire:  "#a35b56",
  Earth: "#97774c",
  Metal: "#79766f",
  Water: "#4f677a",
};

type PortraitStyle = "sage" | "symbol";

interface Props {
  chart: BaZiChart;
  name: string;
  archetype: string;
}

export default function BaziCard({ chart, name, archetype }: Props) {
  const [style, setStyle] = useState<PortraitStyle>("sage");

  const dmColor = ELEMENT_HEX[chart.dayMaster.element];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Style toggle (preview only — will be removed once user picks one) */}
      <div className="inline-flex rounded-full border border-line bg-paper p-1 text-xs">
        <button
          onClick={() => setStyle("sage")}
          className={`rounded-full px-4 py-1.5 font-medium transition ${
            style === "sage" ? "bg-ink text-cream" : "text-ink-soft"
          }`}
        >
          A · Sage portrait
        </button>
        <button
          onClick={() => setStyle("symbol")}
          className={`rounded-full px-4 py-1.5 font-medium transition ${
            style === "symbol" ? "bg-ink text-cream" : "text-ink-soft"
          }`}
        >
          B · Element symbol
        </button>
      </div>

      {/* The card */}
      <div
        id="bazi-card"
        className="relative w-full max-w-[380px] overflow-hidden rounded-[28px]"
        style={{
          aspectRatio: "5 / 8.2",
          background:
            "radial-gradient(ellipse at top, #f7ebd1 0%, #ede0bf 50%, #e2d2a3 100%)",
          boxShadow:
            "0 30px 60px -20px rgba(45, 30, 15, 0.4), 0 0 0 1px rgba(120, 90, 50, 0.15) inset",
        }}
      >
        {/* Parchment texture overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(120, 80, 30, 0.06) 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(80, 50, 20, 0.06) 0%, transparent 40%),
              radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.03) 0%, transparent 60%)
            `,
          }}
        />

        {/* Ornate border SVG (4 corners + edges) */}
        <CardBorder accent={dmColor} />

        {/* Inner content */}
        <div className="relative z-10 flex h-full flex-col">
          {/* Top banner */}
          <div className="px-6 pt-6 text-center">
            <TopBanner />
            <p
              className="mt-3 font-serif text-[10px] uppercase tracking-[0.4em]"
              style={{ color: "#7a5a2f" }}
            >
              FIVE · BAZI
            </p>
          </div>

          {/* Portrait */}
          <div className="flex items-center justify-center px-8 pt-1 pb-2">
            <div
              className="relative flex aspect-square w-full max-w-[170px] items-center justify-center rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,245,220,0.7) 0%, rgba(220,195,140,0) 70%)",
              }}
            >
              {style === "sage" ? (
                <SagePortrait element={chart.dayMaster.element} />
              ) : (
                <SymbolPortrait element={chart.dayMaster.element} />
              )}
            </div>
          </div>

          {/* Name */}
          <div className="px-6 text-center">
            <p
              className="font-serif text-2xl font-medium leading-tight"
              style={{ color: "#3a2a17" }}
            >
              {name || "Anonymous Soul"}
            </p>
          </div>

          {/* Stats panel */}
          <div
            className="mx-6 mt-3 rounded-xl px-3 py-2.5"
            style={{
              background: "rgba(120, 85, 35, 0.08)",
              border: "1px solid rgba(120, 85, 35, 0.18)",
            }}
          >
            <div className="grid grid-cols-4 gap-1 text-center">
              {[
                { label: "Year",  data: chart.year },
                { label: "Month", data: chart.month },
                { label: "Day",   data: chart.day },
                { label: "Hour",  data: chart.hour },
              ].map(({ label, data }) => (
                <div key={label}>
                  <div
                    className="text-[8px] font-medium uppercase tracking-widest"
                    style={{ color: "#8a6b3a" }}
                  >
                    {label}
                  </div>
                  <div
                    className="font-serif text-xl leading-none"
                    style={{ color: "#3a2a17" }}
                  >
                    {data.stem}
                    {data.branch}
                  </div>
                  <div className="text-[8px]" style={{ color: "#7a5a2f" }}>
                    {data.stemPinyin.slice(0, 3)}·{data.branchPinyin.slice(0, 3)}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-2 border-t pt-2 text-center text-[10px] leading-snug"
              style={{
                borderColor: "rgba(120, 85, 35, 0.15)",
                color: "#5a4220",
              }}
            >
              {elementSummary(chart)}
            </div>
          </div>

          {/* Bottom banner — archetype */}
          <div className="mt-auto px-6 pb-5 pt-3 text-center">
            <div
              className="mx-auto inline-block rounded-full px-5 py-1.5"
              style={{
                background: `linear-gradient(135deg, ${dmColor} 0%, ${darken(
                  dmColor,
                )} 100%)`,
                boxShadow: "0 2px 8px rgba(60, 40, 15, 0.2)",
              }}
            >
              <p className="font-serif text-sm font-medium tracking-wide text-cream">
                {chart.dayMaster.label}
              </p>
            </div>
            <p
              className="mt-2 font-serif text-base italic"
              style={{ color: "#5a4220" }}
            >
              {archetype}
            </p>
            <p
              className="mt-1 text-[10px]"
              style={{ color: "#8a6b3a" }}
            >
              Year of the {chart.zodiac} · {chart.isMale ? "Yang" : "Yin"} chart
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Decorative pieces ───── */

function TopBanner() {
  return (
    <svg viewBox="0 0 200 36" className="mx-auto h-7 w-auto" aria-hidden>
      <defs>
        <linearGradient id="cloudGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b89351" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#7a5a2f" stopOpacity="1" />
          <stop offset="100%" stopColor="#b89351" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Cloud / wave motif */}
      <path
        d="M 10 22 Q 25 8, 40 18 T 70 18 T 100 18 T 130 18 T 160 18 T 190 18"
        fill="none"
        stroke="url(#cloudGrad)"
        strokeWidth="1.4"
      />
      <path
        d="M 20 28 Q 35 16, 50 24 T 80 24 T 110 24 T 140 24 T 170 24 T 195 24"
        fill="none"
        stroke="url(#cloudGrad)"
        strokeWidth="1"
        opacity="0.7"
      />
      <circle cx="100" cy="22" r="3" fill="#7a5a2f" />
    </svg>
  );
}

function CardBorder({ accent }: { accent: string }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 400 656"
      preserveAspectRatio="none"
      aria-hidden
    >
      {/* Outer frame */}
      <rect
        x="10"
        y="10"
        width="380"
        height="636"
        rx="22"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.7"
      />
      <rect
        x="14"
        y="14"
        width="372"
        height="628"
        rx="20"
        fill="none"
        stroke="#b89351"
        strokeWidth="0.5"
        opacity="0.5"
      />
      {/* Inner frame */}
      <rect
        x="22"
        y="22"
        width="356"
        height="612"
        rx="16"
        fill="none"
        stroke="#7a5a2f"
        strokeWidth="0.8"
        opacity="0.4"
      />

      {/* Corner flourishes */}
      {[
        { x: 22, y: 22, r: 0 },
        { x: 378, y: 22, r: 90 },
        { x: 378, y: 634, r: 180 },
        { x: 22, y: 634, r: 270 },
      ].map(({ x, y, r }, i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path
            d="M 0 0 L 28 0 M 0 0 L 0 28 M 4 4 Q 14 4, 14 14 Q 4 14, 4 4 Z"
            fill={accent}
            stroke={accent}
            strokeWidth="0.6"
            opacity="0.85"
          />
          <circle cx="20" cy="20" r="1.8" fill={accent} opacity="0.8" />
        </g>
      ))}
    </svg>
  );
}

/* ───── Portrait variant A: Sage ───── */

function SagePortrait({ element }: { element: Element }) {
  const color = ELEMENT_HEX[element];
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="halo" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="80" r="70" fill="url(#halo)" />

      {/* Hat */}
      <path
        d="M 65 55 Q 100 30, 135 55 L 138 62 L 62 62 Z"
        fill="#2d2a17"
        opacity="0.9"
      />
      <ellipse cx="100" cy="62" rx="42" ry="4" fill="#1a1810" />

      {/* Head */}
      <ellipse cx="100" cy="90" rx="28" ry="34" fill="#e8d4b0" opacity="0.95" />
      {/* Hair side */}
      <path
        d="M 72 80 Q 70 100, 76 116 L 72 120 Q 68 100, 72 80 Z M 128 80 Q 130 100, 124 116 L 128 120 Q 132 100, 128 80 Z"
        fill="#2d2a17"
        opacity="0.85"
      />

      {/* Eyebrows */}
      <path d="M 84 85 Q 90 82, 95 86" stroke="#2d2a17" strokeWidth="2" fill="none" />
      <path d="M 105 86 Q 110 82, 116 85" stroke="#2d2a17" strokeWidth="2" fill="none" />
      {/* Eyes */}
      <ellipse cx="89" cy="92" rx="2" ry="1.2" fill="#2d2a17" />
      <ellipse cx="111" cy="92" rx="2" ry="1.2" fill="#2d2a17" />
      {/* Nose */}
      <path d="M 100 95 L 98 105 L 100 107 L 102 105 Z" fill="#c9a878" opacity="0.5" />
      {/* Mouth */}
      <path
        d="M 92 113 Q 100 116, 108 113"
        stroke="#7a4a30"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Beard */}
      <path
        d="M 88 118 Q 100 145, 112 118 Q 108 135, 100 142 Q 92 135, 88 118 Z"
        fill="#2d2a17"
        opacity="0.85"
      />

      {/* Robe shoulders */}
      <path
        d="M 50 165 Q 80 145, 100 148 Q 120 145, 150 165 L 155 200 L 45 200 Z"
        fill={color}
        opacity="0.85"
      />
      {/* Collar */}
      <path
        d="M 90 148 L 100 165 L 110 148 Z"
        fill="#f7ebd1"
        opacity="0.95"
      />
      <path
        d="M 90 148 L 100 165"
        stroke="#2d2a17"
        strokeWidth="1"
        opacity="0.7"
      />
      <path
        d="M 110 148 L 100 165"
        stroke="#2d2a17"
        strokeWidth="1"
        opacity="0.7"
      />
    </svg>
  );
}

/* ───── Portrait variant B: Element Symbol ───── */

function SymbolPortrait({ element }: { element: Element }) {
  const color = ELEMENT_HEX[element];

  const symbols: Record<Element, ReactElement> = {
    Wood: (
      <g stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none">
        <line x1="100" y1="50" x2="100" y2="170" />
        <path d="M 100 70 Q 70 80, 60 100" />
        <path d="M 100 70 Q 130 80, 140 100" />
        <path d="M 100 100 Q 65 110, 50 135" />
        <path d="M 100 100 Q 135 110, 150 135" />
        <path d="M 100 130 Q 75 140, 65 165" />
        <path d="M 100 130 Q 125 140, 135 165" />
        <circle cx="100" cy="48" r="6" fill={color} stroke="none" />
      </g>
    ),
    Fire: (
      <g fill={color} stroke={color} strokeLinejoin="round" strokeWidth="2">
        <path d="M 100 40 Q 75 80, 80 120 Q 75 145, 90 165 Q 100 170, 110 165 Q 125 145, 120 120 Q 125 80, 100 40 Z" />
        <path
          d="M 100 80 Q 88 100, 92 125 Q 95 145, 105 145 Q 115 145, 108 125 Q 112 100, 100 80 Z"
          fill="#f7ebd1"
          opacity="0.6"
        />
      </g>
    ),
    Earth: (
      <g stroke={color} strokeWidth="3.5" fill={color}>
        <path
          d="M 30 170 L 70 110 L 100 130 L 140 75 L 175 170 Z"
          fill={color}
          opacity="0.85"
        />
        <path
          d="M 50 170 L 80 130 L 105 150 L 130 110"
          stroke="#f7ebd1"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        <circle cx="135" cy="65" r="4" fill={color} />
      </g>
    ),
    Metal: (
      <g stroke={color} strokeLinecap="round" fill={color}>
        {/* Sword */}
        <line x1="100" y1="40" x2="100" y2="150" stroke={color} strokeWidth="4" />
        <line x1="80" y1="150" x2="120" y2="150" stroke={color} strokeWidth="6" />
        <rect x="96" y="150" width="8" height="20" fill={color} />
        <circle cx="100" cy="173" r="5" fill={color} />
        {/* Highlight */}
        <line
          x1="100"
          y1="50"
          x2="100"
          y2="145"
          stroke="#f7ebd1"
          strokeWidth="1.2"
          opacity="0.7"
        />
      </g>
    ),
    Water: (
      <g stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none">
        <path d="M 30 90 Q 65 70, 100 90 T 170 90" />
        <path d="M 30 115 Q 65 95, 100 115 T 170 115" opacity="0.85" />
        <path d="M 30 140 Q 65 120, 100 140 T 170 140" opacity="0.7" />
        <path d="M 30 165 Q 65 145, 100 165 T 170 165" opacity="0.55" />
        <circle cx="100" cy="55" r="6" fill={color} stroke="none" />
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="symHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="85" fill="url(#symHalo)" />
      {symbols[element]}
    </svg>
  );
}

/* ───── Helpers ───── */

function elementSummary(chart: BaZiChart): string {
  const ranked = chart.elementsRanked;
  const top = ranked[0];
  const bottom = ranked[ranked.length - 1];
  if (!top || !bottom) return "";
  const strongStr = ranked
    .filter((r) => r.count >= 3)
    .map((r) => r.element)
    .join(" · ");
  const weakStr = ranked
    .filter((r) => r.count <= 1)
    .map((r) => r.element)
    .join(" · ");
  if (strongStr && weakStr) {
    return `${strongStr} strong  ·  ${weakStr} weak`;
  }
  return `${top.element} dominant · balance with ${bottom.element}`;
}

function darken(hex: string): string {
  // Cheap darken by 18%.
  const m = hex.match(/^#([0-9a-f]{6})$/i);
  if (!m) return hex;
  const n = parseInt(m[1]!, 16);
  const r = Math.max(0, ((n >> 16) & 0xff) - 35);
  const g = Math.max(0, ((n >> 8) & 0xff) - 35);
  const b = Math.max(0, (n & 0xff) - 35);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
