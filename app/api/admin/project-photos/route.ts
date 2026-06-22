import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/db';

export const dynamic = 'force-dynamic';

// Returns every photo across all projects so the gallery admin can reuse them
// without re-uploading (saves storage). Shape: [{ url, project }].
export async function GET() {
  try {
    const projects = await getProjects();
    const photos: { url: string; project: string }[] = [];
    for (const p of projects) {
      const name = p.en?.name || p.slug;
      for (const url of p.photos ?? []) {
        photos.push({ url, project: name });
      }
    }
    return NextResponse.json(photos);
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to load project photos' }, { status: 500 });
  }
}
