import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import { ZODIAC, ZODIAC_LIST, type ZodiacSlug } from "@/lib/content/zodiac";
import { ELEMENTS } from "@/lib/content/elements";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return ZODIAC_LIST.map((z) => ({ slug: z.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const z = ZODIAC[slug as ZodiacSlug];
    if (!z) return { title: "Not found" };
    return {
      title: `Year of the ${z.name} (${z.chinese}) — Chinese Zodiac Profile`,
      description: `${z.oneLine} Read the full Chinese zodiac profile of the ${z.name} — nature, strengths, watchouts, best matches, and career fits.`,
      alternates: { canonical: `https://fivebazi.com/zodiac/${z.slug}` },
      openGraph: {
        title: `Year of the ${z.name} — ${z.shortDesc}`,
        description: z.oneLine,
        type: "article",
      },
    };
  });
}

export default async function ZodiacPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const z = ZODIAC[slug as ZodiacSlug];
  if (!z) notFound();

  const element = ELEMENTS[z.element];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Year of the ${z.name} — Chinese Zodiac`,
    description: z.oneLine,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: "FiveBaZi", url: "https://fivebazi.com" },
  };

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

      <nav className="px-6 pt-8 text-sm text-ink-soft sm:px-10" aria-label="Breadcrumb">
        <div className="mx-auto max-w-3xl">
          <a href="/" className="hover:text-ink">Home</a>
          <span className="mx-2">/</span>
          <a href="/zodiac" className="hover:text-ink">Zodiac</a>
          <span className="mx-2">/</span>
          <span className="text-ink">{z.name}</span>
        </div>
      </nav>

      <section className="px-6 pb-12 pt-8 sm:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="font-serif text-9xl text-teal" aria-hidden>{z.chinese}</div>
          <h1 className="mt-4 font-serif text-5xl font-medium text-ink sm:text-6xl">
            Year of the {z.name}
          </h1>
          <p className="mt-2 text-base text-ink-soft">
            <span className="font-serif text-lg">{z.pinyin}</span>
            <span className="mx-2 text-gold">·</span>
            {z.shortDesc}
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg italic leading-relaxed text-ink-soft">
            &ldquo;{z.oneLine}&rdquo;
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-cream-soft/50 px-6 py-10 sm:px-10">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            ["Hours", z.hours],
            ["Season", z.season],
            ["Element", element.name],
            ["Polarity", z.yinYang],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-xs uppercase tracking-wider text-gold">{k}</div>
              <div className="mt-1 font-serif text-lg text-ink">{v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-medium text-ink">Their nature</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
            {z.natureLines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-cream-soft/50 px-6 py-16 sm:px-10">
        <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-medium text-ink">Strengths</h2>
            <ul className="mt-4 space-y-3 text-ink-soft">
              {z.strengths.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-medium text-ink">Watchouts</h2>
            <ul className="mt-4 space-y-3 text-ink-soft">
              {z.watchouts.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-medium text-ink">Compatibility</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wider text-gold">Best matches</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {z.bestMatches.map((m) => (
                  <a
                    key={m}
                    href={`/zodiac/${m}`}
                    className="rounded-full border border-line bg-paper px-4 py-1.5 text-sm text-ink transition hover:border-gold"
                  >
                    {ZODIAC[m].chinese} {ZODIAC[m].name}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gold">Challenging matches</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {z.challengingMatches.map((m) => (
                  <a
                    key={m}
                    href={`/zodiac/${m}`}
                    className="rounded-full border border-line bg-paper px-4 py-1.5 text-sm text-ink-soft transition hover:border-gold"
                  >
                    {ZODIAC[m].chinese} {ZODIAC[m].name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-cream-soft/50 px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-medium text-ink">Career fits</h2>
          <ul className="mt-5 grid gap-3 text-ink-soft sm:grid-cols-2">
            {z.careerFits.map((c, i) => (
              <li key={i} className="rounded-xl border border-line bg-paper px-4 py-3">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Element link</p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-ink">
            {z.name}&apos;s ruling element: {element.name}
          </h2>
          <p className="mt-3 text-ink-soft">{element.shortDesc}</p>
          <a
            href={`/element/${element.slug}`}
            className="mt-6 inline-block rounded-xl border border-teal bg-paper px-6 py-3 font-serif text-base text-teal transition hover:bg-teal hover:text-cream"
          >
            Read about {element.name} →
          </a>
        </div>
      </section>

      <section className="border-t border-line bg-teal px-6 py-16 text-cream sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-cream/60">
            Want the full picture?
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium">
            Generate your free BaZi chart
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cream/80">
            Your zodiac is one of four pillars. See all four — and the Five Elements
            running through them — in seconds.
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-xl bg-cream px-6 py-3 font-serif text-base text-teal transition hover:bg-paper"
          >
            Open the calculator →
          </a>
        </div>
      </section>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
