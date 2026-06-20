import { NextRequest, NextResponse } from 'next/server';
import { uploadPhoto } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    const slug = form.get('slug');
    if (!(file instanceof File) || typeof slug !== 'string') {
      return NextResponse.json({ error: 'file and slug are required' }, { status: 400 });
    }
    const url = await uploadPhoto(slug, file);
    return NextResponse.json({ url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Upload failed' }, { status: 500 });
  }
}
