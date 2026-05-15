/**
 * Batch-generate /learn articles using the Anthropic API.
 *
 * Usage:
 *   bun run scripts/generate-articles.ts                  # generate all keywords missing from entries/
 *   bun run scripts/generate-articles.ts what-is-bazi     # generate just one
 *   bun run scripts/generate-articles.ts --force          # regenerate every keyword (overwrites)
 *
 * Writes each article to lib/content/articles/entries/<slug>.ts and rewrites
 * the generated-import block in lib/content/articles/index.ts.
 */
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "node:fs";
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const REPO_ROOT = path.resolve(path.dirname(__filename), "..");

// Bun does not auto-load .env.local from non-ASCII paths reliably; do it ourselves.
function loadDotenv(file: string): void {
  try {
    const content = readFileSync(file, "utf8");
    let loaded = 0;
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
        loaded++;
      }
    }
    if (process.env.DEBUG_ENV) console.error(`[dotenv] loaded ${loaded} vars from ${file}`);
  } catch (err) {
    console.error(`[dotenv] could not read ${file}: ${(err as Error).message}`);
  }
}
loadDotenv(path.join(REPO_ROOT, ".env.local"));
loadDotenv(path.join(REPO_ROOT, ".env"));

import { KEYWORDS, type KeywordSeed } from "../lib/content/articles/_keywords";
import type { Article } from "../lib/content/articles/types";

const ENTRIES_DIR = path.join(REPO_ROOT, "lib/content/articles/entries");
const INDEX_FILE = path.join(REPO_ROOT, "lib/content/articles/index.ts");
const MODEL = "claude-sonnet-4-6";

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY missing — set it in .env.local or the environment");
}

const client = new Anthropic();

const SYSTEM_PROMPT = `You are an SEO copywriter for fivebazi.com — a free, English-language Chinese astrology calculator. You write long-form guides that explain BaZi (Four Pillars of Destiny, 八字) in plain English.

Voice & rules:
- Honest, grounded, no mysticism. BaZi describes patterns; it does not predict the future or sell certainty.
- Concrete over abstract. Use sensory imagery, real-life scenarios, specific careers/situations rather than vague phrases.
- 8th-grade readability. Avoid jargon, or if you must, define it on first appearance.
- Speak to "you" or in third person. Never address the reader by name.
- Always cite Chinese terms with pinyin once on first appearance (e.g., "Day Master (rì zhǔ 日主)"), then drop them.
- No filler. No "In this article we will explore..." No "It is important to note..." Start with substance.
- Total length: roughly 1300-1700 words across intro + sections + FAQs combined.
- Each section paragraph: 60-130 words.
- FAQ section: 4-6 questions, each with a 60-110 word answer.
- Only use the internal links pre-curated for you — do not invent new slugs.

Output: a single valid JSON object that matches the Article schema. Output ONLY the JSON — no preamble, no markdown fences, no commentary, no trailing text.`;

interface RawArticle extends Omit<Article, "publishedAt" | "readingMinutes"> {}

function stripJsonFences(raw: string): string {
  let s = raw.trim();
  if (s.startsWith("```")) {
    s = s.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/, "").trim();
  }
  return s;
}

function countWords(article: RawArticle): number {
  const text = [
    article.tldr,
    ...article.intro,
    ...article.sections.flatMap((s) => s.paragraphs),
    ...article.sections.flatMap((s) => s.list?.items ?? []),
    ...article.faqs.flatMap((f) => [f.q, f.a]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

async function loadReferenceMaterial(): Promise<string> {
  const files = [
    "lib/content/articles/types.ts",
    "lib/content/zodiac.ts",
    "lib/content/elements.ts",
    "lib/content/dayMasters.ts",
  ];
  const blobs = await Promise.all(
    files.map(async (f) => `// ===== ${f} =====\n${await readFile(path.join(REPO_ROOT, f), "utf8")}`),
  );
  return blobs.join("\n\n");
}

async function generateArticle(seed: KeywordSeed, referenceMaterial: string): Promise<Article> {
  const userPrompt = `Write the article for this keyword. Output ONLY the JSON object that satisfies the Article TypeScript interface (shown in the reference material). Do not include publishedAt or readingMinutes — the build script fills those.

Inputs you must copy verbatim into the output:
  slug:              ${seed.slug}
  title:             ${seed.title}
  h1:                ${seed.h1}
  metaDescription:   ${seed.metaDescription}
  primaryKeyword:    ${seed.primaryKeyword}
  category:          ${seed.category}

Writer brief:
  ${seed.briefForWriter}

Pre-curated internal links — copy this array into the "related" field exactly as given:
${JSON.stringify(seed.related, null, 2)}

Now write the article. Remember: ONLY the JSON object, nothing else.`;

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    system: [
      { type: "text", text: SYSTEM_PROMPT },
      {
        type: "text",
        text: `Reference material — existing site content and Article schema:\n\n${referenceMaterial}`,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: userPrompt }],
  });

  const block = response.content.find((b) => b.type === "text");
  if (!block || block.type !== "text") throw new Error("No text content in response");

  const raw = stripJsonFences(block.text);
  let parsed: RawArticle;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(`JSON parse failed for ${seed.slug}: ${(err as Error).message}\n--- raw start ---\n${raw.slice(0, 600)}\n--- raw end ---`);
  }

  // Enforce that the model kept our pre-curated links
  parsed.related = seed.related;
  parsed.slug = seed.slug;
  parsed.title = seed.title;
  parsed.h1 = seed.h1;
  parsed.metaDescription = seed.metaDescription;
  parsed.primaryKeyword = seed.primaryKeyword;
  parsed.category = seed.category;

  const wordCount = countWords(parsed);
  const readingMinutes = Math.max(3, Math.round(wordCount / 220));
  const publishedAt = new Date().toISOString().slice(0, 10);

  return { ...parsed, publishedAt, readingMinutes } as Article;
}

