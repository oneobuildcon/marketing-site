import { NextRequest, NextResponse } from 'next/server';
import { getPackagesData, savePackagesData, type PackagesData } from '@/lib/site-db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(await getPackagesData());
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to load packages' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as PackagesData;
    if (!body?.content || !body?.pkgMeta || !body?.catMeta) {
      return NextResponse.json({ error: 'Invalid packages payload' }, { status: 400 });
    }
    await savePackagesData(body);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to save packages' }, { status: 500 });
  }
}
