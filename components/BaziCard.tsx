import type { BaZiChart, Element } from "@/lib/bazi";

const ELEMENT_HEX: Record<Element, string> = {
  Wood:  "#5e7b56",
  Fire:  "#a35b56",
  Earth: "#97774c",
  Metal: "#79766f",
  Water: "#4f677a",
};

interface Props {
  chart: BaZiChart;
  name: string;
  archetype: string;
}

export default function BaziCard({ chart, name, archetype }: Props) {
  const dmColor = ELEMENT_HEX[chart.dayMaster.element];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* The card */}
      <div
        id="bazi-card"
        className="relative w-full max-w-[380px] overflow-hidden rounded-[28px]"
        style={{
          aspectRatio: "5 / 8.8",
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

          {/* Portrait — uses generated AI illustration when available, falls back to SVG */}
          <div className="px-6 pt-1 pb-2">
            <div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{
                aspectRatio: "1 / 1",
                boxShadow:
                  "0 4px 20px -8px rgba(60, 40, 15, 0.3), 0 0 0 1px rgba(184, 147, 81, 0.4) inset",
              }}
            >
              <img
                src={`/portraits/${chart.dayMaster.slug}.jpeg`}
                alt={`${chart.dayMaster.label} archetype illustration`}
                className="h-full w-full object-cover"
              />
              {/* Subtle vignette */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 60%, rgba(60, 40, 15, 0.18) 100%)",
                }}
              />
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
      viewBox="0 0 400 704"
      preserveAspectRatio="none"
      aria-hidden
    >
      {/* Outer frame */}
      <rect
        x="10"
        y="10"
        width="380"
        height="684"
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
        height="676"
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
        height="660"
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
        { x: 378, y: 682, r: 180 },
        { x: 22, y: 682, r: 270 },
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
