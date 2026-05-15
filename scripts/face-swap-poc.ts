/**
 * PoC: Seedream 4.0 multi-reference i2i for face-on-archetype compositing.
 *
 * Usage:
 *   bun run scripts/face-swap-poc.ts <face.jpg> <day-master-slug-gender>
 *   bun run scripts/face-swap-poc.ts /tmp/test-face.jpeg yang-wood-jia-male
 *
 * Output saved to ~/Desktop/face-swap-poc-<slug>.jpeg
 */

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { homedir } from "node:os";

const API_URL = "https://ark.cn-beijing.volces.com/api/v3/images/generations";
const MODEL = "doubao-seedream-4-0-250828";

const PROMPT =
  "参考图1是真人照片，参考图2是中国古风角色立绘。请生成一张全身立绘：保留参考图2中角色的服饰、配饰、武器、姿态、背景场景与中国古风工笔重彩画风完全不变；将参考图1的人物面部特征（五官、肤色、性别、发色）无缝融合到角色脸部，使其看起来就是参考图1中的真人扮演了这个角色。整体为典藏卡牌质感、全身正面构图。";

async function fileToDataUrl(path: string): Promise<string> {
  const bytes = await readFile(path);
  const ext = path.split(".").pop()?.toLowerCase() ?? "jpeg";
  const mime = ext === "png" ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

async function main() {
  const apiKey = process.env.ARK_API_KEY;
  if (!apiKey) {
    console.error("❌ Missing ARK_API_KEY");
    process.exit(1);
  }

  const [faceArg, slugArg] = process.argv.slice(2);
  if (!faceArg || !slugArg) {
    console.error("Usage: bun run scripts/face-swap-poc.ts <face.jpg> <slug-gender>");
    process.exit(1);
  }

  const portraitPath = join(
    import.meta.dir,
    "..",
    "public",
    "portraits",
    `${slugArg}.jpeg`,
  );

  console.log(`🎨 Face-swap PoC`);
  console.log(`   face:     ${faceArg}`);
  console.log(`   portrait: ${portraitPath}`);
  console.log(`   model:    ${MODEL}`);

  const faceDataUrl = await fileToDataUrl(faceArg);
  const portraitDataUrl = await fileToDataUrl(portraitPath);

  const body = {
    model: MODEL,
    prompt: PROMPT,
    image: [faceDataUrl, portraitDataUrl],
    size: "2K",
    response_format: "url",
    sequential_image_generation: "disabled",
    stream: false,
    watermark: false,
  };

  console.log(`   calling API…`);
  const t0 = Date.now();
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`❌ HTTP ${res.status}: ${text}`);
    process.exit(1);
  }

  const json = (await res.json()) as {
    data?: Array<{ url: string }>;
    usage?: { output_tokens?: number };
    error?: { code: string; message: string };
  };

  if (json.error) {
    console.error(`❌ API error: ${json.error.code} — ${json.error.message}`);
    process.exit(1);
  }

  const url = json.data?.[0]?.url;
  if (!url) {
    console.error("❌ No image URL in response:", JSON.stringify(json));
    process.exit(1);
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`   ✓ generated in ${elapsed}s (${json.usage?.output_tokens ?? 0} tokens)`);

  const imgRes = await fetch(url);
  if (!imgRes.ok) {
    console.error(`❌ Download failed: HTTP ${imgRes.status}`);
    process.exit(1);
  }
  const buf = Buffer.from(await imgRes.arrayBuffer());
  const outPath = join(homedir(), "Desktop", `face-swap-poc-${slugArg}.jpeg`);
  await writeFile(outPath, buf);

  console.log(`   ✓ saved → ${outPath} (${Math.round(buf.length / 1024)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
