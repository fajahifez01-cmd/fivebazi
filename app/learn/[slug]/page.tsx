import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import {
  ARTICLES,
  ARTICLE_LIST,
  CATEGORY_LABELS,
  type Article,
  type InternalLinkRef,
} from "@/lib/content/articles";
import { ZODIAC } from "@/lib/content/zodiac";
import { ELEMENTS } from "@/lib/content/elements";
import { DAY_MASTERS } from "@/lib/content/dayMasters";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return ARTICLE_LIST.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLES[slug];
  if (!a) return { title: "Not found" };
  return {
    title: a.title,
    description: a.metaDescription,
    alternates: { canonical: `https://fivebazi.com/learn/${a.slug}` },
    openGraph: {
      title: a.title,
      description: a.metaDescription,
      type: "article",
      publishedTime: a.publishedAt,
    },
  };
}

function resolveLink(ref: InternalLinkRef): { href: string; label: string } | null {
  if (ref.kind === "calculator") {
    return { href: "/", label: ref.label ?? "Open the free BaZi calculator" };
  }
  if (ref.kind === "article") {
    const target = ARTICLES[ref.slug];
    return target
      ? { href: `/learn/${target.slug}`, label: ref.label ?? target.h1 }
      : null;
  }
  if (ref.kind === "zodiac") {
    const target = ZODIAC[ref.slug as keyof typeof ZODIAC];
    return target
      ? { href: `/zodiac/${target.slug}`, label: ref.label ?? `Year of the ${target.name}` }
      : null;
  }
  if (ref.kind === "element") {
    const target = ELEMENTS[ref.slug as keyof typeof ELEMENTS];
    return target
      ? { href: `/element/${target.slug}`, label: ref.label ?? `${target.name} element` }
      : null;
  }
  if (ref.kind === "day-master") {
    const target = DAY_MASTERS[ref.slug as keyof typeof DAY_MASTERS];
    return target
      ? { href: `/day-master/${target.slug}`, label: ref.label ?? target.label }
      : null;
  }
  return null;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article: Article | undefined = ARTICLES[slug];
  if (!article) notFound();

  const related = article.related
    .map(resolveLink)
    .filter((r): r is { href: string; label: string } => Boolean(r));

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.h1,
    description: article.metaDescription,
    inLanguage: "en",
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: `https://fivebazi.com/learn/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: "FiveBaZi",
      url: "https://fivebazi.com",
    },
  };

  const jsonLdFAQ = article.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <main>
      <header className="px-6 pt-8 sm:px-10 sm:pt-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Logo variant="horizontal" size={36} tone="ink" />
          <nav className="hidden gap-7 text-sm text-ink-soft sm:flex">
            <a href="/day-master" className="hover:text-ink">Day Masters</a>
            <a href="/zodiac" className="hover:text-ink">Zodiac</a>
            <a href="/element" className="hover:text-ink">Five Elements</a>
            <a href="/learn" className="hover:text-ink">Learn</a>
            <a href="/about" className="hover:text-ink">About</a>
          </nav>
        </div>
      </header>

      <nav className="px-6 pt-8 text-sm text-ink-soft sm:px-10" aria-label="Breadcrumb">
        <div className="mx-auto max-w-3xl">
          <a href="/" className="hover:text-ink">Home</a>
          <span className="mx-2">/</span>
          <a href="/learn" className="hover:text-ink">Learn</a>
          <span className="mx-2">/</span>
          <span className="text-ink">{article.h1}</span>
        </div>
      </nav>

      <section className="px-6 pb-10 pt-8 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="text-xs uppercase tracking-wider text-gold">
            {CATEGORY_LABELS[article.category]} · {article.readingMinutes} min read
          </div>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
            {article.h1}
          </h1>
          <p className="mt-5 text-lg italic leading-relaxed text-ink-soft">
            {article.tldr}
          </p>
        </div>
      </section>

      <article className="px-6 pb-16 sm:px-10">
        <div className="mx-auto max-w-2xl space-y-6 text-lg leading-relaxed text-ink-soft">
          {article.intro.map((p, i) => (
            <p key={`intro-${i}`}>{p}</p>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl space-y-12">
          {article.sections.map((s, i) => (
            <section key={`sec-${i}`} className="space-y-5">
              <h2 className="font-serif text-2xl font-medium text-ink sm:text-3xl">
                {s.h2}
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-ink-soft">
                {s.paragraphs.map((p, j) => (
                  <p key={`p-${j}`}>{p}</p>
                ))}
              </div>
              {s.list && (
                <ul
                  className={`space-y-2 pl-5 text-ink-soft ${
                    s.list.type === "numbered" ? "list-decimal" : "list-disc"
                  }`}
                >
                  {s.list.items.map((item, k) => (
                    <li key={`li-${k}`} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {s.pullQuote && (
                <blockquote className="border-l-2 border-gold pl-5 font-serif text-xl italic leading-relaxed text-ink">
                  {s.pullQuote}
                </blockquote>
              )}
            </section>
          ))}
        </div>
      </article>

      {article.faqs.length > 0 && (
        <section className="border-t border-line bg-cream-soft/50 px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">FAQ</p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-ink">
              Common questions
            </h2>
            <dl className="mt-8 space-y-8">
              {article.faqs.map((f, i) => (
                <div key={`faq-${i}`}>
                  <dt className="font-serif text-lg font-medium text-ink">
                    {f.q}
                  </dt>
                  <dd className="mt-2 leading-relaxed text-ink-soft">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">
              Keep reading
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-ink">
              Related guides
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {related.map((r, i) => (
                <li key={`rel-${i}`}>
                  <a
                    href={r.href}
                    className="block rounded-xl border border-line bg-paper px-5 py-4 text-ink transition hover:border-gold"
                  >
                    {r.label} <span className="text-gold">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-line bg-teal px-6 py-16 text-cream sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-cream/60">
            Try it for yourself
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium">
            Generate your free BaZi chart
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cream/80">
            Reading about BaZi only goes so far. See your own Four Pillars,
            Day Master, and Five Elements in seconds.
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      {jsonLdFAQ && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
        />
      )}
    </main>
  );
}
