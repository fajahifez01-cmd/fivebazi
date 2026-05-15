/**
 * PoC: generate a premium reading for a test chart and save the JSON to /tmp.
 * Usage:
 *   bun run scripts/premium-reading-poc.ts
 */

import { writeFile } from "node:fs/promises";
import { calculateBaZi } from "../lib/bazi";
import { generatePremiumReading, PREMIUM_DIMENSIONS } from "../lib/premiumReading";

async function main() {
  const chart = calculateBaZi({
    year: 1990,
    month: 5,
    day: 15,
    hour: 12,
    minute: 0,
    isMale: true,
  });

  console.log(`Day Master: ${chart.dayMaster.label}`);
  console.log(
    `Elements: ${chart.elementsRanked.map((r) => `${r.element}(${r.count})`).join(", ")}`,
  );
  console.log("Calling Claude Opus 4.7…");

  const t0 = Date.now();
  const reading = await generatePremiumReading(chart, "Harry");
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`✓ done in ${elapsed}s`);

  await writeFile(
    "/tmp/premium-reading-poc.json",
    JSON.stringify(reading, null, 2),
  );
  console.log("saved → /tmp/premium-reading-poc.json");

  console.log(`\nTagline:\n  ${reading.tagline}\n`);
  console.log("Scores:");
  for (const dim of PREMIUM_DIMENSIONS) {
    const bar = "█".repeat(Math.round(reading.scores[dim] / 5));
    console.log(`  ${dim.padEnd(8)} ${reading.scores[dim].toString().padStart(3)}  ${bar}`);
  }

  console.log("\nNarrative word counts:");
  for (const dim of PREMIUM_DIMENSIONS) {
    const words = reading.narratives[dim].trim().split(/\s+/).length;
    console.log(`  ${dim.padEnd(8)} ${words} words`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
