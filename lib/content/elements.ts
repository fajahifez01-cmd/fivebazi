export type ElementSlug = "wood" | "fire" | "earth" | "metal" | "water";

export interface ElementContent {
  slug: ElementSlug;
  name: string;
  chinese: string;
  pinyin: string;
  season: string;
  direction: string;
  organ: string;
  emotion: string;
  color: string;
  generates: ElementSlug;
  controls: ElementSlug;
  controlledBy: ElementSlug;
  generatedBy: ElementSlug;
  shortDesc: string;
  archetype: string;
  natureLines: string[];
  whenStrong: string[];
  whenWeak: string[];
  careerFits: string[];
  relationshipNote: string;
  balancingTip: string;
}

export const ELEMENTS: Record<ElementSlug, ElementContent> = {
  wood: {
    slug: "wood",
    name: "Wood",
    chinese: "木",
    pinyin: "Mù",
    season: "Spring",
    direction: "East",
    organ: "Liver & Gallbladder",
    emotion: "Anger when blocked · Vision when free",
    color: "Green",
    generates: "fire",
    controls: "earth",
    controlledBy: "metal",
    generatedBy: "water",
    shortDesc: "Growth, vision, beginnings. The seed that becomes a forest.",
    archetype: "The Pioneer",
    natureLines: [
      "Wood is the energy of expansion — upward, outward, toward light.",
      "It is the moment a seed cracks open. The first idea before structure. The visionary scaffolding everything else stands on.",
      "Where Wood is strong, things grow. Where it is absent, momentum stalls.",
    ],
    whenStrong: [
      "You start things easily — projects, friendships, conversations.",
      "You're drawn to long-horizon goals and resist short-term thinking.",
      "Strong moral compass. You stand for what you believe in, even socially expensive ones.",
      "You may push too hard, too fast — Wood unchecked becomes brittle.",
    ],
    whenWeak: [
      "Hard to start. Even worthwhile projects sit untouched.",
      "Decision fatigue. Vision feels foggy.",
      "You lean on others' frameworks rather than building your own.",
      "Counter: surround yourself with Water-element environments (lakes, deep reading, reflection).",
    ],
    careerFits: [
      "Founder, entrepreneur, designer",
      "Educator, mentor, coach",
      "Architect, urban planner, landscape designer",
      "Researcher, social scientist, lawyer",
    ],
    relationshipNote:
      "Wood loves Water (it feeds them) and is steadied by Metal (which prunes overgrowth). Wood-Wood pairings can build mountains together but burn out fast if neither rests.",
    balancingTip:
      "If your chart is heavy in Wood, add Metal influences (structure, deadlines, precise habits). If Wood is scarce, sit near water and read more biographies of people who built things over decades.",
  },
  fire: {
    slug: "fire",
    name: "Fire",
    chinese: "火",
    pinyin: "Huǒ",
    season: "Summer",
    direction: "South",
    organ: "Heart & Small Intestine",
    emotion: "Joy when balanced · Anxiety when scattered",
    color: "Red",
    generates: "earth",
    controls: "metal",
    controlledBy: "water",
    generatedBy: "wood",
    shortDesc: "Expression, passion, visibility. The light that warms the world.",
    archetype: "The Beacon",
    natureLines: [
      "Fire is the energy of full expression — the noon sun, the open laugh, the kept promise.",
      "It illuminates, but it also reveals. Fire cannot lie — it shows what is there.",
      "Where Fire is present, people gather. Where it is missing, rooms feel cold.",
    ],
    whenStrong: [
      "Natural communicator, performer, persuader.",
      "Magnetic in groups. Strangers tell you their stories.",
      "Optimistic to a fault — you sometimes outrun the facts.",
      "Burnout risk is real. Fire without fuel consumes itself.",
    ],
    whenWeak: [
      "Hard to be seen. You shrink in groups.",
      "Joy feels far away even when life is objectively fine.",
      "You over-edit before you speak. The fresh thought goes unsaid.",
      "Counter: Wood feeds Fire — long walks in nature, vision-setting practices, time with optimistic friends.",
    ],
    careerFits: [
      "Performer, public speaker, host, salesperson",
      "Marketing, branding, creative director",
      "Therapist (when balanced), pastor, motivational coach",
      "Journalist, broadcaster, video creator",
    ],
    relationshipNote:
      "Fire pairs beautifully with Wood (the partner who keeps believing in your visions) and is calmed by Water (the friend who slows you down before you scorch yourself).",
    balancingTip:
      "Too much Fire burns out — schedule daily quiet, sit by water, sleep more. Too little Fire dims — speak before you over-think, perform something weekly, wear warm colors.",
  },
  earth: {
    slug: "earth",
    name: "Earth",
    chinese: "土",
    pinyin: "Tǔ",
    season: "Late Summer (transitional)",
    direction: "Center",
    organ: "Spleen & Stomach",
    emotion: "Care when grounded · Worry when stretched",
    color: "Yellow / Ochre",
    generates: "metal",
    controls: "water",
    controlledBy: "wood",
    generatedBy: "fire",
    shortDesc: "Stability, nurture, foundations. The ground that holds everything.",
    archetype: "The Caretaker",
    natureLines: [
      "Earth is the pause between movements — the moment between seasons when everything settles.",
      "It is the friend who shows up with food when you're sick. The team member nobody can replace.",
      "Earth doesn't need to be seen. It just needs everyone else to be safe.",
    ],
    whenStrong: [
      "You're the glue. Group chats, families, teams rely on you.",
      "Reliable, slow to anger, hard to surprise.",
      "Risk: you absorb others' problems until your own go unsaid.",
      "Earth too strong can become stuck — change feels physically uncomfortable.",
    ],
    whenWeak: [
      "Feels ungrounded. Anxious without a clear source.",
      "You skip meals, forget routine, lose sleep over decisions.",
      "You give up commitments under social pressure even when they matter to you.",
      "Counter: regular meals at regular times, walks barefoot on grass, one daily practice you never skip.",
    ],
    careerFits: [
      "Healthcare, nursing, caregiving, hospice",
      "Real estate, property management, agriculture",
      "Operations, project management, customer success",
      "Counselor, social worker, HR",
    ],
    relationshipNote:
      "Earth thrives with Fire (who reminds Earth it deserves warmth back) and is supported by Metal (who helps Earth set boundaries). Earth-Earth pairings are deeply stable but can stagnate.",
    balancingTip:
      "Too much Earth — introduce movement (travel, new music, intentional risk). Too little Earth — eat at the same time daily, sit on the floor more, find one ritual you keep no matter what.",
  },
  metal: {
    slug: "metal",
    name: "Metal",
    chinese: "金",
    pinyin: "Jīn",
    season: "Autumn",
    direction: "West",
    organ: "Lungs & Large Intestine",
    emotion: "Reverence when whole · Grief when cut off",
    color: "White / Silver / Gold",
    generates: "water",
    controls: "wood",
    controlledBy: "fire",
    generatedBy: "earth",
    shortDesc: "Precision, discipline, refinement. The blade that cuts cleanly.",
    archetype: "The Editor",
    natureLines: [
      "Metal is the energy of refinement — turning ore into form, distillate into spirit.",
      "It is the moment of letting go. The pruned branch. The clean line.",
      "Where Metal is sharp, standards are high. Where it is dull, things accumulate.",
    ],
    whenStrong: [
      "Discerning taste. You know quality when you see it, and it shows in your work.",
      "Decisive — you cut quickly when something isn't right.",
      "You may seem cold or critical to others. Your standards are higher than most can hold.",
      "Risk: rigidity. Metal too hard breaks.",
    ],
    whenWeak: [
      "Hard to finish. Edits become endless.",
      "You hold onto relationships, possessions, and ideas past their season.",
      "Grief feels stuck — old losses surface without warning.",
      "Counter: Earth nourishes Metal — daily quiet, organized spaces, breath work, sorting one drawer at a time.",
    ],
    careerFits: [
      "Editor, lawyer, judge, auditor",
      "Surgeon, dentist, jeweler, watchmaker",
      "Investor, analyst, quality assurance",
      "Critic, curator, brand director",
    ],
    relationshipNote:
      "Metal is steadied by Earth (who gives Metal a reason for its precision) and softened by Fire (who reminds Metal that warmth is also true). Metal-Metal pairings can be coldly beautiful but slow to warm.",
    balancingTip:
      "Too much Metal — schedule warmth (laughter, hugs, red wine with friends). Too little Metal — set one weekly deadline and miss nothing on it, organize one drawer fully every Sunday.",
  },
  water: {
    slug: "water",
    name: "Water",
    chinese: "水",
    pinyin: "Shuǐ",
    season: "Winter",
    direction: "North",
    organ: "Kidney & Bladder",
    emotion: "Wisdom when deep · Fear when frozen",
    color: "Black / Deep Blue",
    generates: "wood",
    controls: "fire",
    controlledBy: "earth",
    generatedBy: "metal",
    shortDesc: "Wisdom, flow, intuition. The river that finds every path.",
    archetype: "The Sage",
    natureLines: [
      "Water is the energy of depth and adaptability.",
      "It does not push — it finds the path that already exists, or wears one over time.",
      "Where Water is plentiful, wisdom accumulates. Where it is missing, decisions get rushed.",
    ],
    whenStrong: [
      "Intuitive — you sense what's coming before others do.",
      "Comfortable with not-knowing. You sit in questions until answers ripen.",
      "Excellent in chaos. You don't panic; you watch.",
      "Risk: passivity. Water too still becomes stagnant.",
    ],
    whenWeak: [
      "Anxious decisions. You react before sensing.",
      "Trouble sleeping. Trouble truly resting.",
      "You don't trust your own gut, so you over-research instead.",
      "Counter: Metal generates Water — clean spaces, slow mornings, one weekly silence ritual.",
    ],
    careerFits: [
      "Strategist, researcher, scientist, philosopher",
      "Therapist, counselor, mediator",
      "Writer, novelist, poet",
      "Investor (long-horizon), diplomat",
    ],
    relationshipNote:
      "Water pairs well with Wood (who turns Water's depth into vision) and is contained by Earth (who gives Water a riverbed). Water-Water pairings can be profoundly intuitive but may drift apart unless one element grounds them.",
    balancingTip:
      "Too much Water — add structure (Earth): same wake time, same wind-down, three priorities a day. Too little Water — bathe more, read deeper, walk near rivers, sleep an extra hour.",
  },
};

export const ELEMENT_LIST: ElementContent[] = [
  ELEMENTS.wood,
  ELEMENTS.fire,
  ELEMENTS.earth,
  ELEMENTS.metal,
  ELEMENTS.water,
];
