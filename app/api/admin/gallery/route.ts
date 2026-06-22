import { NextRequest, NextResponse } from 'next/server';
import { getGallery, saveGallery, type GalleryImage } from '@/lib/site-db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(await getGallery());
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to load gallery' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as GalleryImage[];
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid gallery payload' }, { status: 400 });
    }
    const clean = body
      .map((g) => ({ url: String(g.url ?? '').trim(), caption: String(g.caption ?? '').trim() }))
      .filter((g) => g.url);
    await saveGallery(clean);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to save gallery' }, { status: 500 });
  }
}
