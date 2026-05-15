/**
 * Poll a face-swap job's status.
 *   GET /api/face-swap/status/[jobId]
 *   → { status: "pending" | "processing" | "done" | "error", imageUrl?, message? }
 *
 * Reads from the same "face-swap-jobs" Netlify Blobs store the background
 * function writes to. Strips the photo data URL out of the response so
 * we don't ship megabytes of base64 back to the polling client.
 */

import { getStore } from "@netlify/blobs";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ jobId: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { jobId } = await params;
  if (!jobId) {
    return Response.json({ error: "Missing jobId" }, { status: 400 });
  }

  const store = getStore("face-swap-jobs");
  const job = (await store.get(jobId, { type: "json" })) as Record<string, unknown> | null;

  if (!job) {
    return Response.json({ error: "Job not found" }, { status: 404 });
  }

  // Don't echo the photo back; the client already has it.
  // Don't echo origin either — internal detail.
  const { photoDataUrl: _photo, origin: _origin, ...publicData } = job;
  return Response.json(publicData);
}
