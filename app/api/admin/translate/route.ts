import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ENDPOINT = 'https://translate.googleapis.com/translate_a/single';

// The endpoint takes a limited amount of text per call, so long bodies are cut
// into chunks at line boundaries. Newlines survive translation, which is what
// keeps "## headings", "- bullets" and "| table |" rows intact.
function chunk(text: string, max = 1400): string[] {
  const out: string[] = [];
  let current = '';
  for (const line of text.split('\n')) {
    if (current.length + line.length + 1 > max && current) {
      out.push(current);
      current = '';
    }
    // A single line longer than the limit is sent on its own; the endpoint
    // handles it, it just is not batched with anything else.
    current += (current ? '\n' : '') + line;
  }
  if (current) out.push(current);
  return out;
}

async function translateChunk(text: string): Promise<string> {
  const body = new URLSearchParams({ client: 'gtx', sl: 'en', tl: 'mr', dt: 't', q: text });
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) throw new Error(`Translation service returned ${res.status}`);
  const data = (await res.json()) as any;
  const segments = data?.[0];
  if (!Array.isArray(segments)) throw new Error('Unexpected response from the translation service');
  return segments.map((s: any) => s?.[0] ?? '').join('');
}

async function translate(text: string): Promise<string> {
  const t = text.trim();
  if (!t) return '';
  const parts: string[] = [];
  for (const c of chunk(t)) parts.push(await translateChunk(c));
  return parts.join('\n');
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as {
      title?: string; summary?: string; body?: string; items?: string[];
    };

    // Batch form, used by the Marathi quotation: many short strings at once.
    // They are joined with a separator the translator leaves alone, so the
    // whole set costs one request per chunk rather than one per string.
    if (Array.isArray(payload.items)) {
      const SEP = '\n@@\n';
      const items = payload.items.map((s) => (s ?? '').toString());
      const joined = items.map((s) => s.trim() || '-').join(SEP);
      const out = await translate(joined);
      let parts = out.split(/\s*@@\s*/);
      // If the separator did not survive, fall back to translating one by one
      // so the caller always gets an answer of the right length.
      if (parts.length !== items.length) {
        parts = [];
        for (const it of items) parts.push(it.trim() ? await translate(it) : '');
      }
      return NextResponse.json({
        items: items.map((src, i) => (src.trim() ? (parts[i] ?? src).trim() : '')),
      });
    }

    const { title = '', summary = '', body = '' } = payload;
    if (!title && !summary && !body) {
      return NextResponse.json({ error: 'Nothing to translate' }, { status: 400 });
    }
    // Sequential rather than parallel — the free endpoint rate-limits bursts.
    const mrTitle = await translate(title);
    const mrSummary = await translate(summary);
    const mrBody = await translate(body);
    return NextResponse.json({ title: mrTitle, summary: mrSummary, body: mrBody });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Translation failed' }, { status: 500 });
  }
}
