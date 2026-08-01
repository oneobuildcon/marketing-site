import { NextRequest, NextResponse } from 'next/server';
import {
  getQuotationOverrides,
  saveQuotationOverrides,
  type QuotationOverride,
} from '@/lib/site-db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(await getQuotationOverrides());
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to load quotation specs' }, { status: 500 });
  }
}

// Saves (or clears) one package at a time, so saving Premium can never disturb
// what is stored for Standard.
export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as { id?: string; value?: QuotationOverride | null };
    const id = String(body?.id ?? '').trim();
    if (!id) return NextResponse.json({ error: 'Missing package id' }, { status: 400 });

    const all = await getQuotationOverrides();
    if (body.value === null) delete all[id];
    else all[id] = body.value ?? {};
    await saveQuotationOverrides(all);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to save quotation specs' }, { status: 500 });
  }
}
