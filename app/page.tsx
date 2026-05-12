import Calculator from "@/components/Calculator";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      {/* Site header */}
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

      {/* Hero + calculator */}
      <section className="px-6 pb-16 pt-16 sm:px-10 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
            五行 · Five Elements · BaZi
          </p>
          <h1 className="mt-4 font-serif text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
            Discover your <em className="not-italic text-teal">Four Pillars</em>
            <br className="hidden sm:block" /> of Destiny
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            A free Chinese astrology reading drawn from the exact moment you were born —
            decoded into plain English. No sign-up. No upsells in the way.
          </p>
          <div className="mt-7 flex items-center justify-center gap-2 text-xs text-ink-soft">
            <span aria-hidden>✦</span>
            <span>Used by 12,000+ seekers · No account required</span>
            <span aria-hidden>✦</span>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Calculator />
        </div>
      </section>

      {/* Three-pillar story */}
      <section className="border-t border-line bg-cream-soft/40 px-6 py-20 sm:px-10">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
          {[
            {
              num: "壹",
              title: "Ancient calculation",
              body: "The same Solar→Lunar conversion used by traditional masters for a thousand years — running locally in your browser.",
            },
            {
              num: "贰",
              title: "Plain English reading",
              body: "We translate the Day Master, Five Elements, and Four Pillars into language anyone can act on. No mystic jargon.",
            },
            {
              num: "叁",
              title: "Yours to keep",
              body: "Your birth data never leaves your device. We don't store charts, sell data, or require accounts.",
            },
          ].map((item) => (
            <article key={item.title} className="text-center">
              <div className="font-serif text-4xl text-gold">{item.num}</div>
              <h3 className="mt-3 font-serif text-2xl font-medium text-ink">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* What is BaZi */}
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Primer
          </p>
          <h2 className="mt-3 font-serif text-4xl font-medium text-ink sm:text-5xl">
            What is BaZi?
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              BaZi (八字), literally <em>&ldquo;Eight Characters,&rdquo;</em> is a
              centuries-old system of Chinese astrology that decodes destiny from the
              exact moment you were born. Unlike Western astrology — which leans on the
              Sun and twelve signs — BaZi maps your life onto Four Pillars: Year, Month,
              Day, and Hour.
            </p>
            <p>
              Each pillar carries a <strong className="text-ink">Heavenly Stem</strong>{" "}
              (天干) and an <strong className="text-ink">Earthly Branch</strong> (地支).
              Together, eight characters reveal the elemental DNA of who you are.
            </p>
            <p>
              At the heart of the chart sits your{" "}
              <strong className="text-ink">Day Master</strong> — the Stem of your Day
              Pillar. This is <em>you</em>. Everything else describes the world you walk
              through.
            </p>
          </div>
        </div>
      </section>

      {/* Five Elements primer with cross-links */}
      <section className="border-t border-line bg-cream-soft/40 px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
              五行
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium text-ink sm:text-5xl">
              The Five Elements
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-soft">
              Every BaZi chart is a story told in five forces. Click any element to read
              its full nature, season, and what it means when it dominates your chart.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { slug: "wood",  name: "Wood",  cn: "木", line: "Growth · vision · beginnings" },
              { slug: "fire",  name: "Fire",  cn: "火", line: "Expression · passion · light" },
              { slug: "earth", name: "Earth", cn: "土", line: "Stability · nurture · ground" },
              { slug: "metal", name: "Metal", cn: "金", line: "Precision · cut · refinement" },
              { slug: "water", name: "Water", cn: "水", line: "Wisdom · flow · adaptation" },
            ].map((el) => (
              <a
                key={el.slug}
                href={`/element/${el.slug}`}
                className={`group block rounded-2xl border border-line bg-paper p-6 transition hover:-translate-y-1 hover:border-gold hover:shadow-[0_6px_30px_rgba(45,42,38,0.06)]`}
              >
                <div className="font-serif text-4xl text-teal">{el.cn}</div>
                <div className="mt-2 font-serif text-2xl text-ink">{el.name}</div>
                <p className="mt-2 text-sm text-ink-soft">{el.line}</p>
                <div className="mt-4 text-xs uppercase tracking-wider text-gold opacity-0 transition group-hover:opacity-100">
                  Read more →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Day Master explorer (programmatic SEO entry points) */}
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
              十天干
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium text-ink sm:text-5xl">
              The Ten Day Masters
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-soft">
              Your Day Master is the single most important character in your chart. Each
              has a distinct archetype, energy, and life pattern.
            </p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { slug: "yang-wood-jia", cn: "甲", name: "Yang Wood", arch: "The Towering Tree" },
              { slug: "yin-wood-yi",   cn: "乙", name: "Yin Wood",  arch: "The Flexible Vine" },
              { slug: "yang-fire-bing",cn: "丙", name: "Yang Fire", arch: "The Bright Sun" },
              { slug: "yin-fire-ding", cn: "丁", name: "Yin Fire",  arch: "The Candle Flame" },
              { slug: "yang-earth-wu", cn: "戊", name: "Yang Earth",arch: "The Mountain" },
              { slug: "yin-earth-ji",  cn: "己", name: "Yin Earth", arch: "The Fertile Field" },
              { slug: "yang-metal-geng",cn: "庚",name: "Yang Metal",arch: "The Sword Blade" },
              { slug: "yin-metal-xin", cn: "辛", name: "Yin Metal", arch: "The Jewel" },
              { slug: "yang-water-ren",cn: "壬", name: "Yang Water",arch: "The Ocean" },
              { slug: "yin-water-gui", cn: "癸", name: "Yin Water", arch: "The Stream" },
            ].map((dm) => (
              <a
                key={dm.slug}
                href={`/day-master/${dm.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-paper p-4 transition hover:border-gold"
              >
                <div className="font-serif text-3xl text-teal">{dm.cn}</div>
                <div>
                  <div className="font-serif text-base font-medium text-ink">
                    {dm.name}
                  </div>
                  <div className="text-xs text-ink-soft">{dm.arch}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Zodiac grid */}
      <section className="border-t border-line bg-cream-soft/40 px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
              十二生肖
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium text-ink sm:text-5xl">
              Your Chinese Zodiac
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-soft">
              Twelve animals, twelve archetypes — find yours and read its full character.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {[
              ["rat","Rat","鼠"],["ox","Ox","牛"],["tiger","Tiger","虎"],
              ["rabbit","Rabbit","兔"],["dragon","Dragon","龙"],["snake","Snake","蛇"],
              ["horse","Horse","马"],["goat","Goat","羊"],["monkey","Monkey","猴"],
              ["rooster","Rooster","鸡"],["dog","Dog","狗"],["pig","Pig","猪"],
            ].map(([slug, name, cn]) => (
              <a
                key={slug}
                href={`/zodiac/${slug}`}
                className="group flex flex-col items-center gap-1 rounded-2xl border border-line bg-paper p-4 text-center transition hover:border-gold"
              >
                <div className="font-serif text-3xl text-teal">{cn}</div>
                <div className="font-serif text-base text-ink">{name}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Accuracy / trust */}
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Honesty
          </p>
          <h2 className="mt-3 font-serif text-4xl font-medium text-ink sm:text-5xl">
            How accurate is BaZi?
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              BaZi has been refined for over a thousand years across Chinese imperial
              courts, merchant families, and Buddhist temples. It is not used to predict
              lottery numbers — it is used to <strong>understand patterns</strong>: your
              strengths, your blind spots, the seasons of your life that favor you and
              the ones that test you.
            </p>
            <p>
              Most people who see their chart for the first time say the same thing:{" "}
              <em>&ldquo;That&apos;s eerily me.&rdquo;</em> Generate yours above and see
              for yourself.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
