/**
 * Generate Day Master archetype portraits via Volcengine Ark (Seedream 5.0-lite).
 *
 * Usage:
 *   bun run scripts/generate-portraits.ts                  # generate all 10
 *   bun run scripts/generate-portraits.ts yang-water-ren   # one at a time
 *   bun run scripts/generate-portraits.ts --force          # overwrite existing
 *
 * Requires ARK_API_KEY and ARK_ENDPOINT_ID in .env.local.
 * Saves to /public/portraits/<slug>.jpeg.
 */

import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { PORTRAIT_PROMPTS } from "../lib/portraitPrompts";
import type { DayMasterSlug } from "../lib/content/dayMasters";

const API_URL = "https://ark.cn-beijing.volces.com/api/v3/images/generations";
const OUTPUT_DIR = join(import.meta.dir, "..", "public", "portraits");

interface SeedreamResponse {
  model?: string;
  created?: number;
  data?: Array<{ url: string; size: string }>;
  usage?: { generated_images: number; output_tokens: number; total_tokens: number };
  error?: { code: string; message: string };
}

async function generateOne(
  slug: DayMasterSlug,
  prompt: string,
  apiKey: string,
  endpointId: string,
): Promise<void> {
  console.log(`\n🎨 [${slug}]`);
  console.log(`   prompt: ${prompt.slice(0, 60)}…`);

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: endpointId,
      prompt,
      sequential_image_generation: "disabled",
      response_format: "url",
      size: "2K",
      stream: false,
      watermark: false,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  const json = (await res.json()) as SeedreamResponse;

  if (json.error) {
    throw new Error(`API error: ${json.error.code} — ${json.error.message}`);
  }

  const url = json.data?.[0]?.url;
  if (!url) {
    throw new Error("No image URL in response");
  }

  console.log(`   ↓ downloading…`);
  const imgRes = await fetch(url);
  if (!imgRes.ok) {
    throw new Error(`download failed: HTTP ${imgRes.status}`);
  }

  const buf = Buffer.from(await imgRes.arrayBuffer());
  const outPath = join(OUTPUT_DIR, `${slug}.jpeg`);
  await writeFile(outPath, buf);

  const tokens = json.usage?.output_tokens ?? 0;
  console.log(`   ✓ saved → ${outPath} (${Math.round(buf.length / 1024)} KB, ${tokens} tokens)`);
}

async function main() {
  const apiKey = process.env.ARK_API_KEY;
  const endpointId = process.env.ARK_ENDPOINT_ID;
  if (!apiKey || !endpointId) {
    console.error(
      "❌ Missing ARK_API_KEY or ARK_ENDPOINT_ID env vars (check .env.local).",
    );
    process.exit(1);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  const argv = process.argv.slice(2);
  const force = argv.includes("--force");
  const explicitSlugs = argv.filter((a) => !a.startsWith("--"));

  const allSlugs = Object.keys(PORTRAIT_PROMPTS) as DayMasterSlug[];
  const slugs = explicitSlugs.length > 0 ? (explicitSlugs as DayMasterSlug[]) : allSlugs;

  console.log(`\n🚀 Generating ${slugs.length} portrait(s)`);
  if (!force) {
    console.log(`   (skipping existing — pass --force to overwrite)`);
  }

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const slug of slugs) {
    const prompt = PORTRAIT_PROMPTS[slug];
    if (!prompt) {
      console.error(`\n⚠️  Unknown slug: ${slug}`);
      failed++;
      continue;
    }

    const outPath = join(OUTPUT_DIR, `${slug}.jpeg`);
    if (existsSync(outPath) && !force) {
      console.log(`\n⏭  [${slug}] already exists, skipping (use --force to overwrite)`);
      skipped++;
      continue;
    }

    try {
      await generateOne(slug, prompt, apiKey, endpointId);
      ok++;
    } catch (err) {
      console.error(`\n❌ [${slug}] failed:`, err instanceof Error ? err.message : err);
      failed++;
    }

    // be polite to the API — 1s between calls
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log(`\n📊 Done — ${ok} generated, ${skipped} skipped, ${failed} failed`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
