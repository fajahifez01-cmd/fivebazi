import type { ArticleCategory, InternalLinkRef } from "./types";

export interface KeywordSeed {
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  primaryKeyword: string;
  category: ArticleCategory;
  briefForWriter: string;
  related: InternalLinkRef[];
}

export const KEYWORDS: KeywordSeed[] = [
  // Fundamentals — pillar / hub articles
  {
    slug: "what-is-bazi",
    title: "What Is BaZi? Beginner's Guide to Chinese Four Pillars Astrology",
    h1: "What Is BaZi? The Four Pillars of Destiny, Explained Simply",
    metaDescription:
      "BaZi (八字) is Chinese astrology built from your birth date and time. Learn what the Four Pillars are, how they're calculated, and what they reveal — in plain English.",
    primaryKeyword: "what is bazi",
    category: "fundamentals",
    briefForWriter:
      "Long-form beginner explainer. Define BaZi, explain the Four Pillars (year/month/day/hour), the Heavenly Stems and Earthly Branches, and how it differs from horoscope. Keep an honest, no-mysticism voice — BaZi describes patterns, it's not fortune-telling. End by inviting the reader to try the free calculator.",
    related: [
      { kind: "calculator", label: "Try the free BaZi calculator" },
      { kind: "article", slug: "how-to-read-a-bazi-chart" },
      { kind: "article", slug: "bazi-vs-western-astrology" },
      { kind: "article", slug: "what-is-day-master" },
    ],
  },
  {
    slug: "how-to-read-a-bazi-chart",
    title: "How to Read Your BaZi Chart for Beginners (Step-by-Step)",
    h1: "How to Read a BaZi Chart — A Beginner's Step-by-Step Guide",
    metaDescription:
      "A practical guide to reading a BaZi (Four Pillars) chart for the first time. Spot your Day Master, count the Five Elements, and read your pillars in order.",
    primaryKeyword: "how to read a bazi chart",
    category: "fundamentals",
    briefForWriter:
      "Step-by-step tutorial. Show the reader exactly what to look at first (Day Master), second (element distribution), third (the other three pillars), and fourth (clashes/combinations at a high level). Use a hypothetical example chart. Stay actionable.",
    related: [
      { kind: "calculator", label: "Generate your chart" },
      { kind: "article", slug: "what-is-day-master" },
      { kind: "article", slug: "five-elements-explained" },
      { kind: "article", slug: "strong-vs-weak-day-master" },
    ],
  },
  {
    slug: "bazi-vs-western-astrology",
    title: "BaZi vs Western Astrology: What's Actually Different",
    h1: "BaZi vs Western Astrology — What's Actually Different",
    metaDescription:
      "Both use your birth time. But BaZi and Western astrology answer different questions, use different math, and describe different layers of you. Side-by-side comparison.",
    primaryKeyword: "bazi vs western astrology",
    category: "fundamentals",
    briefForWriter:
      "Comparative explainer. Tabulate inputs (BaZi: solar→lunar date/time/location; Western: solar date/time/location). Compare outputs (Four Pillars + Five Elements vs Sun/Moon/Rising + planets in houses). Tell the reader which questions each is better at answering. Honest, not dismissive of either.",
    related: [
      { kind: "article", slug: "what-is-bazi" },
      { kind: "article", slug: "solar-vs-lunar-calendar-bazi" },
      { kind: "calculator" },
    ],
  },
  {
    slug: "solar-vs-lunar-calendar-bazi",
    title: "Why Your Chinese Zodiac Year Might Be Wrong (Solar vs Lunar)",
    h1: "Solar vs Lunar Calendar in BaZi — Why Your Zodiac Year May Be Off",
    metaDescription:
      "BaZi uses the solar calendar, not Lunar New Year. If you were born in Jan or early Feb, your true Chinese zodiac year may not be what you thought. Here's why.",
    primaryKeyword: "chinese zodiac year boundary",
    category: "fundamentals",
    briefForWriter:
      "Practical clarifier — many readers Google this exact question after they get a result that 'feels wrong'. Explain the solar term boundary (Lichun, around Feb 3-5), why BaZi uses it instead of Lunar New Year, and give 2-3 worked examples of borderline birthdays.",
    related: [
      { kind: "article", slug: "zodiac-year-boundary" },
      { kind: "article", slug: "what-is-bazi" },
      { kind: "zodiac", slug: "rat" },
      { kind: "calculator" },
    ],
  },
  {
    slug: "free-bazi-vs-paid-reading",
    title: "Free BaZi Calculator vs Paid Reading: What's Worth Paying For",
    h1: "Free BaZi Calculator vs Paid Reading — What's Actually Worth Paying For",
    metaDescription:
      "A free BaZi calculator gives you the chart and a basic reading. When does a paid reading add real value — and when is it just selling certainty? Honest breakdown.",
    primaryKeyword: "free bazi reading vs paid",
    category: "fundamentals",
    briefForWriter:
      "Honest buyer's-guide article. Free tools give you: pillars, day master, element distribution, generic interpretations. Paid readings can add: nuanced interaction analysis, life-stage timing (Luck Pillars/大运), face-to-face Q&A. Tell readers when paid is justified and when it's overkill.",
    related: [
      { kind: "calculator" },
      { kind: "article", slug: "what-is-bazi" },
      { kind: "article", slug: "how-to-read-a-bazi-chart" },
    ],
  },

  // Day Master deep-dives
  {
    slug: "what-is-day-master",
    title: "What Is the Day Master in BaZi? (And Why It Matters Most)",
    h1: "The Day Master — The Most Important Letter in Your BaZi Chart",
    metaDescription:
      "Your Day Master is the heavenly stem on your day pillar. It's the single character that represents you in your BaZi chart. Here's how to find it and what it means.",
    primaryKeyword: "what is day master bazi",
    category: "day-master",
    briefForWriter:
      "Definitional + practical. Define Day Master, show how to locate it in a chart, list all 10 (5 elements × yin/yang) at high level. End with 'click below to read the full profile of your Day Master'.",
    related: [
      { kind: "day-master", slug: "yang-wood-jia" },
      { kind: "day-master", slug: "yin-fire-ding" },
      { kind: "article", slug: "strong-vs-weak-day-master" },
      { kind: "calculator", label: "Find your Day Master" },
    ],
  },
  {
    slug: "yang-wood-day-master",
    title: "Yang Wood Day Master: Personality, Career, Love (Jiǎ 甲)",
    h1: "Yang Wood Day Master (Jiǎ 甲) — The Towering Tree",
    metaDescription:
      "If your Day Master is Yang Wood (Jiǎ 甲), you carry the energy of an old tree — vertical, principled, slow to bend. Read the full personality, career, and love profile.",
    primaryKeyword: "yang wood day master",
    category: "day-master",
    briefForWriter:
      "Deep-dive article on Yang Wood specifically. Pull from the existing day-master content but expand: career fits in detail (with examples), love compatibility patterns, common pitfalls, growth edges. End with link to the full Yang Wood page for the canonical short form.",
    related: [
      { kind: "day-master", slug: "yang-wood-jia", label: "Full Yang Wood profile" },
      { kind: "element", slug: "wood" },
      { kind: "article", slug: "strong-vs-weak-day-master" },
      { kind: "article", slug: "what-is-day-master" },
    ],
  },
  {
    slug: "yin-fire-day-master",
    title: "Yin Fire Day Master: The Quiet Spark (Dīng 丁)",
    h1: "Yin Fire Day Master (Dīng 丁) — The Quiet Spark",
    metaDescription:
      "Yin Fire (Dīng 丁) is the candle, not the bonfire. If your Day Master is Yin Fire, you guide quietly and warm one person at a time. Read the full profile.",
    primaryKeyword: "yin fire day master",
    category: "day-master",
    briefForWriter:
      "Deep-dive on Yin Fire. Contrast with Yang Fire (Bǐng) to give readers a vivid mental model. Career, love, growth, common misreadings ('I'm fire so I must be loud' — no).",
    related: [
      { kind: "day-master", slug: "yin-fire-ding", label: "Full Yin Fire profile" },
      { kind: "element", slug: "fire" },
      { kind: "article", slug: "what-is-day-master" },
      { kind: "article", slug: "too-much-fire-bazi" },
    ],
  },
  {
    slug: "strong-vs-weak-day-master",
    title: "Strong vs Weak Day Master in BaZi: How to Tell Without a Reader",
    h1: "Strong vs Weak Day Master — How to Tell, in Plain English",
    metaDescription:
      "Is your BaZi Day Master strong or weak? It's not about good vs bad — it's about whether your element is supported by the chart. Here's how to read it yourself.",
    primaryKeyword: "strong vs weak day master",
    category: "day-master",
    briefForWriter:
      "Practical how-to. Define strong/weak DM (it's about supports vs drains in the chart). Walk through the 4 factors (season/月令, root/根, support/相助, output/泄). Give 2 example charts. Crucially: explain why neither is 'better' — strong DM needs control, weak DM needs feeding.",
    related: [
      { kind: "article", slug: "day-master-element-balance" },
      { kind: "article", slug: "what-is-day-master" },
      { kind: "article", slug: "five-elements-explained" },
      { kind: "calculator" },
    ],
  },
  {
    slug: "day-master-element-balance",
    title: "Balancing Your Day Master With the Five Elements",
    h1: "Balancing Your Day Master With the Five Elements",
    metaDescription:
      "Your Day Master doesn't stand alone — it's surrounded by elements that feed, drain, or control it. Learn the four element relationships that decide whether your chart is in balance.",
    primaryKeyword: "day master five elements balance",
    category: "day-master",
    briefForWriter:
      "Bridge article between Day Master and Five Elements. Cover: which element generates the DM (feeds it), which is generated by it (drains it), which controls it (restricts), and which it controls (the DM's wealth). Use a worked example.",
    related: [
      { kind: "article", slug: "what-is-day-master" },
      { kind: "article", slug: "five-elements-explained" },
      { kind: "article", slug: "generative-controlling-cycle" },
      { kind: "calculator" },
    ],
  },

  // Five Elements
  {
    slug: "five-elements-explained",
    title: "The Five Elements (Wu Xing) in BaZi: A Simple Guide",
    h1: "The Five Elements (Wu Xing 五行) — A Simple Guide to BaZi's Foundation",
    metaDescription:
      "Wood, Fire, Earth, Metal, Water — the five forces behind every BaZi chart. Learn what each one means, what they look like in real life, and how they shape your reading.",
    primaryKeyword: "five elements bazi",
    category: "elements",
    briefForWriter:
      "Hub-style beginner explainer for the Five Elements. One short section per element with sensory imagery + one line for what each feels like in a person. End with the two cycles (generating + controlling) as a teaser and link to the dedicated cycle article.",
    related: [
      { kind: "element", slug: "wood" },
      { kind: "element", slug: "fire" },
      { kind: "element", slug: "earth" },
      { kind: "element", slug: "metal" },
      { kind: "element", slug: "water" },
      { kind: "article", slug: "generative-controlling-cycle" },
    ],
  },
  {
    slug: "too-much-fire-bazi",
    title: "Too Much Fire in Your BaZi: What It Really Means",
    h1: "Too Much Fire in Your BaZi — What It Really Means",
    metaDescription:
      "A fire-heavy BaZi chart isn't 'good' or 'bad' — it's a pattern. Learn what excess fire actually looks like in personality, career, health, and how to balance it.",
    primaryKeyword: "too much fire bazi",
    category: "elements",
    briefForWriter:
      "Practical reading of a common chart pattern. What 'too much fire' means in count (3+ of 8 stems/branches as fire), what the personality often looks like, common career and health themes, and which elements (water + earth) help re-balance. Avoid superstition framing.",
    related: [
      { kind: "element", slug: "fire" },
      { kind: "element", slug: "water" },
      { kind: "article", slug: "missing-element-bazi" },
      { kind: "article", slug: "generative-controlling-cycle" },
    ],
  },
  {
    slug: "missing-element-bazi",
    title: "Missing an Element in Your BaZi? Read This First",
    h1: "Missing an Element in Your BaZi — What It Means (and Doesn't)",
    metaDescription:
      "A missing element in your BaZi chart sounds dramatic but rarely is. Here's what it actually signifies, when it matters, and when it's perfectly fine.",
    primaryKeyword: "missing element in bazi",
    category: "elements",
    briefForWriter:
      "Reassuring but honest. Explain: missing ≠ broken. Sometimes a missing element means that domain (career/relationships/health) shows up differently — through Luck Pillars, location, or hidden stems. Tell readers the 3 scenarios where 'missing' actually matters and the 3 where it doesn't.",
    related: [
      { kind: "article", slug: "five-elements-explained" },
      { kind: "article", slug: "dominant-element-bazi" },
      { kind: "article", slug: "too-much-fire-bazi" },
      { kind: "calculator" },
    ],
  },
  {
    slug: "generative-controlling-cycle",
    title: "Generative & Controlling Cycles: How the Five Elements Talk",
    h1: "Generative & Controlling Cycles — How the Five Elements Talk to Each Other",
    metaDescription:
      "Wood feeds fire. Metal cuts wood. The two cycles of the Five Elements explain why your BaZi chart feels harmonious or jagged. Read both cycles in plain English.",
    primaryKeyword: "five elements generative controlling cycle",
    category: "elements",
    briefForWriter:
      "Core concept article. Diagram the two cycles in words (generating: wood→fire→earth→metal→water→wood; controlling: wood→earth, earth→water, water→fire, fire→metal, metal→wood). Give a real-life metaphor for each pair. End with a paragraph on why charts need both cycles working.",
    related: [
      { kind: "article", slug: "five-elements-explained" },
      { kind: "element", slug: "wood" },
      { kind: "element", slug: "metal" },
      { kind: "article", slug: "day-master-element-balance" },
    ],
  },
  {
    slug: "dominant-element-bazi",
    title: "How to Know Your Dominant Element From Your BaZi Chart",
    h1: "How to Know Your Dominant Element From Your BaZi Chart",
    metaDescription:
      "Your dominant element is the one that shapes how you move through the world. Here's a 3-step method to find it from your BaZi chart, no calculator needed.",
    primaryKeyword: "dominant element bazi",
    category: "elements",
    briefForWriter:
      "Hands-on method. Step 1: count visible stems + branches by element. Step 2: weight by position (month branch heaviest). Step 3: cross-check with Day Master. Walk through a sample chart.",
    related: [
      { kind: "calculator" },
      { kind: "article", slug: "five-elements-explained" },
      { kind: "article", slug: "strong-vs-weak-day-master" },
      { kind: "article", slug: "missing-element-bazi" },
    ],
  },

  // Zodiac & compatibility & life domains
  {
    slug: "chinese-zodiac-compatibility",
    title: "Chinese Zodiac Compatibility: The Real Chart (Not Pop Horoscopes)",
    h1: "Chinese Zodiac Compatibility — The Real Chart, Not the Pop Version",
    metaDescription:
      "Real Chinese zodiac compatibility comes from the Three Harmonies and Six Clashes — not generic 'rats love dragons' lists. Here's the full picture, properly explained.",
    primaryKeyword: "chinese zodiac compatibility",
    category: "zodiac",
    briefForWriter:
      "Authoritative compatibility article. Cover the Three Harmonies (三合) groups: Rat-Dragon-Monkey, Ox-Snake-Rooster, Tiger-Horse-Dog, Rabbit-Goat-Pig. Cover the Six Clashes (六冲): Rat-Horse, Ox-Goat, Tiger-Monkey, Rabbit-Rooster, Dragon-Dog, Snake-Pig. Note that real compatibility uses the whole chart, not just year animals.",
    related: [
      { kind: "zodiac", slug: "rat" },
      { kind: "zodiac", slug: "dragon" },
      { kind: "article", slug: "best-zodiac-matches" },
      { kind: "article", slug: "bazi-relationship-pillar" },
    ],
  },
  {
    slug: "best-zodiac-matches",
    title: "Most Compatible Chinese Zodiac Pairs (and Why)",
    h1: "The Most Compatible Chinese Zodiac Pairs — and Why They Work",
    metaDescription:
      "Some Chinese zodiac pairs really do work better than others. Here are the strongest matches in the Three Harmonies groups — and what makes each pair tick.",
    primaryKeyword: "best zodiac matches",
    category: "zodiac",
    briefForWriter:
      "Listicle-style but substantive. Pick 6-8 strongest pairings (one or two from each Three Harmonies group). For each: why this pair works in element terms + relationship vignette + watch-outs. Honest about pop-astrology limits.",
    related: [
      { kind: "article", slug: "chinese-zodiac-compatibility" },
      { kind: "zodiac", slug: "dragon" },
      { kind: "zodiac", slug: "monkey" },
      { kind: "article", slug: "bazi-relationship-pillar" },
    ],
  },
  {
    slug: "zodiac-year-boundary",
    title: "When Does a Chinese Zodiac Year Actually Start?",
    h1: "When Does a Chinese Zodiac Year Actually Start? (Hint: Not January 1)",
    metaDescription:
      "If your birthday is in January or early February, you may belong to a different Chinese zodiac than you thought. Here's the real start of each lunar year — and the solar one BaZi uses.",
    primaryKeyword: "when does chinese new year start zodiac",
    category: "zodiac",
    briefForWriter:
      "Common-question explainer. Cover both: Lunar New Year (variable, late Jan to mid-Feb) is what most people know, but BaZi uses Lichun (立春, around Feb 3-5, solar). Give a table or list of borderline years. Practical, search-intent driven.",
    related: [
      { kind: "article", slug: "solar-vs-lunar-calendar-bazi" },
      { kind: "article", slug: "chinese-zodiac-compatibility" },
      { kind: "zodiac", slug: "rat" },
      { kind: "calculator" },
    ],
  },
  {
    slug: "bazi-career-pillar",
    title: "BaZi for Career: Which of the Four Pillars Decides Your Work",
    h1: "BaZi for Career — Which of the Four Pillars Decides Your Work",
    metaDescription:
      "Each of the Four Pillars carries different career signals. The month pillar weighs heaviest. Here's how to read your chart for career fit, growth lanes, and timing.",
    primaryKeyword: "bazi for career",
    category: "fundamentals",
    briefForWriter:
      "Practical reading guide focused on career. Cover: month pillar (your environment and 'career season'), day pillar (your daily working style via DM), hour pillar (later-life direction, output channel). Briefly mention the 'wealth element' concept without going deep.",
    related: [
      { kind: "calculator", label: "Read your career pillars" },
      { kind: "article", slug: "what-is-day-master" },
      { kind: "article", slug: "dominant-element-bazi" },
      { kind: "article", slug: "how-to-read-a-bazi-chart" },
    ],
  },
  {
    slug: "bazi-relationship-pillar",
    title: "BaZi for Relationships: Matching the Four Pillars",
    h1: "BaZi for Relationships — Reading the Pillars That Matter Most",
    metaDescription:
      "Real compatibility in BaZi isn't just zodiac year. The day pillar matters most for marriage, with hour and month pillars adding texture. Here's the full reading method.",
    primaryKeyword: "bazi for relationships",
    category: "fundamentals",
    briefForWriter:
      "Counter the common 'just match the zodiac years' mistake. Cover: day pillar branch = spouse palace; comparing two charts means looking at DM interaction, element complementarity, and clash/combination relationships between pillars. Mature, non-fatalistic tone.",
    related: [
      { kind: "article", slug: "chinese-zodiac-compatibility" },
      { kind: "article", slug: "best-zodiac-matches" },
      { kind: "article", slug: "what-is-day-master" },
      { kind: "calculator" },
    ],
  },
];
