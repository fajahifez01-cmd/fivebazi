import { NextResponse } from "next/server";
import { calculateBaZi } from "@/lib/bazi";
import { streamReading } from "@/lib/aiReading";

export const runtime = "nodejs";
export const maxDuration = 60;

interface RequestBody {
  name?: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  isMale: boolean;
}

export async function POST(req: Request) {
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { name, year, month, day, hour, minute, isMale } = body;
  if (
    typeof year !== "number" ||
    typeof month !== "number" ||
    typeof day !== "number" ||
    typeof hour !== "number" ||
    typeof minute !== "number" ||
    typeof isMale !== "boolean"
  ) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const chart = calculateBaZi({ year, month, day, hour, minute, isMale });
  const readerName = name?.trim() || "Anonymous Soul";

  try {
    const stream = await streamReading(chart, readerName);
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("/api/reading error:", err);
    return NextResponse.json({ error: "reading_failed" }, { status: 500 });
  }
}
