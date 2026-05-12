import { Solar } from "lunar-typescript";

const STEM_ELEMENT: Record<string, "Wood" | "Fire" | "Earth" | "Metal" | "Water"> = {
  甲: "Wood", 乙: "Wood",
  丙: "Fire", 丁: "Fire",
  戊: "Earth", 己: "Earth",
  庚: "Metal", 辛: "Metal",
  壬: "Water", 癸: "Water",
};

const BRANCH_ELEMENT: Record<string, "Wood" | "Fire" | "Earth" | "Metal" | "Water"> = {
  寅: "Wood", 卯: "Wood",
  巳: "Fire", 午: "Fire",
  辰: "Earth", 戌: "Earth", 丑: "Earth", 未: "Earth",
  申: "Metal", 酉: "Metal",
  子: "Water", 亥: "Water",
};

const STEM_YIN_YANG: Record<string, "Yang" | "Yin"> = {
  甲: "Yang", 丙: "Yang", 戊: "Yang", 庚: "Yang", 壬: "Yang",
  乙: "Yin", 丁: "Yin", 己: "Yin", 辛: "Yin", 癸: "Yin",
};

const STEM_PINYIN: Record<string, string> = {
  甲: "Jiǎ", 乙: "Yǐ", 丙: "Bǐng", 丁: "Dīng", 戊: "Wù",
  己: "Jǐ", 庚: "Gēng", 辛: "Xīn", 壬: "Rén", 癸: "Guǐ",
};

const BRANCH_PINYIN: Record<string, string> = {
  子: "Zǐ", 丑: "Chǒu", 寅: "Yín", 卯: "Mǎo",
  辰: "Chén", 巳: "Sì", 午: "Wǔ", 未: "Wèi",
  申: "Shēn", 酉: "Yǒu", 戌: "Xū", 亥: "Hài",
};

const BRANCH_ANIMAL: Record<string, string> = {
  子: "Rat", 丑: "Ox", 寅: "Tiger", 卯: "Rabbit",
  辰: "Dragon", 巳: "Snake", 午: "Horse", 未: "Goat",
  申: "Monkey", 酉: "Rooster", 戌: "Dog", 亥: "Pig",
};

export type Element = "Wood" | "Fire" | "Earth" | "Metal" | "Water";

export interface Pillar {
  pillar: string;
  stem: string;
  branch: string;
  stemPinyin: string;
  branchPinyin: string;
  stemElement: Element;
  branchElement: Element;
  stemYinYang: "Yang" | "Yin";
  animal: string;
}

export interface BaZiChart {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
  dayMaster: {
    stem: string;
    pinyin: string;
    element: Element;
    yinYang: "Yang" | "Yin";
    /** e.g. "Yang Wood Jiǎ" */
    label: string;
  };
  elementCounts: Record<Element, number>;
  /** Sorted descending — useful for quick UI listing. */
  elementsRanked: { element: Element; count: number }[];
  zodiac: string;
  birth: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };
  isMale: boolean;
}

function parsePillar(text: string): Pillar {
  const stem = text[0]!;
  const branch = text[1]!;
  return {
    pillar: text,
    stem,
    branch,
    stemPinyin: STEM_PINYIN[stem]!,
    branchPinyin: BRANCH_PINYIN[branch]!,
    stemElement: STEM_ELEMENT[stem]!,
    branchElement: BRANCH_ELEMENT[branch]!,
    stemYinYang: STEM_YIN_YANG[stem]!,
    animal: BRANCH_ANIMAL[branch]!,
  };
}

export function calculateBaZi(input: {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  isMale: boolean;
}): BaZiChart {
  const solar = Solar.fromYmdHms(
    input.year,
    input.month,
    input.day,
    input.hour,
    input.minute,
    0,
  );
  const lunar = solar.getLunar();
  const [y, m, d, h] = lunar.getBaZi();

  const year = parsePillar(y);
  const month = parsePillar(m);
  const day = parsePillar(d);
  const hour = parsePillar(h);

  const counts: Record<Element, number> = {
    Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0,
  };
  for (const p of [year, month, day, hour]) {
    counts[p.stemElement] += 1;
    counts[p.branchElement] += 1;
  }

  const elementsRanked = (Object.entries(counts) as [Element, number][])
    .map(([element, count]) => ({ element, count }))
    .sort((a, b) => b.count - a.count);

  return {
    year, month, day, hour,
    dayMaster: {
      stem: day.stem,
      pinyin: day.stemPinyin,
      element: day.stemElement,
      yinYang: day.stemYinYang,
      label: `${day.stemYinYang} ${day.stemElement} ${day.stemPinyin}`,
    },
    elementCounts: counts,
    elementsRanked,
    zodiac: year.animal,
    birth: { ...input },
    isMale: input.isMale,
  };
}