function articleToTsFile(article: Article): string {
  const lit = JSON.stringify(article, null, 2);
  return `// Generated by scripts/generate-articles.ts — do not edit by hand.\nimport type { Article } from "../types";\n\nexport const article: Article = ${lit};\n`;
}

async function rewriteIndexBlock(slugs: string[]): Promise<void> {
  const content = await readFile(INDEX_FILE, "utf8");
  const importLines = slugs
    .map((s, i) => `import { article as a${i} } from "./entries/${s}";`)
    .join("\n");
  const arrayItems = slugs.length ? slugs.map((_, i) => `a${i}`).join(", ") : "";
  const newBlock = `// === BEGIN_GENERATED_IMPORTS ===
// (Generated by scripts/generate-articles.ts — do not edit by hand.)
${importLines}
const GENERATED_ARTICLES: Article[] = [${arrayItems}];
// === END_GENERATED_IMPORTS ===`;
  const updated = content.replace(
    /\/\/ === BEGIN_GENERATED_IMPORTS ===[\s\S]*?\/\/ === END_GENERATED_IMPORTS ===/,
    newBlock,
  );
  if (updated === content) throw new Error("Failed to find generated-imports block in index.ts");
  await writeFile(INDEX_FILE, updated, "utf8");
}

async function main(): Promise<void> {
  await mkdir(ENTRIES_DIR, { recursive: true });

  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const targetSlugs = args.filter((a) => !a.startsWith("--"));

  const existing = (await readdir(ENTRIES_DIR).catch(() => []))
    .filter((f) => f.endsWith(".ts"))
    .map((f) => f.replace(/\.ts$/, ""));
  const existingSet = new Set(existing);

  let queue: KeywordSeed[];
  if (targetSlugs.length) {
    queue = KEYWORDS.filter((k) => targetSlugs.includes(k.slug));
  } else if (force) {
    queue = KEYWORDS;
  } else {
    queue = KEYWORDS.filter((k) => !existingSet.has(k.slug));
  }

  console.log(`Generating ${queue.length} article(s) with ${MODEL}…`);
  if (queue.length === 0) {
    console.log("Nothing to do (all entries exist; use --force to regenerate).");
  }

  const referenceMaterial = await loadReferenceMaterial();
  const written: string[] = [];
  const failed: { slug: string; error: string }[] = [];

  for (const seed of queue) {
    const t0 = Date.now();
    process.stdout.write(`  → ${seed.slug.padEnd(40)} `);
    try {
      const article = await generateArticle(seed, referenceMaterial);
      await writeFile(path.join(ENTRIES_DIR, `${seed.slug}.ts`), articleToTsFile(article), "utf8");
      written.push(seed.slug);
      existingSet.add(seed.slug);
      const ms = Date.now() - t0;
      const wc = countWords(article);
      console.log(`✓ ${wc} words, ${article.readingMinutes}min, ${(ms / 1000).toFixed(1)}s`);
    } catch (err) {
      const msg = (err as Error).message;
      console.log(`✗ ${msg.slice(0, 80)}`);
      failed.push({ slug: seed.slug, error: msg });
    }
  }

  // Rewrite the generated-imports block to include every slug currently on disk,
  // ordered by KEYWORDS array for deterministic output.
  const indexSlugs = KEYWORDS.map((k) => k.slug).filter((s) => existingSet.has(s));
  await rewriteIndexBlock(indexSlugs);

  console.log(`\nDone. Wrote ${written.length}; index now references ${indexSlugs.length} article(s).`);
  if (failed.length) {
    console.log(`\nFailures (${failed.length}):`);
    for (const f of failed) console.log(`  ${f.slug}: ${f.error.slice(0, 200)}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
