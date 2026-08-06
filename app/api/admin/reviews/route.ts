import { NextRequest, NextResponse } from 'next/server';
import { getManualReviews, saveManualReviews, type ManualReviews } from '@/lib/site-db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(await getManualReviews());
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to load reviews' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as ManualReviews;
    if (!body || !Array.isArray(body.items)) {
      return NextResponse.json({ error: 'Invalid reviews payload' }, { status: 400 });
    }
    await saveManualReviews(body);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to save reviews' }, { status: 500 });
  }
}
