import { NextResponse } from 'next/server';
import { projects as staticProjects } from '@/lib/projects';
import { createServerClient } from '@/lib/supabase-server';
import { projectToRow, type DbProject } from '@/lib/db';

async function seed() {
  const supabase = createServerClient();
  const { data: existing, error: readError } = await supabase.from('projects').select('slug');
  if (readError) throw readError;
  const existingSlugs = new Set((existing ?? []).map((r: any) => r.slug));

  let inserted = 0;
  let sortOrder = existingSlugs.size;
  for (const p of staticProjects) {
    if (existingSlugs.has(p.slug)) continue;
    const dbProject: DbProject = {
      ...p,
      count: p.count,
      photos: Array.from({ length: p.count }, (_, i) => `/projects/${p.slug}/${i + 1}.jpg`),
    };
    const row = projectToRow(dbProject);
    row.sort_order = sortOrder++;
    const { error } = await supabase.from('projects').insert(row);
    if (error) throw error;
    inserted++;
  }
  return { inserted, alreadyPresent: existingSlugs.size };
}

export async function POST() {
  try {
    return NextResponse.json(await seed());
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Seed failed' }, { status: 500 });
  }
}

// Convenience: allow triggering the one-time import by visiting the URL in a
// browser. Idempotent — existing projects are skipped.
export async function GET() {
  try {
    return NextResponse.json(await seed());
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Seed failed' }, { status: 500 });
  }
}
