import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/site-db";

const SHEET_URL =
  process.env.GOOGLE_SHEET_URL ??
  "https://script.google.com/macros/s/AKfycbwiY9eBuBDMQKFjr4kgyaXL9ewqLmRsUvCtRLnyO2UJfRja1Bw5XmBIW5Hh63y2ogjkRw/exec";

// Basic spam detection. Bots POST here directly (bypassing the form), so this
// must run server-side. Returns a reason string when the lead looks like spam,
// or null when it's genuine. Kept conservative to avoid dropping real leads.
function spamReason(body: any): string | null {
  const name = String(body?.name ?? "").trim();
  const phoneDigits = String(body?.phone ?? "").replace(/\D/g, "");
  // Honeypot: a hidden field real users never fill.
  if (String(body?.company ?? body?._hp ?? "").trim()) return "honeypot";
  // Name must be a sensible length.
  if (name.length < 2 || name.length > 60) return "name-length";
  // Phone must be a valid Indian mobile (10 digits, starts 6-9).
  const last10 = phoneDigits.slice(-10);
  if (last10.length !== 10 || !/^[6-9]/.test(last10)) return "phone";
  // Gibberish name: real names don't have several capitals mid-word
  // (e.g. "gSuUeioqaiExeoQQBgyag").
  const internalCaps = (name.match(/(?<=\w)[A-Z]/g) || []).length;
  if (internalCaps >= 3) return "gibberish-name";
  // Gibberish name: a single long token with almost no vowels.
  if (!name.includes(" ") && name.length >= 12) {
    const vowels = (name.match(/[aeiouAEIOU]/g) || []).length;
    if (vowels / name.length < 0.2) return "gibberish-name";
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Silently drop spam: don't store it, don't email, but return ok so bots
    // get no signal about why it failed.
    const reason = spamReason(body);
    if (reason) {
      console.warn("save-lead: dropped spam lead:", reason, body?.name, body?.phone);
      return NextResponse.json({ ok: true, skipped: reason });
    }

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
