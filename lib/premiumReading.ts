import Anthropic from "@anthropic-ai/sdk";
import type { BaZiChart } from "./bazi";
import { DAY_MASTERS } from "./content/dayMasters";

const client = new Anthropic();

export const PREMIUM_DIMENSIONS = [
  "love",
  "career",
  "wealth",
  "health",
  "family",
  "soul",
] as const;

export type PremiumDimension = (typeof PREMIUM_DIMENSIONS)[number];

export const DIMENSION_META: Record<
  PremiumDimension,
  { label: string; brief: string }
> = {
  love: { label: "Love", brief: "romance, partnership, attraction" },
  career: { label: "Career", brief: "work, calling, achievement" },
  wealth: { label: "Wealth", brief: "money, prosperity, financial flow" },
  health: { label: "Health", brief: "vitality, body, longevity" },
  family: {
    label: "Family",
    brief: "family bonds, inner circle, those close to you",
  },
  soul: {
    label: "Soul",
    brief: "inner self, spiritual path, growth",
  },
};

export interface PremiumReading {
  scores: Record<PremiumDimension, number>;
  narratives: Record<PremiumDimension, string>;
  /** A 2-3 sentence overall framing line shown next to the radar. */
  tagline: string;
}

const SYSTEM_PROMPT = `You are a master BaZi (八字, Chinese Four Pillars) reader writing a premium personalized destiny report for an English-speaking adult audience.

You will receive one person's chart and you MUST return a single valid JSON object — no markdown fences, no preamble, no commentary, just JSON.

Schema:

{
  "tagline": string,                  // 2–3 sentence overall framing, ~40-60 words, sets the emotional tone of the report
  "scores": {
    "love":   number,                 // 0–100
    "career": number,
    "wealth": number,
    "health": number,
    "family": number,
    "soul":   number
  },
  "narratives": {
    "love":   string,                 // ~800-1000 English words
    "career": string,
    "wealth": string,
    "health": string,
    "family": string,
    "soul":   string
  }
}

# Scoring guidelines
- Base scores on the actual BaZi structure: Day Master strength, five-element balance, ten-god relations, branch combinations, dominant pillar.
- A typical chart averages 60-70. Strong areas hit 80-95. Weak areas land 30-55. Don't be afraid of low scores — honesty makes the report credible.
- Distribute realistically: most charts have 1–2 strong dimensions, 1–2 weak, the rest middle. Avoid making them all similar.

# Narrative format
Each narrative MUST start with a **bold one-sentence summary** wrapped in markdown bold like this:
**This is the summary sentence — it captures the whole dimension in one line for skimmers.**

After that summary, a blank line, then the full narrative. The summary is the headline; readers who don't want to read the full ~800 words should still walk away with the core insight from that bold line alone.

Example shape:
**Career is the room your chart was built to win, but only when you stop confusing it with your identity.**

Career is where your chart sings, Harry...

# Narrative guidelines
- Address the reader as "you", warm and direct like a wise older mentor — not corporate, not mystic.
- Each narrative stands alone (a reader who only opens "Wealth" should get full value).
- Reference specific chart elements (their Day Master, dominant element, a specific pillar) when explaining a score — that's what justifies the price.
- Honest about strengths AND shadow side; vague positive readings feel like a horoscope and lose trust.
- Give actionable observations, not just descriptions. End each narrative with one concrete this-week practice or reframe.
- 800-1000 words per dimension (NOT counting the bold summary). Don't pad. If you genuinely run out of specific things to say at 750, stop there.
- Plain English. If you must use a BaZi term (Day Master, Yang Wood, Snake-Year), anchor it briefly the first time, then use it freely.
- No "this is just for entertainment" disclaimers. Be confident.
- No predictions of specific dates / lottery numbers / death dates.

# Tagline guidelines
- 2–3 sentences, ~40–60 words.
- Captures the central tension or signature of the chart.
- Example feel: "You're forged from fire on a mountain of earth — bright, grounded, and stubborner than you let on. The chart loads you for visibility and tests you on patience. The story of your life is learning when to burn and when to bank the coals."

Output the JSON object only. No \`\`\`, no commentary.`;

function formatChartForPrompt(chart: BaZiChart, name: string): string {
  const elements = chart.elementsRanked
    .map((r) => `${r.element}: ${r.count}/8`)
    .join(", ");
  const dm = DAY_MASTERS[chart.dayMaster.slug];

  return `Reader: ${name}

Chart data:
- Day Master: ${chart.dayMaster.label} (${chart.dayMaster.pinyin}) — ${dm.archetype}
- Year Pillar:  ${chart.year.pillar}  (${chart.year.stemYinYang} ${chart.year.stemElement}/${chart.year.branchElement}, ${chart.year.animal})
- Month Pillar: ${chart.month.pillar} (${chart.month.stemYinYang} ${chart.month.stemElement}/${chart.month.branchElement}, ${chart.month.animal})
- Day Pillar:   ${chart.day.pillar}   (${chart.day.stemYinYang} ${chart.day.stemElement}/${chart.day.branchElement}, ${chart.day.animal})
- Hour Pillar:  ${chart.hour.pillar}  (${chart.hour.stemYinYang} ${chart.hour.stemElement}/${chart.hour.branchElement}, ${chart.hour.animal})
- Five Elements balance: ${elements}
- Gender: ${chart.isMale ? "male" : "female"}

Day Master tradition note:
${dm.oneLine}
${dm.natureLines.join(" ")}

Now produce the premium reading JSON.`;
}

export async function generatePremiumReading(
  chart: BaZiChart,
  name: string,
): Promise<PremiumReading> {
  // Streaming is required for max_tokens this large; we collect the final
  // message at the end and parse the JSON body out of the assistant turn.
  const stream = client.messages.stream({
    model: "claude-opus-4-7",
    max_tokens: 32000,
    thinking: { type: "adaptive" },
    output_config: { effort: "high" },
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      { role: "user", content: formatChartForPrompt(chart, name) },
    ],
  });

  const final = await stream.finalMessage();

  const textBlock = final.content.find((c) => c.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Claude returned no text content");
  }

  // Defensive: strip any accidental code fences.
  let raw = textBlock.text.trim();
  if (raw.startsWith("```")) {
    raw = raw.replace(/^```(?:json)?\s*/, "").replace(/```\s*$/, "");
  }

  const parsed = JSON.parse(raw) as PremiumReading;
  return parsed;
}
