import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/site-db";

const SHEET_URL =
  process.env.GOOGLE_SHEET_URL ??
  "https://script.google.com/macros/s/AKfycbwiY9eBuBDMQKFjr4kgyaXL9ewqLmRsUvCtRLnyO2UJfRja1Bw5XmBIW5Hh63y2ogjkRw/exec";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Store the lead in Supabase so it shows in the admin Leads page on every
    // device. Failures here must not block the Google Sheet / the response.
    try {
      await createLead(body);
    } catch (e) {
      console.error("save-lead: failed to store lead in Supabase:", e);
    }

    let response = "";
    if (SHEET_URL) {
      const res = await fetch(SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      response = await res.text();
    }

    return NextResponse.json({ ok: true, response });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
