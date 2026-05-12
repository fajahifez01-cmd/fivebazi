import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import {
  ELEMENTS,
  ELEMENT_LIST,
  type ElementSlug,
} from "@/lib/content/elements";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return ELEMENT_LIST.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const el = ELEMENTS[slug as ElementSlug];
    if (!el) return { title: "Not found" };
    return {
      title: `${el.name} Element (${el.chinese}) in BaZi — Nature, Season, Meaning`,
      description: `${el.shortDesc} Read the full character of the ${el.name} element in Chinese astrology — its season, organ, archetype, and what it means when ${el.name} dominates or is missing from your BaZi chart.`,
      alternates: { canonical: `https://fivebazi.com/element/${el.slug}` },
      openGraph: {
        title: `${el.name} (${el.chinese}) — The ${el.archetype}`,
        description: el.shortDesc,
        type: "article",
      },
    };
  });
}

export default async function ElementPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const el = ELEMENTS[slug as ElementSlug];
  if (!el) notFound();

  const generatesEl = ELEMENTS[el.generates];
  const controlsEl = ELEMENTS[el.controls];
  const generatedByEl = ELEMENTS[el.generatedBy];
  const controlledByEl = ELEMENTS[el.controlledBy];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${el.name} (${el.chinese}) Element in BaZi`,
    description: el.shortDesc,
    about: `${el.name} element in Chinese astrology`,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: "FiveBaZi",
      url: "https://fivebazi.com",
    },
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

      {/* Breadcrumbs */}
      <nav className="px-6 pt-8 text-sm text-ink-soft sm:px-10" aria-label="Breadcrumb">
        <div className="mx-auto max-w-3xl">
          <a href="/" className="hover:text-ink">Home</a>
          <span className="mx-2">/</span>
          <a href="/element" className="hover:text-ink">Five Elements</a>
          <span className="mx-2">/</span>
          <span className="text-ink">{el.name}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pb-12 pt-8 sm:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="font-serif text-9xl text-teal" aria-hidden>
            {el.chinese}
          </div>
          <h1 className="mt-4 font-serif text-5xl font-medium text-ink sm:text-6xl">
            {el.name}
          </h1>
          <p className="mt-2 text-base text-ink-soft">
            <span className="font-serif text-lg">{el.pinyin}</span>
            <span className="mx-2 text-gold">·</span>
            {el.archetype}
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {el.shortDesc}
          </p>
        </div>
      </section>

      {/* Quick facts */}
      <section className="border-y border-line bg-cream-soft/50 px-6 py-10 sm:px-10">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            ["Season", el.season],
            ["Direction", el.direction],
            ["Color", el.color],
            ["Organ", el.organ],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-xs uppercase tracking-wider text-gold">{k}</div>
              <div className="mt-1 font-serif text-lg text-ink">{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Nature */}
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-medium text-ink">Its nature</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
            {el.natureLines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </section>

      {/* When strong / weak */}
      <section className="border-t border-line bg-cream-soft/50 px-6 py-16 sm:px-10">
        <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-medium text-ink">
              When {el.name} is strong in your chart
            </h2>
            <ul className="mt-4 space-y-3 text-ink-soft">
              {el.whenStrong.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-medium text-ink">
              When {el.name} is weak or missing
            </h2>
            <ul className="mt-4 space-y-3 text-ink-soft">
              {el.whenWeak.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Career */}
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-medium text-ink">
            Career fits for strong {el.name}
          </h2>
          <ul className="mt-5 grid gap-3 text-ink-soft sm:grid-cols-2">
            {el.careerFits.map((c, i) => (
              <li key={i} className="rounded-xl border border-line bg-paper px-4 py-3">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Relationships */}
      <section className="border-t border-line bg-cream-soft/50 px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-medium text-ink">
            {el.name} in relationships
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {el.relationshipNote}
          </p>
        </div>
      </section>

      {/* Cycle map */}
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-medium text-ink">
            How {el.name} interacts with the other elements
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a
              href={`/element/${generatesEl.slug}`}
              className="rounded-2xl border border-line bg-paper p-5 transition hover:border-gold"
            >
              <div className="text-xs uppercase tracking-wider text-gold">
                Generates →
              </div>
              <div className="mt-1 font-serif text-xl text-ink">
                {el.name} generates {generatesEl.name}
              </div>
              <p className="mt-1 text-sm text-ink-soft">{generatesEl.shortDesc}</p>
            </a>
            <a
              href={`/element/${controlsEl.slug}`}
              className="rounded-2xl border border-line bg-paper p-5 transition hover:border-gold"
            >
              <div className="text-xs uppercase tracking-wider text-gold">Controls ↓</div>
              <div className="mt-1 font-serif text-xl text-ink">
                {el.name} controls {controlsEl.name}
              </div>
              <p className="mt-1 text-sm text-ink-soft">{controlsEl.shortDesc}</p>
            </a>
            <a
              href={`/element/${generatedByEl.slug}`}
              className="rounded-2xl border border-line bg-paper p-5 transition hover:border-gold"
            >
              <div className="text-xs uppercase tracking-wider text-gold">
                Generated by ←
              </div>
              <div className="mt-1 font-serif text-xl text-ink">
                {generatedByEl.name} feeds {el.name}
              </div>
              <p className="mt-1 text-sm text-ink-soft">{generatedByEl.shortDesc}</p>
            </a>
            <a
              href={`/element/${controlledByEl.slug}`}
              className="rounded-2xl border border-line bg-paper p-5 transition hover:border-gold"
            >
              <div className="text-xs uppercase tracking-wider text-gold">
                Controlled by ↑
              </div>
              <div className="mt-1 font-serif text-xl text-ink">
                {controlledByEl.name} restrains {el.name}
              </div>
              <p className="mt-1 text-sm text-ink-soft">{controlledByEl.shortDesc}</p>
            </a>
          </div>
        </div>
      </section>

      {/* Balancing tip */}
      <section className="border-t border-line bg-teal px-6 py-16 text-cream sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-cream/60">
            Working with {el.name}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium">
            Practical tips
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream/85">
            {el.balancingTip}
          </p>
          <a
            href="/"
            className="mt-8 inline-block rounded-xl bg-cream px-6 py-3 font-serif text-base text-teal transition hover:bg-paper"
          >
            Generate your full BaZi chart →
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
