import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import { getMilestones } from '@/lib/site-db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET() {
  noStore();
  try {
    const data = await getMilestones();
    return new NextResponse(JSON.stringify(data), {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to load milestones' }, { status: 500 });
  }
}
