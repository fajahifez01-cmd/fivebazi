import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About FiveBaZi",
  description:
    "FiveBaZi is a free Chinese astrology calculator that translates 1,000+ years of BaZi wisdom into plain English.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <article className="mx-auto max-w-2xl prose prose-stone">
        <h1 className="text-4xl font-bold text-stone-900">About FiveBaZi</h1>

        <p className="mt-6 text-lg text-stone-700">
          FiveBaZi exists because Chinese astrology is one of the world&apos;s richest
          self-knowledge traditions — and almost none of it is accessible in English.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-stone-900">What we do</h2>
        <p className="mt-3 text-stone-700">
          We run your birth data through the same calculation used by traditional BaZi
          masters: Solar → Lunar conversion, Heavenly Stems and Earthly Branches, Five
          Elements distribution, Day Master identification. Then we translate the result
          into a reading anyone can understand — no Chinese background required.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-stone-900">Why &ldquo;Five&rdquo;?</h2>
        <p className="mt-3 text-stone-700">
          The Five Elements — Wood, Fire, Earth, Metal, Water (五行) — are the heart of
          BaZi. Every pillar in your chart, every stem and branch, is one of these five.
          The balance (or imbalance) between them is what makes your life pattern{" "}
          <em>yours</em>.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-stone-900">How accurate is this?</h2>
        <p className="mt-3 text-stone-700">
          The math is precise: we use the same{" "}
          <a href="https://github.com/6tail/lunar-typescript" className="underline">
            lunar-typescript
          </a>{" "}
          library that powers professional Chinese calendar apps. The interpretation is
          where craft comes in — and we&apos;ve tried to keep it grounded, specific, and
          honest. BaZi is best at describing patterns: your tendencies, your blind spots,
          the kinds of conditions where you thrive. It is not a fortune-telling oracle and
          won&apos;t predict next week&apos;s lottery numbers.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-stone-900">Who&apos;s behind this</h2>
        <p className="mt-3 text-stone-700">
          FiveBaZi is an independent project. We&apos;re a small team that cares about
          making old wisdom newly useful. Questions, corrections, or just want to say
          hello?{" "}
          <a href="/contact" className="underline">
            Get in touch
          </a>
          .
        </p>

        <p className="mt-10 text-sm text-stone-500">
          <a href="/" className="underline">
            ← Back to home
          </a>
        </p>
      </article>
    </main>
  );
}
