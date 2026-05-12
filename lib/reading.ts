import type { BaZiChart, Element } from "./bazi";

const DAY_MASTER_DESCRIPTIONS: Record<string, { archetype: string; traits: string }> = {
  "Yang Wood": {
    archetype: "The Towering Tree",
    traits: "rooted, ambitious, ethical, slow to bend; thrives with long-term goals and dislikes being micromanaged",
  },
  "Yin Wood": {
    archetype: "The Flexible Vine",
    traits: "adaptive, sociable, persuasive; navigates obstacles by working around them rather than through them",
  },
  "Yang Fire": {
    archetype: "The Bright Sun",
    traits: "radiant, generous, expressive; needs to be seen and to inspire others, can burn out if unchecked",
  },
  "Yin Fire": {
    archetype: "The Candle Flame",
    traits: "warm, sensitive, intuitive; precise and quiet but can illuminate exactly what others overlook",
  },
  "Yang Earth": {
    archetype: "The Mountain",
    traits: "stable, dependable, slow to change; people lean on you and you build foundations that last",
  },
  "Yin Earth": {
    archetype: "The Fertile Field",
    traits: "nurturing, modest, practical; quietly produces results and supports growth in others",
  },
  "Yang Metal": {
    archetype: "The Sword Blade",
    traits: "decisive, principled, direct; cuts through ambiguity and dislikes wasted effort",
  },
  "Yin Metal": {
    archetype: "The Jewel",
    traits: "refined, aesthetic, perceptive; values quality and detail, can be sensitive to criticism",
  },
  "Yang Water": {
    archetype: "The Ocean",
    traits: "deep, expansive, strategic; thinks long-term and is hard to pin down",
  },
  "Yin Water": {
    archetype: "The Stream",
    traits: "gentle, intuitive, persistent; finds the path of least resistance and reaches everywhere over time",
  },
};

const ELEMENT_SHORTAGE: Record<Element, string> = {
  Wood: "growth and new beginnings — your chart may resist taking the first step on long projects",
  Fire: "expression and visibility — your strengths may go unrecognized without intentional showing-up",
  Earth: "stability and grounding — you may feel scattered or unsupported when stress hits",
  Metal: "discipline and structure — you may struggle to finish what you start without external deadlines",
  Water: "wisdom and adaptability — you may push too hard rather than letting situations unfold",
};

const ELEMENT_EXCESS: Record<Element, string> = {
  Wood: "over-extension — you take on too many projects and burn through energy fast",
  Fire: "over-exposure — you spend yourself socially and emotionally before recharging",
  Earth: "over-attachment — you cling to stability and resist change even when it's needed",
  Metal: "over-rigidity — you hold standards so high that you and others struggle to meet them",
  Water: "over-thinking — you analyze instead of acting, and decisions get delayed",
};

export interface Reading {
  archetype: string;
  archetypeBlurb: string;
  shortage: { element: Element; gap: string } | null;
  excess: { element: Element; gap: string } | null;
  zodiacLine: string;
  cta: string;
}

export function generateReading(chart: BaZiChart): Reading {
  const key = `${chart.dayMaster.yinYang} ${chart.dayMaster.element}`;
  const dm = DAY_MASTER_DESCRIPTIONS[key];

  const ranked = chart.elementsRanked;
  const lowest = ranked[ranked.length - 1]!;
  const highest = ranked[0]!;

  const shortage =
    lowest.count <= 1
      ? { element: lowest.element, gap: ELEMENT_SHORTAGE[lowest.element] }
      : null;
  const excess =
    highest.count >= 4
      ? { element: highest.element, gap: ELEMENT_EXCESS[highest.element] }
      : null;

  return {
    archetype: dm?.archetype ?? "Your Pillar",
    archetypeBlurb: dm?.traits ?? "",
    shortage,
    excess,
    zodiacLine: `Born in the Year of the ${chart.zodiac}.`,
    cta: "Get a full 8,000-word reading covering wealth, career, relationships, and a 10-year forecast for $9.90.",
  };
}
