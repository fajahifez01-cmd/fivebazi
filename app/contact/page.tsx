import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the FiveBaZi team — questions, corrections, partnerships, or feedback.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <article className="mx-auto max-w-2xl prose prose-stone">
        <h1 className="text-4xl font-bold text-stone-900">Contact</h1>

        <p className="mt-6 text-lg text-stone-700">
          We read every message. Pick the right inbox below and we&apos;ll typically
          respond within 2 business days.
        </p>

        <div className="mt-8 space-y-5">
          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-700">
              General Questions
            </div>
            <div className="mt-1 text-lg font-semibold text-stone-900">
              hello@fivebazi.com
            </div>
            <p className="mt-1 text-sm text-stone-600">
              About BaZi readings, how to use the calculator, or general curiosity.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-700">
              Privacy &amp; Data
            </div>
            <div className="mt-1 text-lg font-semibold text-stone-900">
              privacy@fivebazi.com
            </div>
            <p className="mt-1 text-sm text-stone-600">
              Questions about our{" "}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-700">
              Partnerships
            </div>
            <div className="mt-1 text-lg font-semibold text-stone-900">
              partners@fivebazi.com
            </div>
            <p className="mt-1 text-sm text-stone-600">
              Content collaborations, integrations, or sponsorship.
            </p>
          </div>
        </div>

        <p className="mt-10 text-sm text-stone-500">
          <a href="/" className="underline">
            ← Back to home
          </a>
        </p>
      </article>
    </main>
  );
}
