import type { NextRequest } from "next/server";

/**
 * Face-swap streaming endpoint.
 *
 * Seedream 4.5 takes ~40s. Netlify's sync function timeout is 10–26s, but
 * **streaming** responses can run up to 15min (Lambda response streaming).
 * So we open a stream, send heartbeats every 4s while we wait for the model,
 * then send the final result as the last chunk and close.
 *
 * Wire format: one JSON object per line (NDJSON), each terminated by "\n".
 *   { "type": "progress", "elapsed": 12 }
 *   { "type": "done", "imageUrl": "https://..." }
 *   { "type": "error", "message": "..." }
 */

export const maxDuration = 60;
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_URL = "https://ark.cn-beijing.volces.com/api/v3/images/generations";
const MODEL = "doubao-seedream-4-5-251128";

const PROMPT = `以参考图1中的真人为主体,完全保留其脸部、头发、五官、肤色、性别(脸部识别度100%,就是参考图1中的这个人)。将其重新装扮成参考图2中角色的服饰、配饰、武器,采用参考图2中的姿态,背景换为参考图2中的场景。整体画风为中国古风工笔重彩,典藏卡牌质感,全身正面构图。注意:必须是参考图1中真人的脸,只换装和换背景,不要修改脸部。`;

interface RequestBody {
  photoDataUrl: string;
  daySlug: string;
  gender: "male" | "female";
}

interface SeedreamResponse {
  data?: Array<{ url: string }>;
  error?: { code: string; message: string };
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ARK_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Server missing ARK_API_KEY" }, { status: 500 });
  }

  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { photoDataUrl, daySlug, gender } = body;
  if (!photoDataUrl || !daySlug || !gender) {
    return Response.json(
      { error: "Missing photoDataUrl, daySlug, or gender" },
      { status: 400 },
    );
  }
  if (!photoDataUrl.startsWith("data:image/")) {
    return Response.json({ error: "Photo must be a data URL" }, { status: 400 });
  }

  const portraitUrl = `${req.nextUrl.origin}/portraits/${daySlug}-${gender}.jpeg`;
  const portraitRes = await fetch(portraitUrl);
  if (!portraitRes.ok) {
    return Response.json(
      { error: `Portrait not found: ${daySlug}-${gender}` },
      { status: 404 },
    );
  }
  const portraitBytes = await portraitRes.arrayBuffer();
  const portraitDataUrl = `data:image/jpeg;base64,${Buffer.from(portraitBytes).toString("base64")}`;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const write = (obj: unknown) =>
        controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));

      const t0 = Date.now();
      let alive = true;
      const heartbeat = setInterval(() => {
        if (!alive) return;
        write({ type: "progress", elapsed: Math.round((Date.now() - t0) / 1000) });
      }, 4000);

      try {
        const seedreamRes = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: MODEL,
            prompt: PROMPT,
            image: [photoDataUrl, portraitDataUrl],
            size: "2K",
            response_format: "url",
            stream: false,
            watermark: false,
          }),
        });

        if (!seedreamRes.ok) {
          const text = await seedreamRes.text();
          write({
            type: "error",
            message: `Image API error: HTTP ${seedreamRes.status} ${text.slice(0, 200)}`,
          });
        } else {
          const json = (await seedreamRes.json()) as SeedreamResponse;
          if (json.error) {
            write({ type: "error", message: json.error.message });
          } else {
            const imageUrl = json.data?.[0]?.url;
            if (!imageUrl) {
              write({ type: "error", message: "No image URL in response" });
            } else {
              write({ type: "done", imageUrl });
            }
          }
        }
      } catch (err) {
        write({
          type: "error",
          message: err instanceof Error ? err.message : "Generation failed",
        });
      } finally {
        alive = false;
        clearInterval(heartbeat);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
