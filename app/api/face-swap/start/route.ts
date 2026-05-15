/**
 * Kick off a face-swap job.
 *   POST /api/face-swap/start
 *   body: { photoDataUrl, daySlug, gender }
 *   → { jobId }
 *
 * Writes initial state to Netlify Blobs, then triggers the background
 * function. Client polls /api/face-swap/status/[jobId] for completion.
 */

import { getStore } from "@netlify/blobs";
import type { NextRequest } from "next/server";
import { randomUUID } from "node:crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface RequestBody {
  photoDataUrl: string;
  daySlug: string;
  gender: "male" | "female";
}

export async function POST(req: NextRequest) {
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
  if (photoDataUrl.length > 12 * 1024 * 1024) {
    // ~9 MB raw image; reject obvious abuse
    return Response.json({ error: "Photo too large" }, { status: 413 });
  }

  const jobId = randomUUID();
  const store = getStore("face-swap-jobs");

  await store.setJSON(jobId, {
    status: "pending",
    photoDataUrl,
    daySlug,
    gender,
    origin: req.nextUrl.origin,
    createdAt: Date.now(),
  });

  // Trigger the background worker. Netlify returns 202 immediately; the
  // worker keeps running for up to 15 min after this fetch resolves.
  try {
    const triggerRes = await fetch(
      `${req.nextUrl.origin}/.netlify/functions/face-swap-generate-background`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      },
    );
    if (triggerRes.status !== 202 && !triggerRes.ok) {
      await store.setJSON(jobId, {
        status: "error",
        message: `Failed to start generation (HTTP ${triggerRes.status})`,
        updatedAt: Date.now(),
      });
      return Response.json(
        { error: "Failed to start generation" },
        { status: 502 },
      );
    }
  } catch (err) {
    await store.setJSON(jobId, {
      status: "error",
      message: err instanceof Error ? err.message : "Trigger failed",
      updatedAt: Date.now(),
    });
    return Response.json({ error: "Failed to start generation" }, { status: 502 });
  }

  return Response.json({ jobId });
}
