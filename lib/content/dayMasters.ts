import type { ElementSlug } from "./elements";

export type DayMasterSlug =
  | "yang-wood-jia" | "yin-wood-yi"
  | "yang-fire-bing" | "yin-fire-ding"
  | "yang-earth-wu" | "yin-earth-ji"
  | "yang-metal-geng" | "yin-metal-xin"
  | "yang-water-ren" | "yin-water-gui";

export interface DayMasterContent {
  slug: DayMasterSlug;
  stem: string;
  stemPinyin: string;
  yinYang: "Yang" | "Yin";
  element: ElementSlug;
  label: string;
  archetype: string;
  metaphor: string;
  oneLine: string;
  natureLines: string[];
  strengths: string[];
  shadowSide: string[];
  careerFit: string;
  loveStyle: string;
  growthEdge: string;
  pairsWell: DayMasterSlug[];
}

const DM: DayMasterContent[] = [
  {
    slug: "yang-wood-jia",
    stem: "甲", stemPinyin: "Jiǎ",
    yinYang: "Yang", element: "wood",
    label: "Yang Wood Jiǎ",
    archetype: "The Towering Tree",
    metaphor: "Old oak in an open field",
    oneLine: "Rooted, principled, slow to bend — built to outlast.",
    natureLines: [
      "Yang Wood is the energy of the great tree — vertical, ambitious, ethical.",
      "You don't move sideways well. You move up, or you stand still.",
      "When others fold, you stay. When the wind blows, you sway but don't break.",
    ],
    strengths: [
      "Long-horizon vision — you plan in decades, not quarters.",
      "Moral backbone. People come to you for advice that holds.",
      "Project leadership feels natural — you frame the future and others follow.",
    ],
    shadowSide: [
      "Stubbornness. Once rooted, hard to relocate.",
      "Pride in being un-bendable can become brittleness.",
      "You struggle with collaboration when partners don't share your standards.",
    ],
    careerFit:
      "Founder, judge, surgeon, architect, senior educator — roles where authority and patience compound.",
    loveStyle:
      "Slow to commit, deeply loyal once you do. You need a partner who respects your roots and doesn't try to transplant you.",
    growthEdge:
      "Bend. Practice changing your mind in public. Befriend Yin Wood — they'll show you how to navigate around obstacles instead of through them.",
    pairsWell: ["yin-wood-yi", "yang-metal-geng", "yang-water-ren"],
  },
  {
    slug: "yin-wood-yi",
    stem: "乙", stemPinyin: "Yǐ",
    yinYang: "Yin", element: "wood",
    label: "Yin Wood Yǐ",
    archetype: "The Flexible Vine",
    metaphor: "Climbing wisteria",
    oneLine: "Adaptive, sociable, persuasive — bends with circumstance, never breaks.",
    natureLines: [
      "Yin Wood is the energy of the vine — it finds the structure and uses it.",
      "You navigate obstacles by going around, not through.",
      "Charm is your power. Networks are your home.",
    ],
    strengths: [
      "Read rooms instantly. You know who matters before they speak.",
      "Persuasive without being pushy. You build coalitions naturally.",
      "Resilient — set you back and you regrow from any cutting.",
    ],
    shadowSide: [
      "You may over-rely on others for structure.",
      "Conflict-averse — hard things go unsaid until they rot.",
      "Identity can drift toward whoever you spend time with.",
    ],
    careerFit:
      "Diplomat, agent, fundraiser, executive coach, salesperson, community builder.",
    loveStyle:
      "Warm, accommodating, deeply attentive. Be careful not to disappear into the partner — your own shape matters.",
    growthEdge:
      "Practice direct speech. Choose one stance you'll defend regardless of the room. Yang Wood is your steadying friend.",
    pairsWell: ["yang-wood-jia", "yang-metal-geng", "yin-water-gui"],
  },
  {
    slug: "yang-fire-bing",
    stem: "丙", stemPinyin: "Bǐng",
    yinYang: "Yang", element: "fire",
    label: "Yang Fire Bǐng",
    archetype: "The Bright Sun",
    metaphor: "Noon sun over open water",
    oneLine: "Radiant, generous, expressive — you cannot help but illuminate.",
    natureLines: [
      "Yang Fire is the sun itself: undeniable, indispensable, sometimes overbearing.",
      "You don't try to be the center — you are it.",
      "Generosity flows naturally; you give warmth before you check the cost.",
    ],
    strengths: [
      "Magnetic in groups. People do their best work in your light.",
      "Optimism is contagious. You raise floors of rooms.",
      "Direct, transparent, hard to manipulate — what you see is what's there.",
    ],
    shadowSide: [
      "You can scorch. Strong opinions delivered hot.",
      "Need for visibility — silence feels like exile.",
      "Burnout if not refueled. The sun cannot set without consequence.",
    ],
    careerFit:
      "Public speaker, founder-CEO, performer, pastor, teacher, brand spokesperson.",
    loveStyle:
      "Whole-hearted, openly loving, expects the same in return. You wither in cold relationships and bloom in warm ones.",
    growthEdge:
      "Practice setting. Step out of the center one day a week. Cultivate Yin Water friends — they'll teach you the value of depth.",
    pairsWell: ["yin-fire-ding", "yang-metal-geng", "yin-water-gui"],
  },
  {
    slug: "yin-fire-ding",
    stem: "丁", stemPinyin: "Dīng",
    yinYang: "Yin", element: "fire",
    label: "Yin Fire Dīng",
    archetype: "The Candle Flame",
    metaphor: "Single candle in a quiet room",
    oneLine: "Warm, intuitive, focused — you illuminate exactly what others miss.",
    natureLines: [
      "Yin Fire is the candle, the hearth, the lamp at the writing desk.",
      "You don't fill rooms — you fill people, one at a time.",
      "Your warmth is selective and that is its power.",
    ],
    strengths: [
      "Empathy is calibrated — you see the person, not the role.",
      "Detail-aware. Small things you notice change other people's days.",
      "Creative in long, quiet sessions. You make beautiful things alone.",
    ],
    shadowSide: [
      "Easily blown out. Stressful environments dim you.",
      "Self-doubt cycles when not seen by people who actually see you.",
      "Boundary leaks — you give light to drainers if no one stops you.",
    ],
    careerFit:
      "Writer, designer, therapist, illustrator, sommelier, niche craftsperson, intimate-format performer.",
    loveStyle:
      "Deep, devoted, slow to ignite and slower to burn out. You need a partner who treasures privacy as much as warmth.",
    growthEdge:
      "Defend your peace. Practice saying no without explanation. Yang Wood friends will help you keep fuel coming.",
    pairsWell: ["yang-fire-bing", "yang-wood-jia", "yin-earth-ji"],
  },
  {
    slug: "yang-earth-wu",
    stem: "戊", stemPinyin: "Wù",
    yinYang: "Yang", element: "earth",
    label: "Yang Earth Wù",
    archetype: "The Mountain",
    metaphor: "A mountain that everyone navigates by",
    oneLine: "Stable, dependable, slow to change — others orient by your steadiness.",
    natureLines: [
      "Yang Earth is the mountain — old, unmovable, full of resources for those who climb.",
      "You don't react to weather. You ARE the weather sometimes — but the slow kind.",
      "People trust you with secrets, money, and futures.",
    ],
    strengths: [
      "Trustworthiness is your superpower. Decades-long relationships.",
      "Crisis-calm. Others panic; you organize.",
      "Wealth-builder — patience compounds for you in ways it doesn't for fast types.",
    ],
    shadowSide: [
      "Slow to start. New things feel uncomfortable for a long time.",
      "You may dismiss legitimate signals because you can absorb almost any blow.",
      "Stubborn — once you decide, you rarely revisit.",
    ],
    careerFit:
      "CFO, real estate, family office, agriculture, infrastructure, long-tenure operations.",
    loveStyle:
      "Quiet, durable, deeply protective. Your love language is showing up, not saying it.",
    growthEdge:
      "Embrace one new thing each quarter. Yin Water friends help you flow when you're stuck.",
    pairsWell: ["yin-earth-ji", "yin-water-gui", "yang-fire-bing"],
  },
  {
    slug: "yin-earth-ji",
    stem: "己", stemPinyin: "Jǐ",
    yinYang: "Yin", element: "earth",
    label: "Yin Earth Jǐ",
    archetype: "The Fertile Field",
    metaphor: "Farmland in summer — humble and life-giving",
    oneLine: "Nurturing, modest, practical — quietly produces results others depend on.",
    natureLines: [
      "Yin Earth is the soil — humble, generative, the medium through which everything grows.",
      "You support quietly. Your accomplishments often live in other people's resumes.",
      "Receptivity is your strength — you absorb, ferment, and return things wiser.",
    ],
    strengths: [
      "Approachable — people open up around you without quite knowing why.",
      "Service-orientation done right: you give without keeping score.",
      "Wisdom-by-accumulation — by 40 you've seen every pattern.",
    ],
    shadowSide: [
      "Boundary-thin. Others' problems become yours.",
      "Self-effacing to your own cost — your needs go last.",
      "Worry — when ungrounded, you spiral.",
    ],
    careerFit:
      "Nurse, social worker, primary-care doctor, chef, gardener, community organizer.",
    loveStyle:
      "Devoted, patient, deeply caring. You bloom with a partner who notices and reciprocates.",
    growthEdge:
      "Write your own needs down before asking what others want. Yang Wood friends will give you the spine to ask out loud.",
    pairsWell: ["yang-earth-wu", "yang-wood-jia", "yin-fire-ding"],
  },
  {
    slug: "yang-metal-geng",
    stem: "庚", stemPinyin: "Gēng",
    yinYang: "Yang", element: "metal",
    label: "Yang Metal Gēng",
    archetype: "The Sword Blade",
    metaphor: "A sword sharpened on a whetstone",
    oneLine: "Decisive, principled, direct — cuts cleanly when others negotiate.",
    natureLines: [
      "Yang Metal is the blade — purposeful, hard, made for cutting through.",
      "You don't suffer ambiguity. You ask the question others avoid.",
      "Loyalty is binary with you: in or out, no middle.",
    ],
    strengths: [
      "Decisive under pressure. Others freeze; you cut.",
      "Integrity-led — bribery, flattery, social pressure roll off you.",
      "Drive. You finish what you start, and finish hard.",
    ],
    shadowSide: [
      "Bluntness others read as cruelty.",
      "Rigidity — once you decide, revisiting feels weak.",
      "Sword without sheath cuts the wielder too — burnout, isolation.",
    ],
    careerFit:
      "Military, law enforcement, surgeon, prosecutor, audit, investigative journalism, special-ops operator.",
    loveStyle:
      "Fierce, protective, loyal beyond reason. You need a partner who can hold their ground in your fire.",
    growthEdge:
      "Soften the delivery, not the substance. Yin Fire friends teach you that warmth is also true.",
    pairsWell: ["yin-metal-xin", "yang-wood-jia", "yin-fire-ding"],
  },
  {
    slug: "yin-metal-xin",
    stem: "辛", stemPinyin: "Xīn",
    yinYang: "Yin", element: "metal",
    label: "Yin Metal Xīn",
    archetype: "The Jewel",
    metaphor: "Polished gold against silk",
    oneLine: "Refined, perceptive, aesthetic — values quality over quantity.",
    natureLines: [
      "Yin Metal is the jewel — precious, exact, valuable in proportion to its quietness.",
      "You see craft where others see object. You notice small things that change the story.",
      "Standards are your love language.",
    ],
    strengths: [
      "Taste — beauty, quality, design come naturally to you.",
      "Discerning judgment. Others bring you decisions to validate.",
      "Elegant communication — fewer words, more weight.",
    ],
    shadowSide: [
      "Sensitive to criticism — what others shrug off, you carry for days.",
      "Perfectionism — paralyzed by inadequate options.",
      "Coldness when wounded.",
    ],
    careerFit:
      "Curator, jeweler, art director, perfumer, editor, brand creative, watchmaker.",
    loveStyle:
      "Selective, devoted to a few. You don't fall for many, but when you do, it's permanent.",
    growthEdge:
      "Show your warmth in public. Yin Earth friends remind you that imperfection is also a kind of beauty.",
    pairsWell: ["yang-metal-geng", "yin-earth-ji", "yang-water-ren"],
  },
  {
    slug: "yang-water-ren",
    stem: "壬", stemPinyin: "Rén",
    yinYang: "Yang", element: "water",
    label: "Yang Water Rén",
    archetype: "The Ocean",
    metaphor: "Open sea — vast, deep, hard to read",
    oneLine: "Strategic, expansive, hard to pin down — thinks in tides, not days.",
    natureLines: [
      "Yang Water is the ocean — moving, deep, multi-layered.",
      "You think in long arcs. You wait while others rush.",
      "Most people only see the surface. Few are invited deeper.",
    ],
    strengths: [
      "Strategic mind — you map out futures others can't see.",
      "Cool under chaos. The bigger the storm, the calmer you get.",
      "Influential — you move things subtly, often without taking credit.",
    ],
    shadowSide: [
      "Inaccessible. Friends complain they don't know you.",
      "Avoidance — you can drift past confrontations that needed naming.",
      "Indecision when stakes are personal.",
    ],
    careerFit:
      "Strategist, hedge-fund manager, diplomat, philosopher, novelist, geopolitical analyst.",
    loveStyle:
      "Deep, mysterious, slow-revealing. You need a partner with the patience to swim down to where you actually live.",
    growthEdge:
      "Show your inner shoreline more often. Yang Earth friends give you riverbanks; Yang Fire friends warm the surface.",
    pairsWell: ["yin-water-gui", "yang-earth-wu", "yang-fire-bing"],
  },
  {
    slug: "yin-water-gui",
    stem: "癸", stemPinyin: "Guǐ",
    yinYang: "Yin", element: "water",
    label: "Yin Water Guǐ",
    archetype: "The Stream",
    metaphor: "Mountain stream — gentle, persistent, finds every path",
    oneLine: "Gentle, intuitive, persistent — reaches everywhere over time.",
    natureLines: [
      "Yin Water is the stream — soft, patient, undeniable across years.",
      "You don't push. You persist.",
      "What others achieve in confrontations, you achieve by being present until conditions change.",
    ],
    strengths: [
      "Intuition is your compass — usually right, hard to explain.",
      "Healer instinct. People sit beside you and feel better.",
      "You absorb shock without breaking, then process it later in private.",
    ],
    shadowSide: [
      "Conflict-averse — you sidestep when directness was needed.",
      "Mood-permeable — you absorb the moods around you.",
      "Self-doubt — you over-trust intuition's whispers AND second-guess them.",
    ],
    careerFit:
      "Therapist, acupuncturist, poet, slow-craft maker, mediator, contemplative researcher.",
    loveStyle:
      "Tender, attentive, deeply emotional. You need a partner who can sit in feelings with you without rushing the surface.",
    growthEdge:
      "Direct asks. Yang Wood friends help you go up instead of around.",
    pairsWell: ["yang-water-ren", "yin-wood-yi", "yang-earth-wu"],
  },
];

export const DAY_MASTERS: Record<DayMasterSlug, DayMasterContent> = Object.fromEntries(
  DM.map((d) => [d.slug, d]),
) as Record<DayMasterSlug, DayMasterContent>;

export const DAY_MASTER_LIST: DayMasterContent[] = DM;
