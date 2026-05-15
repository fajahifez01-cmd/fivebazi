import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-teal text-cream">
      <div className="mx-auto max-w-5xl px-6 py-14 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="horizontal" size={32} tone="cream" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              Chinese astrology, simplified. Free for everyone, every day.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg text-cream">Read</h3>
            <ul className="mt-3 space-y-2 text-sm text-cream/70">
              <li><a href="/day-master" className="hover:text-cream">Day Masters</a></li>
              <li><a href="/zodiac" className="hover:text-cream">Chinese Zodiac</a></li>
              <li><a href="/element" className="hover:text-cream">Five Elements</a></li>
              <li><a href="/learn" className="hover:text-cream">Learn (Guides)</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg text-cream">FiveBaZi</h3>
            <ul className="mt-3 space-y-2 text-sm text-cream/70">
              <li><a href="/about" className="hover:text-cream">About</a></li>
              <li><a href="/contact" className="hover:text-cream">Contact</a></li>
              <li><a href="/privacy" className="hover:text-cream">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg text-cream">Connect</h3>
            <ul className="mt-3 space-y-2 text-sm text-cream/70">
              <li>hello@fivebazi.com</li>
              <li className="text-cream/50">Built with care, 2026</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/15 pt-6 text-center text-xs text-cream/50">
          © {new Date().getFullYear()} FiveBaZi · Calculations powered by{" "}
          <a
            href="https://github.com/6tail/lunar-typescript"
            className="underline hover:text-cream"
          >
            lunar-typescript
          </a>{" "}
          · For educational purposes only.
        </div>
      </div>
    </footer>
  );
}
