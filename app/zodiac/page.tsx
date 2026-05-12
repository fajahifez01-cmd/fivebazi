import type { Metadata } from "next";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import { ZODIAC_LIST } from "@/lib/content/zodiac";

export const metadata: Metadata = {
  title: "The Twelve Chinese Zodiac Animals (十二生肖) — Find Your Sign",
  description:
    "Read full profiles for all 12 Chinese zodiac animals — Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig — their nature, strengths, watchouts, and best matches.",
  alternates: { canonical: "https://fivebazi.com/zodiac" },
};

export default function ZodiacIndexPage() {
  return (
    <main>
      <header className="px-6 pt-8 sm:px-10 sm:pt-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Logo variant="horizontal" size={36} tone="ink" />
          <nav className="hidden gap-7 text-sm text-ink-soft sm:flex">
            <a href="/day-master" className="hover:text-ink">Day Masters</a>
            <a href="/zodiac" className="hover:text-ink">Zodiac</a>
            <a href="/element" className="hover:text-ink">Five Elements</a>
            <a href="/about" className="hover:text-ink">About</a>
          </nav>
        </div>
      </header>

      <section className="px-6 pb-16 pt-16 sm:px-10 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">十二生肖</p>
          <h1 className="mt-3 font-serif text-5xl font-medium leading-tight text-ink sm:text-6xl">
            The Twelve Chinese Zodiac
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
            Twelve animals, twelve archetypes — each ruling a year, an hour, and a season.
            Find yours and read its full character.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {ZODIAC_LIST.map((z) => (
            <a
              key={z.slug}
              href={`/zodiac/${z.slug}`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-line bg-paper p-6 text-center transition hover:border-gold hover:shadow-[0_6px_30px_rgba(45,42,38,0.06)]"
            >
              <div className="font-serif text-5xl text-teal">{z.chinese}</div>
              <div className="font-serif text-xl text-ink">{z.name}</div>
              <p className="text-xs text-ink-soft">{z.shortDesc}</p>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
