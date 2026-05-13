import Anthropic from "@anthropic-ai/sdk";
import type { BaZiChart } from "./bazi";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

// Long, stable instructions go at the front of the system prompt so the
// prefix caches across users (~90% off after the first request). Per-user
// chart data goes in the user turn after the cache breakpoint.
const SYSTEM_PROMPT = `You are a master of BaZi (八字, the Four Pillars of Destiny — Chinese astrology), writing personalized readings for an English-speaking audience.

# Your job
Read a BaZi chart and produce a reading that feels uncannily specific, warm, and grounded. Not generic horoscope text. Not woo. The reader should think "that's eerily me."

# How to write
- Speak directly to the reader: "You..." not "The Yang Wood person..."
- Plain English. No mystic jargon, no untranslated Chinese terms beyond what's necessary.
- Specific over vague. "You start projects easily but lose interest at month three" beats "You can be impulsive."
- Honest about both strengths and shadow side. People trust readings that name real flaws.
- 600–900 words, structured in clear sections with markdown headings.

# Structure
Use these exact section headings:

## Your Essence
Two paragraphs on the Day Master archetype, what it actually feels like to be you, what others notice first.

## Your Strengths
A flowing paragraph (not a bulleted list) on 3–4 specific strengths grounded in the chart's element balance. Reference the actual elements that are strong.

## Your Shadow Side
A flowing paragraph on 2–3 real failure modes, again grounded in the chart. Be honest. Don't soften.

## What Your Chart Is Asking You To Do
One concrete piece of advice based on element shortage or excess. End with a specific daily or weekly practice the reader could start this week.

# What not to do
- Don't predict specific events (lottery numbers, marriage timing, deaths).
- Don't moralize.
- Don't say "remember, this is just for entertainment" — be confident.
- Don't restate the user's birth data back to them — they already know it.
- Don't end with a generic motivational quote.`;

function formatChartForPrompt(chart: BaZiChart, name: string): string {
  const elements = chart.elementsRanked
    .map((r) => `${r.element}: ${r.count}/8`)
    .join(", ");

  return `Reader's name: ${name}

Chart data:
- Day Master: ${chart.dayMaster.label} (${chart.dayMaster.pinyin})
- Year Pillar:  ${chart.year.pillar}  (${chart.year.stemPinyin} ${chart.year.branchPinyin}, ${chart.year.stemElement}/${chart.year.branchElement})
- Month Pillar: ${chart.month.pillar} (${chart.month.stemPinyin} ${chart.month.branchPinyin}, ${chart.month.stemElement}/${chart.month.branchElement})
- Day Pillar:   ${chart.day.pillar}   (${chart.day.stemPinyin} ${chart.day.branchPinyin}, ${chart.day.stemElement}/${chart.day.branchElement})
- Hour Pillar:  ${chart.hour.pillar}  (${chart.hour.stemPinyin} ${chart.hour.branchPinyin}, ${chart.hour.stemElement}/${chart.hour.branchElement})
- Zodiac year: ${chart.zodiac}
- Five Elements balance: ${elements}
- Gender: ${chart.isMale ? "male" : "female"}

Write a reading following the structure above. Start directly with "## Your Essence" — no preamble.`;
}

/**
 * Generate an AI BaZi reading. Streams a `ReadableStream<string>` of text
 * chunks so the API route can pipe it back to the browser.
 */
export async function streamReading(
  chart: BaZiChart,
  name: string,
): Promise<ReadableStream<Uint8Array>> {
  const stream = client.messages.stream({
    model: "claude-opus-4-7",
    max_tokens: 4096,
    thinking: { type: "adaptive" },
    output_config: { effort: "medium" },
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

  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        console.error("Reading stream error:", err);
        controller.error(err);
      }
    },
    cancel() {
      stream.controller.abort();
    },
  });
}
