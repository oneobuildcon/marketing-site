import { NextRequest, NextResponse } from 'next/server';
import { getMilestones, saveMilestones, type Milestone } from '@/lib/site-db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(await getMilestones());
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to load milestones' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as Milestone[];
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid milestones payload' }, { status: 400 });
    }
    const clean = body
      .map((m) => ({
        year: String(m.year ?? '').trim(),
        en: String(m.en ?? '').trim(),
        mr: String(m.mr ?? '').trim() || String(m.en ?? '').trim(),
      }))
      .filter((m) => m.year && m.en);
    await saveMilestones(clean);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to save milestones' }, { status: 500 });
  }
}
