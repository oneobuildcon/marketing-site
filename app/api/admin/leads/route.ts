import { NextResponse } from 'next/server';
import { getLeads } from '@/lib/site-db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(await getLeads());
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to load leads' }, { status: 500 });
  }
}
