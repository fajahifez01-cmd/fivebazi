import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/40 to-rose-50/40">
      <section className="px-6 pb-12 pt-16 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            五行 · Five Elements · BaZi
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
            Free BaZi Chart Calculator
          </h1>
          <p className="mt-5 text-lg text-stone-700 sm:text-xl">
            Generate your <span className="font-semibold">Four Pillars of Destiny</span> in
            seconds. Discover your Day Master, Five Element balance, and what your Chinese
            astrology says about your life.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <Calculator />
        </div>
      </section>

      <section className="border-t border-stone-200/60 bg-white/40 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-stone-900">What is BaZi?</h2>
          <div className="mt-5 space-y-4 text-stone-700">
            <p>
              BaZi (八字), literally <em>&ldquo;Eight Characters,&rdquo;</em> is a centuries-old
              system of Chinese astrology that decodes your destiny from the exact moment you
              were born. Unlike Western astrology — which leans on the Sun and twelve zodiac
              signs — BaZi maps your life onto Four Pillars: Year, Month, Day, and Hour.
            </p>
            <p>
              Each pillar carries a <strong>Heavenly Stem</strong> (天干) and an{" "}
              <strong>Earthly Branch</strong> (地支). Together, the eight characters reveal the
              elemental DNA of who you are.
            </p>
            <p>
              At the heart of the chart sits your <strong>Day Master</strong> — the Stem of
              your Day Pillar. This is <em>you</em>. Everything else in your chart describes
              the world you walk through.
            </p>
          </div>

          <h2 className="mt-12 text-3xl font-bold text-stone-900">The Five Elements</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { name: "Wood",  color: "from-emerald-50 to-emerald-100 text-emerald-900", desc: "Growth, vision, beginnings. The seed that becomes a forest." },
              { name: "Fire",  color: "from-rose-50 to-rose-100 text-rose-900",          desc: "Expression, passion, visibility. The light that warms the world." },
              { name: "Earth", color: "from-amber-50 to-amber-100 text-amber-900",       desc: "Stability, nurture, foundations. The ground that holds everything." },
              { name: "Metal", color: "from-zinc-50 to-zinc-100 text-zinc-900",          desc: "Precision, discipline, refinement. The blade that cuts cleanly." },
              { name: "Water", color: "from-sky-50 to-sky-100 text-sky-900",             desc: "Wisdom, flow, intuition. The river that finds every path." },
            ].map((e) => (
              <div
                key={e.name}
                className={`rounded-2xl border border-stone-200 bg-gradient-to-br ${e.color} p-5`}
              >
                <div className="text-lg font-bold">{e.name}</div>
                <div className="mt-1 text-sm opacity-90">{e.desc}</div>
              </div>
            ))}
          </div>

          <h2 className="mt-12 text-3xl font-bold text-stone-900">
            How accurate is BaZi?
          </h2>
          <div className="mt-5 space-y-4 text-stone-700">
            <p>
              BaZi has been refined for over a thousand years across Chinese imperial courts,
              merchant families, and Buddhist temples. It&apos;s not used to predict lottery
              numbers — it&apos;s used to <strong>understand patterns</strong>. Your strengths.
              Your blind spots. The kinds of years that will favor you and the kinds that will
              test you.
            </p>
            <p>
              Most people who see their chart for the first time say the same thing:{" "}
              <em>&ldquo;That&apos;s eerily me.&rdquo;</em> Try it above and see for yourself.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200/60 px-6 py-10 text-center text-sm text-stone-500">
        <p>fivebazi.com · Chinese Astrology, simplified.</p>
        <p className="mt-1 text-xs">
          Calculations powered by the lunar-typescript library · For educational purposes only.
        </p>
      </footer>
    </main>
  );
}
