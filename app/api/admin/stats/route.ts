import { NextRequest, NextResponse } from 'next/server';
import { getHomeStatsConfig, saveHomeStatsConfig, type HomeStatsConfig } from '@/lib/site-db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(await getHomeStatsConfig());
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to load stats' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<HomeStatsConfig>;
    const value: HomeStatsConfig = {
      startYear: Number(body.startYear),
      clients: Number(body.clients),
      cities: Number(body.cities),
    };
    if (!value.startYear || value.startYear < 1990 || value.startYear > new Date().getFullYear()) {
      return NextResponse.json({ error: 'Invalid founding year' }, { status: 400 });
    }
    if (value.clients < 0 || value.cities < 0) {
      return NextResponse.json({ error: 'Numbers must be positive' }, { status: 400 });
    }
    await saveHomeStatsConfig(value);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to save stats' }, { status: 500 });
  }
}
