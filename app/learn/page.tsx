import type { Metadata } from "next";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import {
  ARTICLE_LIST,
  CATEGORY_LABELS,
  KEYWORDS,
  type Article,
  type ArticleCategory,
} from "@/lib/content/articles";

export const metadata: Metadata = {
  title: "Learn BaZi — Long-form Guides to Chinese Astrology",
  description:
    "Plain-English guides to BaZi (Chinese Four Pillars astrology). Day Masters, Five Elements, zodiac compatibility, and how to actually read your chart.",
  alternates: { canonical: "https://fivebazi.com/learn" },
};

const CATEGORY_ORDER: ArticleCategory[] = [
  "fundamentals",
  "day-master",
  "elements",
  "zodiac",
];

export default function LearnIndexPage() {
  const byCategory: Record<ArticleCategory, Article[]> = {
    fundamentals: [],
    "day-master": [],
    elements: [],
    zodiac: [],
  };
  for (const a of ARTICLE_LIST) {
    byCategory[a.category].push(a);
  }

  const totalPublished = ARTICLE_LIST.length;
  const totalPlanned = KEYWORDS.length;

  return (
    <main>
      <header className="px-6 pt-8 sm:px-10 sm:pt-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Logo variant="horizontal" size={36} tone="ink" />
          <nav className="hidden gap-7 text-sm text-ink-soft sm:flex">
            <a href="/day-master" className="hover:text-ink">Day Masters</a>
            <a href="/zodiac" className="hover:text-ink">Zodiac</a>
            <a href="/element" className="hover:text-ink">Five Elements</a>
            <a href="/learn" className="text-ink">Learn</a>
            <a href="/about" className="hover:text-ink">About</a>
          </nav>
        </div>
      </header>

      <section className="px-6 pb-12 pt-16 sm:px-10 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
            学 · Learn
          </p>
          <h1 className="mt-3 font-serif text-5xl font-medium leading-tight text-ink sm:text-6xl">
            Long-form guides to BaZi
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
            Everything we&apos;ve written about Chinese astrology, in plain English —
            from the Day Master to the Five Elements to zodiac compatibility done right.
          </p>
          {totalPublished < totalPlanned && (
            <p className="mt-3 text-xs uppercase tracking-wider text-ink-soft/70">
              {totalPublished} of {totalPlanned} guides published
            </p>
          )}
        </div>
      </section>

      {totalPublished === 0 ? (
        <section className="px-6 pb-24 sm:px-10">
          <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-cream-soft/40 p-10 text-center">
            <p className="text-ink-soft">
              The first batch of guides is being prepared. Check back soon — in
              the meantime, try the calculator or browse Day Masters, Zodiac,
              and Five Elements.
            </p>
            <a
              href="/"
              className="mt-6 inline-block rounded-xl border border-teal bg-paper px-6 py-3 font-serif text-base text-teal transition hover:bg-teal hover:text-cream"
            >
              Open the calculator →
            </a>
          </div>
        </section>
      ) : (
        <div className="mx-auto max-w-5xl space-y-16 px-6 pb-24 sm:px-10">
          {CATEGORY_ORDER.map((cat) => {
            const items = byCategory[cat];
            if (items.length === 0) return null;
            return (
              <section key={cat}>
                <div className="mb-6 flex items-baseline justify-between">
                  <h2 className="font-serif text-3xl font-medium text-ink">
                    {CATEGORY_LABELS[cat]}
                  </h2>
                  <span className="text-xs uppercase tracking-wider text-gold">
                    {items.length} {items.length === 1 ? "guide" : "guides"}
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {items.map((a) => (
                    <a
                      key={a.slug}
                      href={`/learn/${a.slug}`}
                      className="group block rounded-2xl border border-line bg-paper p-6 transition hover:-translate-y-1 hover:border-gold hover:shadow-[0_6px_30px_rgba(45,42,38,0.06)]"
                    >
                      <div className="text-xs uppercase tracking-wider text-gold">
                        {CATEGORY_LABELS[a.category]} · {a.readingMinutes} min read
                      </div>
                      <h3 className="mt-2 font-serif text-xl text-ink">{a.h1}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {a.tldr}
                      </p>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      <Footer />
    </main>
  );
}
