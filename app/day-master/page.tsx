import type { Metadata } from "next";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import { DAY_MASTER_LIST } from "@/lib/content/dayMasters";

export const metadata: Metadata = {
  title: "The Ten Day Masters in BaZi (十天干) — Find Your Archetype",
  description:
    "Your Day Master is the single most important character in your BaZi chart. Read about all 10 Day Masters — Yang Wood through Yin Water — and find the archetype that maps to you.",
  alternates: { canonical: "https://fivebazi.com/day-master" },
};

export default function DayMasterIndexPage() {
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
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">十天干</p>
          <h1 className="mt-3 font-serif text-5xl font-medium leading-tight text-ink sm:text-6xl">
            The Ten Day Masters
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
            Your Day Master is the Heavenly Stem of your Day Pillar — the single
            most important character in your chart. It is, more than anything else,{" "}
            <em>you</em>.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2">
          {DAY_MASTER_LIST.map((dm) => (
            <a
              key={dm.slug}
              href={`/day-master/${dm.slug}`}
              className="group flex items-start gap-5 rounded-2xl border border-line bg-paper p-5 transition hover:border-gold hover:shadow-[0_6px_30px_rgba(45,42,38,0.06)]"
            >
              <div className="font-serif text-5xl text-teal">{dm.stem}</div>
              <div>
                <div className="font-serif text-xl text-ink">{dm.label}</div>
                <div className="mt-1 text-sm text-gold">{dm.archetype}</div>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {dm.oneLine}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
