import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import { getHomeStats } from '@/lib/site-db';
import { getProjects } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET() {
  noStore();
  try {
    const projects = await getProjects();
    const stats = await getHomeStats(projects.length);
    return new NextResponse(JSON.stringify(stats), {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to load stats' }, { status: 500 });
  }
}
