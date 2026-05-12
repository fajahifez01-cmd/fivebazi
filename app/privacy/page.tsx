import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How FiveBaZi handles your data — what we collect, what we don't, and how we use it.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <article className="mx-auto max-w-2xl prose prose-stone">
        <h1 className="text-4xl font-bold text-stone-900">Privacy Policy</h1>
        <p className="text-sm text-stone-500">Last updated: May 12, 2026</p>

        <p className="mt-6 text-stone-700">
          FiveBaZi (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the website{" "}
          <strong>fivebazi.com</strong> (the &ldquo;Service&rdquo;). This page describes what
          information we collect, how we use it, and the choices you have. We keep this short
          because the answer is mostly: <em>we don&apos;t collect much.</em>
        </p>

        <h2 className="mt-8 text-2xl font-bold text-stone-900">What we collect</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-700">
          <li>
            <strong>Birth data you enter</strong> (date, time, gender) is used purely to
            calculate your BaZi chart. The calculation runs entirely in your browser — your
            birth information is <em>not</em> transmitted to our servers and is not stored
            anywhere on our side.
          </li>
          <li>
            <strong>Anonymous analytics</strong> (page views, country, browser) via standard
            web analytics, used only to understand which pages are popular.
          </li>
          <li>
            <strong>Advertising data</strong> when you see ads (Google AdSense and similar):
            cookies and identifiers may be set by Google to show relevant ads. See Google&apos;s{" "}
            <a href="https://policies.google.com/technologies/ads" className="underline">
              advertising privacy notice
            </a>
            .
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold text-stone-900">What we don&apos;t collect</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-700">
          <li>We don&apos;t require an account to use the free BaZi calculator.</li>
          <li>We don&apos;t collect your name, email, or address unless you contact us.</li>
          <li>We don&apos;t sell your data to third parties.</li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold text-stone-900">Cookies</h2>
        <p className="mt-3 text-stone-700">
          We use minimal first-party cookies for site preferences. Third-party cookies (e.g.
          Google AdSense, Google Analytics) may be placed by ad providers; you can manage
          these in your browser settings or via{" "}
          <a href="https://adssettings.google.com" className="underline">
            Google Ads Settings
          </a>
          .
        </p>

        <h2 className="mt-8 text-2xl font-bold text-stone-900">Your rights</h2>
        <p className="mt-3 text-stone-700">
          Since we don&apos;t store personal data, there&apos;s typically nothing for us to
          delete. If you have a question or want us to clarify what (if anything) we have
          about you, email us at <strong>privacy@fivebazi.com</strong>.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-stone-900">Children</h2>
        <p className="mt-3 text-stone-700">
          FiveBaZi is intended for users aged 13 and over. We do not knowingly collect
          information from children under 13.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-stone-900">Changes to this policy</h2>
        <p className="mt-3 text-stone-700">
          We may update this Privacy Policy from time to time. Material changes will be noted
          on this page along with a revised &ldquo;Last updated&rdquo; date.
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
