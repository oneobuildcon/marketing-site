import { NextRequest, NextResponse } from 'next/server';
import { getProjects, createProject, type DbProject } from '@/lib/db';

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to load projects' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as DbProject;
    if (!body.slug) {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 });
    }
    const created = await createProject({ ...body, photos: body.photos ?? [] });
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Failed to create project' }, { status: 500 });
  }
}
