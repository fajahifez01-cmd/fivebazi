import type { ElementSlug } from "./elements";

export type ZodiacSlug =
  | "rat" | "ox" | "tiger" | "rabbit" | "dragon" | "snake"
  | "horse" | "goat" | "monkey" | "rooster" | "dog" | "pig";

export interface ZodiacContent {
  slug: ZodiacSlug;
  name: string;
  chinese: string;
  pinyin: string;
  /** Fixed branch element (not the year-stem element) */
  element: ElementSlug;
  yinYang: "Yang" | "Yin";
  hours: string;
  season: string;
  shortDesc: string;
  oneLine: string;
  natureLines: string[];
  strengths: string[];
  watchouts: string[];
  bestMatches: ZodiacSlug[];
  challengingMatches: ZodiacSlug[];
  careerFits: string[];
}

const Z: ZodiacContent[] = [
  {
    slug: "rat", name: "Rat", chinese: "鼠", pinyin: "Shǔ",
    element: "water", yinYang: "Yang",
    hours: "11pm – 1am", season: "Mid-winter",
    shortDesc: "Quick, resourceful, sharp-eyed.",
    oneLine: "Sees the angle before the room does.",
    natureLines: [
      "Rats are first across the river in the legend — not the strongest, but the smartest about timing.",
      "They miss nothing. They remember every favor and every slight.",
      "Their charm is real, but it serves their ambitions.",
    ],
    strengths: ["Strategic minds", "Persuasive without being loud", "Excellent with money and timing"],
    watchouts: ["Can over-calculate relationships", "Risk of opportunism", "Anxiety when not in control"],
    bestMatches: ["dragon", "monkey", "ox"],
    challengingMatches: ["horse", "rabbit"],
    careerFits: ["Trader", "Strategist", "Researcher", "Founder"],
  },
  {
    slug: "ox", name: "Ox", chinese: "牛", pinyin: "Niú",
    element: "earth", yinYang: "Yin",
    hours: "1am – 3am", season: "Late winter",
    shortDesc: "Steady, principled, immovable when right.",
    oneLine: "Patient enough to outlast almost anything.",
    natureLines: [
      "Oxen pull the plow without drama. The harvest comes because they didn't stop.",
      "They speak less and decide more. When they commit, it's for years.",
      "Trust takes time to earn — and once given, almost impossible to lose.",
    ],
    strengths: ["Diligent", "Trustworthy", "Long-term builders"],
    watchouts: ["Stubbornness as a default", "Slow to change course when wrong", "Risk of overwork"],
    bestMatches: ["rat", "snake", "rooster"],
    challengingMatches: ["goat", "horse"],
    careerFits: ["Engineer", "Farmer", "Long-tenure leader", "Investor"],
  },
  {
    slug: "tiger", name: "Tiger", chinese: "虎", pinyin: "Hǔ",
    element: "wood", yinYang: "Yang",
    hours: "3am – 5am", season: "Early spring",
    shortDesc: "Brave, magnetic, hates being managed.",
    oneLine: "Leads from the front or not at all.",
    natureLines: [
      "Tigers walk into rooms and reset them.",
      "They are courageous, but the courage is moral as much as physical.",
      "They cannot do small. Even their failures are large.",
    ],
    strengths: ["Charismatic", "Brave", "Generous to those they trust"],
    watchouts: ["Ego clashes", "Burns through energy fast", "Impatient with bureaucracy"],
    bestMatches: ["horse", "dog", "pig"],
    challengingMatches: ["monkey", "snake"],
    careerFits: ["Entrepreneur", "Public figure", "Activist", "Performer"],
  },
  {
    slug: "rabbit", name: "Rabbit", chinese: "兔", pinyin: "Tù",
    element: "wood", yinYang: "Yin",
    hours: "5am – 7am", season: "Mid-spring",
    shortDesc: "Gentle, refined, deeply observant.",
    oneLine: "Reads the room better than the room reads itself.",
    natureLines: [
      "Rabbits move quietly and notice everything.",
      "They prefer harmony to confrontation — and often achieve outcomes through grace others cannot achieve through force.",
      "Their interiors are richer than their surfaces suggest.",
    ],
    strengths: ["Diplomatic", "Aesthetically gifted", "Emotionally intelligent"],
    watchouts: ["Conflict-averse to a fault", "Sensitive to harsh environments", "Risk of avoidance"],
    bestMatches: ["goat", "pig", "dog"],
    challengingMatches: ["rooster", "rat"],
    careerFits: ["Designer", "Diplomat", "Therapist", "Curator"],
  },
  {
    slug: "dragon", name: "Dragon", chinese: "龙", pinyin: "Lóng",
    element: "earth", yinYang: "Yang",
    hours: "7am – 9am", season: "Late spring",
    shortDesc: "Ambitious, charismatic, larger-than-life.",
    oneLine: "Born for visibility — fades when hidden.",
    natureLines: [
      "Dragons in Chinese culture are not destroyers but bringers of rain — auspicious, transformative.",
      "They expect a lot of themselves and others.",
      "Mediocrity is the one thing they cannot tolerate.",
    ],
    strengths: ["Visionary", "Confident", "Naturally lead"],
    watchouts: ["Arrogance when unchecked", "Boredom in small roles", "Hard to admit weakness"],
    bestMatches: ["rat", "monkey", "rooster"],
    challengingMatches: ["dog", "rabbit"],
    careerFits: ["CEO", "Politician", "Performer", "Visionary founder"],
  },
  {
    slug: "snake", name: "Snake", chinese: "蛇", pinyin: "Shé",
    element: "fire", yinYang: "Yin",
    hours: "9am – 11am", season: "Early summer",
    shortDesc: "Wise, magnetic, deeply private.",
    oneLine: "Says little, knows much.",
    natureLines: [
      "Snakes shed and renew. They look the same year after year — they are not.",
      "Their charm is hypnotic but selective.",
      "They hold convictions privately and act on them publicly.",
    ],
    strengths: ["Intuitive", "Elegant", "Strategic across long horizons"],
    watchouts: ["Trust issues", "Holding grudges", "Manipulation if shadow runs"],
    bestMatches: ["ox", "rooster", "monkey"],
    challengingMatches: ["pig", "tiger"],
    careerFits: ["Investor", "Analyst", "Diplomat", "Researcher"],
  },
  {
    slug: "horse", name: "Horse", chinese: "马", pinyin: "Mǎ",
    element: "fire", yinYang: "Yang",
    hours: "11am – 1pm", season: "Mid-summer",
    shortDesc: "Free-spirited, energetic, hates being caged.",
    oneLine: "Runs first, looks back later.",
    natureLines: [
      "Horses move. Standing still is the punishment.",
      "They are generous, social, and quick to form bonds.",
      "Their freedom is non-negotiable.",
    ],
    strengths: ["High energy", "Social", "Quick decisions"],
    watchouts: ["Restless", "Commitment-shy", "Risk of burnout"],
    bestMatches: ["tiger", "goat", "dog"],
    challengingMatches: ["rat", "ox"],
    careerFits: ["Sales", "Sports", "Founder", "Public-facing roles"],
  },
  {
    slug: "goat", name: "Goat", chinese: "羊", pinyin: "Yáng",
    element: "earth", yinYang: "Yin",
    hours: "1pm – 3pm", season: "Late summer",
    shortDesc: "Creative, kind, deeply feeling.",
    oneLine: "Softens the world wherever they go.",
    natureLines: [
      "Goats climb steep paths with quiet feet.",
      "They are artistic, devotional, attuned to subtle currents.",
      "They need beauty around them to thrive — not luxury, but care.",
    ],
    strengths: ["Creative", "Compassionate", "Loyal"],
    watchouts: ["Hard to harsh feedback", "Indecision under pressure", "Withdrawal when overwhelmed"],
    bestMatches: ["rabbit", "horse", "pig"],
    challengingMatches: ["ox", "dog"],
    careerFits: ["Artist", "Therapist", "Designer", "Writer"],
  },
  {
    slug: "monkey", name: "Monkey", chinese: "猴", pinyin: "Hóu",
    element: "metal", yinYang: "Yang",
    hours: "3pm – 5pm", season: "Early autumn",
    shortDesc: "Clever, playful, quick-witted.",
    oneLine: "Two steps ahead — sometimes too many.",
    natureLines: [
      "Monkeys solve problems while others are still defining them.",
      "Their humor is intelligence in motion.",
      "They get bored before others get started.",
    ],
    strengths: ["Quick learning", "Resourceful", "Adaptive"],
    watchouts: ["Restless attention", "Mischievous edge", "Overconfidence"],
    bestMatches: ["rat", "dragon", "snake"],
    challengingMatches: ["tiger", "pig"],
    careerFits: ["Inventor", "Comedian", "Engineer", "Trader"],
  },
  {
    slug: "rooster", name: "Rooster", chinese: "鸡", pinyin: "Jī",
    element: "metal", yinYang: "Yin",
    hours: "5pm – 7pm", season: "Mid-autumn",
    shortDesc: "Precise, honest, observant.",
    oneLine: "Calls things by their right name.",
    natureLines: [
      "Roosters announce the day. They do not soften the call.",
      "Their honesty can sting, but it is rarely wrong.",
      "They are devoted, particular, and unexpectedly tender with their inner circle.",
    ],
    strengths: ["Honest", "Detail-rigorous", "Excellent organizers"],
    watchouts: ["Bluntness", "Perfectionism", "Critical inner voice"],
    bestMatches: ["ox", "snake", "dragon"],
    challengingMatches: ["rabbit", "dog"],
    careerFits: ["Editor", "Auditor", "Operations", "Skilled craftsperson"],
  },
  {
    slug: "dog", name: "Dog", chinese: "狗", pinyin: "Gǒu",
    element: "earth", yinYang: "Yang",
    hours: "7pm – 9pm", season: "Late autumn",
    shortDesc: "Loyal, principled, protective.",
    oneLine: "Stands at the gate so others can sleep.",
    natureLines: [
      "Dogs are watchers. They feel right and wrong as a body sense.",
      "Their love is unconditional with people they choose, suspicious with everyone else.",
      "Justice runs in their veins.",
    ],
    strengths: ["Loyal", "Honest", "Brave for others"],
    watchouts: ["Anxiety when world feels unjust", "Pessimism", "Slow to forgive betrayal"],
    bestMatches: ["tiger", "horse", "rabbit"],
    challengingMatches: ["dragon", "goat"],
    careerFits: ["Lawyer", "Activist", "Doctor", "Security"],
  },
  {
    slug: "pig", name: "Pig", chinese: "猪", pinyin: "Zhū",
    element: "water", yinYang: "Yin",
    hours: "9pm – 11pm", season: "Early winter",
    shortDesc: "Generous, sincere, fond of pleasure.",
    oneLine: "Big-hearted; trusts first, edits later.",
    natureLines: [
      "Pigs in Chinese tradition signal prosperity — they enjoy what life offers without apology.",
      "They are kind by default. Cynicism feels foreign to them.",
      "Their generosity can leave them empty if they don't choose well.",
    ],
    strengths: ["Warm", "Sincere", "Resilient through hardship"],
    watchouts: ["Naive in business", "Indulgent under stress", "Slow to set limits"],
    bestMatches: ["rabbit", "goat", "tiger"],
    challengingMatches: ["snake", "monkey"],
    careerFits: ["Hospitality", "Counselor", "Chef", "Healer"],
  },
];

export const ZODIAC: Record<ZodiacSlug, ZodiacContent> = Object.fromEntries(
  Z.map((z) => [z.slug, z]),
) as Record<ZodiacSlug, ZodiacContent>;

export const ZODIAC_LIST: ZodiacContent[] = Z;
