import { NextRequest, NextResponse } from 'next/server';
import { getBlogPosts, saveBlogPosts, type BlogPost } from '@/lib/site-db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(await getBlogPosts());
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to load posts' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const posts = (await req.json()) as BlogPost[];
    if (!Array.isArray(posts)) {
      return NextResponse.json({ error: 'Expected an array of posts' }, { status: 400 });
    }
    await saveBlogPosts(posts);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to save posts' }, { status: 500 });
  }
}
