import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import { getHomeStats } from '@/lib/site-db';
import { getProjectsCount, getProjects } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET() {
  noStore();
  try {
    const addedCount = await getProjectsCount();
    const stats = await getHomeStats(addedCount);
    // Total sq.ft constructed — summed from project areas, rounded down to the
    // nearest 1,000 (same figure shown on the company profile "By the Numbers").
    const projects = await getProjects();
    const totalSqft = projects.reduce((sum, p) => {
      const n = parseInt((p.area || '').replace(/[^0-9]/g, ''), 10);
      return sum + (isNaN(n) ? 0 : n);
    }, 0);
    const sqft = Math.floor(totalSqft / 1000) * 1000;
    return new NextResponse(JSON.stringify({ ...stats, sqft }), {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to load stats' }, { status: 500 });
  }
}
