import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import {
  DAY_MASTERS,
  DAY_MASTER_LIST,
  type DayMasterSlug,
} from "@/lib/content/dayMasters";
import { ELEMENTS } from "@/lib/content/elements";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return DAY_MASTER_LIST.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const dm = DAY_MASTERS[slug as DayMasterSlug];
    if (!dm) return { title: "Not found" };
    return {
      title: `${dm.label} (${dm.stem}) Day Master — ${dm.archetype}`,
      description: `${dm.oneLine} Read the full character of the ${dm.label} Day Master in BaZi — strengths, shadow side, career fits, love style, and growth edge.`,
      alternates: { canonical: `https://fivebazi.com/day-master/${dm.slug}` },
      openGraph: {
        title: `${dm.label} — ${dm.archetype}`,
        description: dm.oneLine,
        type: "article",
      },
    };
  });
}

export default async function DayMasterPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const dm = DAY_MASTERS[slug as DayMasterSlug];
  if (!dm) notFound();

  const element = ELEMENTS[dm.element];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${dm.label} Day Master — ${dm.archetype}`,
    description: dm.oneLine,
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
          <a href="/day-master" className="hover:text-ink">Day Masters</a>
          <span className="mx-2">/</span>
          <span className="text-ink">{dm.label}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pb-12 pt-8 sm:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="font-serif text-9xl text-teal" aria-hidden>{dm.stem}</div>
          <h1 className="mt-4 font-serif text-5xl font-medium text-ink sm:text-6xl">
            {dm.label}
          </h1>
          <p className="mt-2 text-base text-ink-soft">
            <span className="font-serif text-lg">{dm.stemPinyin}</span>
            <span className="mx-2 text-gold">·</span>
            <span className="font-serif text-lg text-gold">{dm.archetype}</span>
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {dm.metaphor}. {dm.oneLine}
          </p>
        </div>
      </section>

      {/* Nature */}
      <section className="border-t border-line bg-cream-soft/50 px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-medium text-ink">Your nature</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
            {dm.natureLines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths / Shadow */}
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-medium text-ink">Your strengths</h2>
            <ul className="mt-4 space-y-3 text-ink-soft">
              {dm.strengths.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-medium text-ink">Your shadow side</h2>
            <ul className="mt-4 space-y-3 text-ink-soft">
              {dm.shadowSide.map((s, i) => (
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
      <section className="border-t border-line bg-cream-soft/50 px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-medium text-ink">Career fit</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{dm.careerFit}</p>
        </div>
      </section>

      {/* Love */}
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-medium text-ink">In love</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{dm.loveStyle}</p>
          <div className="mt-6">
            <p className="text-xs uppercase tracking-wider text-gold">Pairs well with</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {dm.pairsWell.map((p) => {
                const partner = DAY_MASTERS[p];
                return (
                  <a
                    key={p}
                    href={`/day-master/${p}`}
                    className="rounded-full border border-line bg-paper px-4 py-1.5 text-sm text-ink transition hover:border-gold"
                  >
                    {partner.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Growth edge */}
      <section className="border-t border-line bg-cream-soft/50 px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-medium text-ink">Your growth edge</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{dm.growthEdge}</p>
        </div>
      </section>

      {/* Element link */}
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Read further</p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-ink">
            Your element: {element.name}
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

      {/* CTA */}
      <section className="border-t border-line bg-teal px-6 py-16 text-cream sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-cream/60">
            Don't know your Day Master yet?
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium">
            Generate your free BaZi chart
          </h2>
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
