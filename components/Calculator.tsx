"use client";

import { useState, useTransition } from "react";
import { calculateBaZi, type BaZiChart, type Element } from "@/lib/bazi";
import { generateReading } from "@/lib/reading";

const ELEMENT_COLOR: Record<Element, { bg: string; ring: string; text: string }> = {
  Wood:  { bg: "bg-emerald-100",  ring: "ring-emerald-400",  text: "text-emerald-800" },
  Fire:  { bg: "bg-rose-100",     ring: "ring-rose-400",     text: "text-rose-800" },
  Earth: { bg: "bg-amber-100",    ring: "ring-amber-500",    text: "text-amber-900" },
  Metal: { bg: "bg-zinc-100",     ring: "ring-zinc-400",     text: "text-zinc-800" },
  Water: { bg: "bg-sky-100",      ring: "ring-sky-400",      text: "text-sky-800" },
};

const ELEMENT_BAR: Record<Element, string> = {
  Wood: "bg-emerald-500",
  Fire: "bg-rose-500",
  Earth: "bg-amber-500",
  Metal: "bg-zinc-500",
  Water: "bg-sky-500",
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
        document.getElementById("result")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    });
  };

  return (
    <div className="w-full">
      <form
        onSubmit={onSubmit}
        className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <SelectField label="Year"   value={year}   onChange={setYear}   options={range(1920, now.getFullYear())} />
          <SelectField label="Month"  value={month}  onChange={setMonth}  options={range(1, 12)} />
          <SelectField label="Day"    value={day}    onChange={setDay}    options={range(1, 31)} />
          <SelectField label="Hour"   value={hour}   onChange={setHour}   options={range(0, 23)} formatter={(v) => v.toString().padStart(2, "0")} />
          <SelectField label="Minute" value={minute} onChange={setMinute} options={range(0, 59)} formatter={(v) => v.toString().padStart(2, "0")} />
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-stone-600">
              Gender
            </label>
            <div className="mt-1 flex gap-2">
              <button
                type="button"
                onClick={() => setIsMale(true)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm transition ${
                  isMale
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setIsMale(false)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm transition ${
                  !isMale
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                }`}
              >
                Female
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:shadow-lg disabled:opacity-60"
        >
          {pending ? "Calculating..." : "Generate My BaZi Chart →"}
        </button>
        <p className="mt-3 text-center text-xs text-stone-500">
          100% free · No sign-up · Calculation runs locally in your browser
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
      <label className="block text-xs font-medium uppercase tracking-wide text-stone-600">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value) as T)}
        className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
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
    <section id="result" className="mt-10 space-y-8">
      {/* Day Master headline */}
      <div className="rounded-3xl border border-stone-200 bg-gradient-to-br from-amber-50 via-rose-50 to-stone-50 p-8 text-center shadow-sm">
        <p className="text-sm uppercase tracking-widest text-stone-500">Your Day Master</p>
        <p className="mt-2 text-4xl font-bold text-stone-900 sm:text-5xl">
          {chart.dayMaster.label}
        </p>
        <p className="mt-3 text-lg text-stone-700">
          <span className="font-semibold">{reading.archetype}</span> — {reading.archetypeBlurb}.
        </p>
        <p className="mt-2 text-sm text-stone-500">{reading.zodiacLine}</p>
      </div>

      {/* Four Pillars */}
      <div>
        <h2 className="text-2xl font-bold text-stone-900">Your Four Pillars of Destiny</h2>
        <p className="mt-1 text-sm text-stone-600">
          Each pillar holds a Heavenly Stem (top) and an Earthly Branch (bottom).
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {pillars.map(({ label, data }) => (
            <PillarCard key={label} label={label} pillar={data} />
          ))}
        </div>
      </div>

      {/* Five Elements */}
      <div>
        <h2 className="text-2xl font-bold text-stone-900">Five Elements Balance</h2>
        <p className="mt-1 text-sm text-stone-600">
          Total of 8 element points across all pillars. Balance shapes your destiny.
        </p>
        <div className="mt-4 space-y-3">
          {chart.elementsRanked.map(({ element, count }) => (
            <div key={element} className="flex items-center gap-4">
              <div className={`w-16 shrink-0 text-sm font-semibold ${ELEMENT_COLOR[element].text}`}>
                {element}
              </div>
              <div className="h-6 flex-1 overflow-hidden rounded-full bg-stone-100">
                <div
                  className={`h-full ${ELEMENT_BAR[element]} transition-[width] duration-500`}
                  style={{ width: `${(count / 8) * 100}%` }}
                />
              </div>
              <div className="w-10 shrink-0 text-right text-sm tabular-nums text-stone-600">
                {count} / 8
              </div>
            </div>
          ))}
        </div>

        {(reading.shortage || reading.excess) && (
          <div className="mt-5 space-y-2 rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700">
            {reading.shortage && (
              <p>
                <span className="font-semibold text-stone-900">Low {reading.shortage.element}:</span>{" "}
                {reading.shortage.gap}.
              </p>
            )}
            {reading.excess && (
              <p>
                <span className="font-semibold text-stone-900">High {reading.excess.element}:</span>{" "}
                {reading.excess.gap}.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Upsell */}
      <div className="rounded-3xl border-2 border-dashed border-amber-300 bg-amber-50/60 p-8 text-center">
        <p className="text-xs uppercase tracking-widest text-amber-700">Full Reading</p>
        <h3 className="mt-2 text-2xl font-bold text-stone-900">
          Go deeper into your destiny
        </h3>
        <p className="mt-3 text-stone-700">{reading.cta}</p>
        <button
          type="button"
          className="mt-5 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-stone-800"
        >
          Coming soon — join waitlist
        </button>
      </div>
    </section>
  );
}

function PillarCard({ label, pillar }: { label: string; pillar: ReturnType<typeof JSON.parse> }) {
  const stemColor = ELEMENT_COLOR[pillar.stemElement as Element];
  const branchColor = ELEMENT_COLOR[pillar.branchElement as Element];
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="bg-stone-900 px-3 py-1.5 text-center text-xs font-semibold uppercase tracking-widest text-stone-300">
        {label}
      </div>
      <div className={`flex flex-col items-center px-3 py-4 ${stemColor.bg}`}>
        <div className="text-4xl font-bold text-stone-900">{pillar.stem}</div>
        <div className="mt-1 text-xs text-stone-600">{pillar.stemPinyin}</div>
        <div className={`mt-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${stemColor.text}`}>
          {pillar.stemYinYang} {pillar.stemElement}
        </div>
      </div>
      <div className={`flex flex-col items-center px-3 py-4 ${branchColor.bg}`}>
        <div className="text-4xl font-bold text-stone-900">{pillar.branch}</div>
        <div className="mt-1 text-xs text-stone-600">{pillar.branchPinyin}</div>
        <div className={`mt-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${branchColor.text}`}>
          {pillar.animal} · {pillar.branchElement}
        </div>
      </div>
    </div>
  );
}
