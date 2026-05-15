import {
  DIMENSION_META,
  PREMIUM_DIMENSIONS,
  type PremiumReading,
} from "@/lib/premiumReading";
import type { BaZiChart } from "@/lib/bazi";
import PremiumRadar from "./PremiumRadar";

interface Props {
  chart: BaZiChart;
  name: string;
  reading: PremiumReading;
}

/**
 * Full premium report layout: hero tagline + radar chart + 6 deep-dive sections.
 * Designed to be the body of the $9.9 paywalled output page (or the PDF/email).
 */
export default function PremiumReport({ chart, name, reading }: Props) {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-4 py-10">
      {/* Hero */}
      <header className="space-y-4 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold">
          ✦ Premium Destiny Report ✦
        </p>
        <h1 className="font-serif text-4xl text-ink sm:text-5xl">
          For {name || "Anonymous Soul"}
        </h1>
        <p className="text-sm uppercase tracking-widest text-ink-soft">
          {chart.dayMaster.label} · Year of the {chart.zodiac}
        </p>
        <p className="mx-auto max-w-xl font-serif text-lg italic leading-relaxed text-ink">
          {reading.tagline}
        </p>
      </header>

      {/* Radar */}
      <section className="rounded-2xl border border-gold/30 bg-cream p-6 sm:p-10">
        <div className="mb-4 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Your Six Dimensions
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Scores derive from your chart's five-element balance, ten-god
            relations, and pillar positions.
          </p>
        </div>
        <div className="flex justify-center">
          <PremiumRadar
            scores={reading.scores}
            element={chart.dayMaster.element}
            size={400}
          />
        </div>

        {/* Scores table */}
        <ul className="mx-auto mt-6 grid max-w-md grid-cols-3 gap-3 text-center sm:grid-cols-6">
          {PREMIUM_DIMENSIONS.map((dim) => (
            <li key={dim}>
              <div className="text-[10px] font-medium uppercase tracking-widest text-ink-soft">
                {DIMENSION_META[dim].label}
              </div>
              <div className="font-serif text-2xl text-ink">
                {reading.scores[dim]}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Deep-dive narratives */}
      {PREMIUM_DIMENSIONS.map((dim, idx) => (
        <section key={dim} className="space-y-4">
          <div className="flex items-baseline gap-4">
            <span className="font-serif text-3xl text-gold">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="font-serif text-3xl text-ink">
                {DIMENSION_META[dim].label}
              </h2>
              <p className="text-xs uppercase tracking-widest text-ink-soft">
                Score · {reading.scores[dim]} / 100
              </p>
            </div>
          </div>
          <div className="space-y-4 font-serif text-base leading-relaxed text-ink/90 sm:text-lg">
            {reading.narratives[dim]
              .split(/\n\s*\n/)
              .map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="border-t border-gold/20 pt-6 text-center text-xs uppercase tracking-widest text-ink-soft">
        ✦ fivebazi.com · Premium Destiny Report ✦
      </footer>
    </article>
  );
}
