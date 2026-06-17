import { NextRequest, NextResponse } from "next/server";

const SHEET_URL = process.env.GOOGLE_SHEET_URL ?? "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!SHEET_URL) return NextResponse.json({ ok: false, error: "Sheet URL not configured" }, { status: 500 });

    const res = await fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    return NextResponse.json({ ok: true, response: text });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
