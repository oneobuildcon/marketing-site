import { NextResponse } from 'next/server';
import { getPackagesData } from '@/lib/site-db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getPackagesData();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to load packages' }, { status: 500 });
  }
}
