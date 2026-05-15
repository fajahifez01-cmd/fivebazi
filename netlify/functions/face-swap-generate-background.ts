/**
 * Netlify Background Function — long-running face-swap worker.
 *
 * Trigger: POST /.netlify/functions/face-swap-generate-background
 *   body: { jobId: string }
 *
 * Returns 202 immediately to the caller, then runs up to 15 min in the
 * background. Writes status + result URL back into the "face-swap-jobs"
 * Netlify Blobs store, where the /api/face-swap/status/:jobId route
 * reads it.
 */

import { getStore } from "@netlify/blobs";

const API_URL = "https://ark.cn-beijing.volces.com/api/v3/images/generations";
const MODEL = "doubao-seedream-4-5-251128";

const PROMPT = `以参考图1中的真人为主体,完全保留其脸部、头发、五官、肤色、性别(脸部识别度100%,就是参考图1中的这个人)。将其重新装扮成参考图2中角色的服饰、配饰、武器,采用参考图2中的姿态,背景换为参考图2中的场景。整体画风为中国古风工笔重彩,典藏卡牌质感,全身正面构图。注意:必须是参考图1中真人的脸,只换装和换背景,不要修改脸部。`;

interface JobRecord {
  status: "pending" | "processing" | "done" | "error";
  photoDataUrl?: string;
  daySlug?: string;
  gender?: "male" | "female";
  origin?: string;
  imageUrl?: string;
  message?: string;
  createdAt?: number;
  updatedAt?: number;
}

export default async (req: Request) => {
  const { jobId } = (await req.json()) as { jobId: string };
  if (!jobId) {
    return new Response("Missing jobId", { status: 400 });
  }

  const store = getStore("face-swap-jobs");

  async function fail(message: string) {
    await store.setJSON(jobId, {
      status: "error",
      message,
      updatedAt: Date.now(),
    } satisfies JobRecord);
  }

  try {
    const job = (await store.get(jobId, { type: "json" })) as JobRecord | null;
    if (!job) {
      return new Response("Job not found", { status: 404 });
    }
    if (!job.photoDataUrl || !job.daySlug || !job.gender || !job.origin) {
      await fail("Job missing required fields");
      return new Response("", { status: 500 });
    }

    // Transition pending → processing.
    await store.setJSON(jobId, {
      ...job,
      status: "processing",
      updatedAt: Date.now(),
    } satisfies JobRecord);

    // Fetch the day-master portrait template from /public/portraits/.
    const portraitRes = await fetch(
      `${job.origin}/portraits/${job.daySlug}-${job.gender}.jpeg`,
    );
    if (!portraitRes.ok) {
      await fail(`Portrait not found: ${job.daySlug}-${job.gender}`);
      return new Response("", { status: 500 });
    }
    const portraitBytes = await portraitRes.arrayBuffer();
    const portraitDataUrl = `data:image/jpeg;base64,${Buffer.from(portraitBytes).toString("base64")}`;

    const apiKey = process.env.ARK_API_KEY;
    if (!apiKey) {
      await fail("Server missing ARK_API_KEY");
      return new Response("", { status: 500 });
    }

    const seedreamRes = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        prompt: PROMPT,
        image: [job.photoDataUrl, portraitDataUrl],
        size: "2K",
        response_format: "url",
        stream: false,
        watermark: false,
      }),
    });

    if (!seedreamRes.ok) {
      const text = await seedreamRes.text();
      await fail(`Image API HTTP ${seedreamRes.status}: ${text.slice(0, 200)}`);
      return new Response("", { status: 500 });
    }

    const data = (await seedreamRes.json()) as {
      data?: Array<{ url: string }>;
      error?: { message: string };
    };

    if (data.error) {
      await fail(data.error.message);
      return new Response("", { status: 500 });
    }

    const imageUrl = data.data?.[0]?.url;
    if (!imageUrl) {
      await fail("No image URL in response");
      return new Response("", { status: 500 });
    }

    await store.setJSON(jobId, {
      status: "done",
      imageUrl,
      daySlug: job.daySlug,
      gender: job.gender,
      updatedAt: Date.now(),
    } satisfies JobRecord);

    return new Response("", { status: 200 });
  } catch (err) {
    await fail(err instanceof Error ? err.message : "Unknown error");
    return new Response("", { status: 500 });
  }
};
