import type { CSSProperties } from "react";

interface LogoProps {
  size?: number;
  variant?: "mark" | "horizontal";
  tone?: "ink" | "cream" | "gold";
  className?: string;
  style?: CSSProperties;
}

/**
 * FiveBaZi logo — bagua + yin-yang mark, with optional wordmark.
 * Vector, scales cleanly, no raster assets needed.
 */
export default function Logo({
  size = 48,
  variant = "mark",
  tone = "ink",
  className,
  style,
}: LogoProps) {
  const color =
    tone === "cream" ? "#faf6ee" : tone === "gold" ? "#b8995a" : "#2d2a26";

  if (variant === "horizontal") {
    return (
      <div
        className={className}
        style={{ display: "inline-flex", alignItems: "center", gap: 12, ...style }}
      >
        <Mark size={size} color={color} />
        <span
          className="font-serif"
          style={{
            fontSize: size * 0.62,
            letterSpacing: "0.02em",
            color,
            fontWeight: 500,
            lineHeight: 1,
          }}
        >
          Five<span style={{ color: "#b8995a", margin: "0 0.04em" }}>·</span>BaZi
        </span>
      </div>
    );
  }

  return <Mark size={size} color={color} className={className} style={style} />;
}

function Mark({
  size,
  color,
  className,
  style,
}: {
  size: number;
  color: string;
  className?: string;
  style?: CSSProperties;
}) {
  // Bagua: 8 trigrams as decorative dashes around the yin-yang
  // Each trigram is 3 lines; we render them simplified as 3 short bars in a wedge.
  // Lines stand for yang (solid), broken stand for yin (split).
  const trigrams: Array<[number, number, number]> = [
    [1, 1, 1], //  N  Heaven ☰
    [1, 0, 1], // NE Fire   ☲
    [0, 1, 0], //  E Water  ☵
    [1, 1, 0], // SE Lake   ☱
    [0, 0, 0], //  S Earth  ☷
    [0, 1, 1], // SW Wind   ☴
    [1, 0, 0], //  W Thunder☳
    [0, 0, 1], // NW Mountain☶
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label="FiveBaZi"
      className={className}
      style={style}
    >
      {/* Outer ring */}
      <circle
        cx="50"
        cy="50"
        r="46"
        stroke={color}
        strokeWidth="0.8"
        opacity="0.4"
      />

      {/* 8 trigrams around the ring */}
      {trigrams.map(([a, b, c], i) => {
        const angle = (i * 360) / 8 - 90;
        const rad = (angle * Math.PI) / 180;
        const r = 40;
        const cx = 50 + r * Math.cos(rad);
        const cy = 50 + r * Math.sin(rad);
        return (
          <g
            key={i}
            transform={`translate(${cx} ${cy}) rotate(${angle + 90})`}
          >
            {[a, b, c].map((bar, j) =>
              bar === 1 ? (
                <rect
                  key={j}
                  x={-7}
                  y={-6 + j * 4}
                  width={14}
                  height={1.6}
                  fill={color}
                />
              ) : (
                <g key={j}>
                  <rect x={-7} y={-6 + j * 4} width={5.5} height={1.6} fill={color} />
                  <rect x={1.5} y={-6 + j * 4} width={5.5} height={1.6} fill={color} />
                </g>
              ),
            )}
          </g>
        );
      })}

      {/* Yin-yang core */}
      <g transform="translate(50 50)">
        <circle r="18" fill="none" stroke={color} strokeWidth="1.2" />
        {/* S-curve fill: left half */}
        <path
          d="M 0,-18 A 18,18 0 0 1 0,18 A 9,9 0 0 1 0,0 A 9,9 0 0 0 0,-18 Z"
          fill={color}
        />
        {/* Small dots */}
        <circle cx="0" cy="-9" r="2.6" fill={color === "#faf6ee" ? "#2d2a26" : "#faf6ee"} />
        <circle cx="0" cy="9" r="2.6" fill={color} />
      </g>
    </svg>
  );
}
