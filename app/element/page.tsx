import type { Metadata } from "next";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import { ELEMENT_LIST } from "@/lib/content/elements";

export const metadata: Metadata = {
  title: "The Five Elements of BaZi (五行) — Wood, Fire, Earth, Metal, Water",
  description:
    "Read the full nature, season, and meaning of each of the Five Elements in Chinese astrology. Click any element to learn what it means when it dominates your chart.",
  alternates: { canonical: "https://fivebazi.com/element" },
};

export default function ElementIndexPage() {
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
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">五行</p>
          <h1 className="mt-3 font-serif text-5xl font-medium leading-tight text-ink sm:text-6xl">
            The Five Elements
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
            Wood, Fire, Earth, Metal, Water — five forces that explain why life
            unfolds the way it does. Click any element to read its full nature.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {ELEMENT_LIST.map((el) => (
            <a
              key={el.slug}
              href={`/element/${el.slug}`}
              className="group block rounded-2xl border border-line bg-paper p-6 transition hover:-translate-y-1 hover:border-gold hover:shadow-[0_6px_30px_rgba(45,42,38,0.06)]"
            >
              <div className="font-serif text-5xl text-teal">{el.chinese}</div>
              <div className="mt-3 font-serif text-2xl text-ink">{el.name}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {el.shortDesc}
              </p>
              <div className="mt-4 text-xs uppercase tracking-wider text-gold opacity-0 transition group-hover:opacity-100">
                Read more →
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
