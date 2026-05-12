"use client";

import { useState, useTransition } from "react";
import { calculateBaZi, type BaZiChart, type Element } from "@/lib/bazi";
import { generateReading } from "@/lib/reading";

const ELEMENT_THEME: Record<Element, { bg: string; fg: string; bar: string }> = {
  Wood:  { bg: "bg-wood-bg",  fg: "text-wood",  bar: "bg-wood" },
  Fire:  { bg: "bg-fire-bg",  fg: "text-fire",  bar: "bg-fire" },
  Earth: { bg: "bg-earth-bg", fg: "text-earth", bar: "bg-earth" },
  Metal: { bg: "bg-metal-bg", fg: "text-metal", bar: "bg-metal" },
  Water: { bg: "bg-water-bg", fg: "text-water", bar: "bg-water" },
};

function range(start: number, end: number): number[] {
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

export default function Calculator() {
  const now = new Date();
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(5);
  const [day, setDay] = useState(15);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [isMale, setIsMale] = useState(true);
  const [chart, setChart] = useState<BaZiChart | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      setChart(calculateBaZi({ year, month, day, hour, minute, isMale }));
      setTimeout(() => {
        document.getElementById("result")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    });
  };

  return (
    <div className="w-full">
      <form
        onSubmit={onSubmit}
        className="rounded-3xl border border-line bg-paper p-6 shadow-[0_2px_30px_rgba(45,42,38,0.04)] sm:p-9"
      >
        <div className="grid gap-5 sm:grid-cols-3">
          <SelectField label="Year"   value={year}   onChange={setYear}   options={range(1920, now.getFullYear())} />
          <SelectField label="Month"  value={month}  onChange={setMonth}  options={range(1, 12)} />
          <SelectField label="Day"    value={day}    onChange={setDay}    options={range(1, 31)} />
          <SelectField label="Hour"   value={hour}   onChange={setHour}   options={range(0, 23)} formatter={(v) => v.toString().padStart(2, "0")} />
          <SelectField label="Minute" value={minute} onChange={setMinute} options={range(0, 59)} formatter={(v) => v.toString().padStart(2, "0")} />
          <fieldset>
            <legend className="block text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
              Gender
            </legend>
            <div className="mt-1.5 flex gap-2">
              <button
                type="button"
                onClick={() => setIsMale(true)}
                aria-pressed={isMale}
                className={`flex-1 rounded-xl border px-3 py-2.5 text-sm transition ${
                  isMale
                    ? "border-teal bg-teal text-cream"
                    : "border-line bg-paper text-ink-soft hover:border-ink-soft"
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setIsMale(false)}
                aria-pressed={!isMale}
                className={`flex-1 rounded-xl border px-3 py-2.5 text-sm transition ${
                  !isMale
                    ? "border-teal bg-teal text-cream"
                    : "border-line bg-paper text-ink-soft hover:border-ink-soft"
                }`}
              >
                Female
              </button>
            </div>
          </fieldset>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-7 w-full rounded-xl bg-teal px-6 py-4 font-serif text-lg text-cream shadow-[0_8px_30px_rgba(31,65,70,0.18)] transition hover:bg-teal-soft disabled:opacity-60"
        >
          {pending ? "Reading the heavens…" : "Generate My BaZi Chart"}
        </button>
        <p className="mt-3 text-center text-xs text-ink-soft">
          ✦ 100% free · No sign-up · Calculation runs locally in your browser ✦
        </p>
      </form>

      {chart && <Result chart={chart} />}
    </div>
  );
}

function SelectField<T extends number>({
  label, value, onChange, options, formatter,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: T[];
  formatter?: (v: T) => string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value) as T)}
        className="mt-1.5 w-full rounded-xl border border-line bg-paper px-3.5 py-2.5 font-serif text-base text-ink shadow-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {formatter ? formatter(o) : o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Result({ chart }: { chart: BaZiChart }) {
  const reading = generateReading(chart);
  const pillars: Array<{ label: string; data: typeof chart.year }> = [
    { label: "Year",  data: chart.year },
    { label: "Month", data: chart.month },
    { label: "Day",   data: chart.day },
    { label: "Hour",  data: chart.hour },
  ];

  return (
    <section id="result" className="mt-12 space-y-10">
      {/* Day Master headline */}
      <div className="overflow-hidden rounded-3xl border border-line bg-paper">
        <div className="bg-teal px-8 py-2 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-cream/70">
            Your Day Master
          </p>
        </div>
        <div className="px-8 py-10 text-center">
          <p className="font-serif text-5xl font-medium text-ink sm:text-6xl">
            {chart.dayMaster.label}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
            <span className="font-serif text-xl text-gold">{reading.archetype}</span>
            <br />
            <span>{reading.archetypeBlurb}.</span>
          </p>
          <p className="mt-3 text-sm text-ink-soft">{reading.zodiacLine}</p>
        </div>
      </div>

      {/* Four Pillars */}
      <div>
        <h2 className="font-serif text-3xl font-medium text-ink">
          Your Four Pillars of Destiny
        </h2>
        <p className="mt-1 text-ink-soft">
          Each pillar holds a Heavenly Stem (top) and an Earthly Branch (bottom).
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {pillars.map(({ label, data }) => (
            <PillarCard key={label} label={label} pillar={data} />
          ))}
        </div>
      </div>

      {/* Five Elements */}
      <div>
        <h2 className="font-serif text-3xl font-medium text-ink">
          Five Elements Balance
        </h2>
        <p className="mt-1 text-ink-soft">
          8 points across all pillars. Balance shapes your destiny.
        </p>
        <div className="mt-5 space-y-3">
          {chart.elementsRanked.map(({ element, count }) => (
            <div key={element} className="flex items-center gap-4">
              <div className={`w-16 shrink-0 font-serif text-base font-medium ${ELEMENT_THEME[element].fg}`}>
                {element}
              </div>
              <div className="h-6 flex-1 overflow-hidden rounded-full bg-cream-soft">
                <div
                  className={`h-full ${ELEMENT_THEME[element].bar} transition-[width] duration-700`}
                  style={{ width: `${(count / 8) * 100}%` }}
                />
              </div>
              <div className="w-12 shrink-0 text-right text-sm tabular-nums text-ink-soft">
                {count} / 8
              </div>
            </div>
          ))}
        </div>

        {(reading.shortage || reading.excess) && (
          <div className="mt-6 space-y-2 rounded-2xl border border-line bg-cream-soft/60 p-5 text-sm leading-relaxed text-ink-soft">
            {reading.shortage && (
              <p>
                <span className="font-medium text-ink">Low {reading.shortage.element}:</span>{" "}
                {reading.shortage.gap}.
              </p>
            )}
            {reading.excess && (
              <p>
                <span className="font-medium text-ink">High {reading.excess.element}:</span>{" "}
                {reading.excess.gap}.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Upsell */}
      <div className="rounded-3xl border border-gold/40 bg-gradient-to-br from-cream-soft to-paper p-10 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Full Reading</p>
        <h3 className="mt-3 font-serif text-3xl font-medium text-ink sm:text-4xl">
          Go deeper into your destiny
        </h3>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">{reading.cta}</p>
        <button
          type="button"
          className="mt-6 rounded-xl border border-teal bg-paper px-6 py-3 font-serif text-base text-teal transition hover:bg-teal hover:text-cream"
        >
          Coming soon — join waitlist
        </button>
      </div>
    </section>
  );
}

function PillarCard({
  label,
  pillar,
}: {
  label: string;
  pillar: ReturnType<typeof JSON.parse>;
}) {
  const stemTheme = ELEMENT_THEME[pillar.stemElement as Element];
  const branchTheme = ELEMENT_THEME[pillar.branchElement as Element];
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper">
      <div className="bg-teal px-3 py-1.5 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-cream/80">
        {label}
      </div>
      <div className={`flex flex-col items-center px-3 py-5 ${stemTheme.bg}`}>
        <div className="font-serif text-5xl text-ink">{pillar.stem}</div>
        <div className="mt-1 text-xs text-ink-soft">{pillar.stemPinyin}</div>
        <div className={`mt-1.5 text-[10px] font-medium uppercase tracking-wider ${stemTheme.fg}`}>
          {pillar.stemYinYang} {pillar.stemElement}
        </div>
      </div>
      <div className={`flex flex-col items-center px-3 py-5 ${branchTheme.bg}`}>
        <div className="font-serif text-5xl text-ink">{pillar.branch}</div>
        <div className="mt-1 text-xs text-ink-soft">{pillar.branchPinyin}</div>
        <div className={`mt-1.5 text-[10px] font-medium uppercase tracking-wider ${branchTheme.fg}`}>
          {pillar.animal} · {pillar.branchElement}
        </div>
      </div>
    </div>
  );
}
