import {
  DIMENSION_META,
  PREMIUM_DIMENSIONS,
  type PremiumDimension,
} from "@/lib/premiumReading";
import type { Element } from "@/lib/bazi";

const ELEMENT_ACCENT: Record<Element, { fill: string; stroke: string }> = {
  Wood: { fill: "rgba(94, 123, 86, 0.30)", stroke: "#5e7b56" },
  Fire: { fill: "rgba(163, 91, 86, 0.30)", stroke: "#a35b56" },
  Earth: { fill: "rgba(151, 119, 76, 0.30)", stroke: "#97774c" },
  Metal: { fill: "rgba(121, 118, 111, 0.30)", stroke: "#79766f" },
  Water: { fill: "rgba(79, 103, 122, 0.30)", stroke: "#4f677a" },
};

interface Props {
  scores: Record<PremiumDimension, number>;
  /** Day Master element — drives the fill color */
  element: Element;
  /** Rendered SVG size (px). Width === height. */
  size?: number;
}

/**
 * Pure SVG 6-axis radar chart, sized to fit anywhere and exportable as image.
 * Axes go in this order, clockwise from the top:
 *   Love · Career · Wealth · Health · Family · Soul
 */
export default function PremiumRadar({
  scores,
  element,
  size = 380,
}: Props) {
  const accent = ELEMENT_ACCENT[element];
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.36; // outer ring radius (100)
  const labelR = size * 0.44; // label distance from center

  // Pre-compute axis angles + tick rings (20/40/60/80/100)
  const axes = PREMIUM_DIMENSIONS.map((dim, i) => {
    const angle = (i / PREMIUM_DIMENSIONS.length) * Math.PI * 2 - Math.PI / 2;
    return {
      dim,
      angle,
      cos: Math.cos(angle),
      sin: Math.sin(angle),
    };
  });

  // Outer hexagon points (for max ring)
  const ringPoints = (ratio: number) =>
    axes
      .map((a) => `${cx + ratio * r * a.cos},${cy + ratio * r * a.sin}`)
      .join(" ");

  // Score polygon points
  const scorePoints = axes
    .map((a) => {
      const ratio = Math.max(0, Math.min(100, scores[a.dim])) / 100;
      return `${cx + ratio * r * a.cos},${cy + ratio * r * a.sin}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className="block"
      aria-label="Six-dimension destiny radar"
    >
      {/* Concentric tick rings */}
      {[0.2, 0.4, 0.6, 0.8, 1].map((ratio) => (
        <polygon
          key={ratio}
          points={ringPoints(ratio)}
          fill="none"
          stroke="#b89351"
          strokeWidth={ratio === 1 ? 1.2 : 0.5}
          opacity={ratio === 1 ? 0.6 : 0.25}
        />
      ))}

      {/* Axis lines from center */}
      {axes.map((a) => (
        <line
          key={a.dim}
          x1={cx}
          y1={cy}
          x2={cx + r * a.cos}
          y2={cy + r * a.sin}
          stroke="#b89351"
          strokeWidth={0.5}
          opacity={0.3}
        />
      ))}

      {/* Score polygon */}
      <polygon
        points={scorePoints}
        fill={accent.fill}
        stroke={accent.stroke}
        strokeWidth={2.2}
        strokeLinejoin="round"
      />

      {/* Vertex dots + score numbers */}
      {axes.map((a) => {
        const ratio = Math.max(0, Math.min(100, scores[a.dim])) / 100;
        const vx = cx + ratio * r * a.cos;
        const vy = cy + ratio * r * a.sin;
        return (
          <circle
            key={a.dim}
            cx={vx}
            cy={vy}
            r={3}
            fill={accent.stroke}
          />
        );
      })}

      {/* Dimension labels */}
      {axes.map((a) => {
        const lx = cx + labelR * a.cos;
        const ly = cy + labelR * a.sin;
        // Anchor based on horizontal position
        const anchor =
          Math.abs(a.cos) < 0.1
            ? "middle"
            : a.cos > 0
              ? "start"
              : "end";
        const dy =
          a.sin < -0.5 ? "-0.2em" : a.sin > 0.5 ? "0.9em" : "0.32em";

        return (
          <g key={a.dim}>
            <text
              x={lx}
              y={ly}
              textAnchor={anchor}
              dy={dy}
              className="font-serif"
              fontSize={size * 0.038}
              fill="#3a2a17"
              fontWeight={500}
            >
              {DIMENSION_META[a.dim].label}
            </text>
            <text
              x={lx}
              y={ly}
              textAnchor={anchor}
              dy={
                a.sin < -0.5
                  ? "0.95em"
                  : a.sin > 0.5
                    ? "2.05em"
                    : "1.48em"
              }
              fontSize={size * 0.034}
              fill={accent.stroke}
              fontWeight={600}
            >
              {scores[a.dim]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
