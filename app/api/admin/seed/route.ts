import { NextResponse } from 'next/server';
import { projects as staticProjects } from '@/lib/projects';
import { createServerClient } from '@/lib/supabase-server';
import { projectToRow, type DbProject } from '@/lib/db';

export async function POST() {
  try {
    const supabase = createServerClient();
    const { data: existing } = await supabase.from('projects').select('slug');
    const existingSlugs = new Set((existing ?? []).map((r: any) => r.slug));

    let inserted = 0;
    let sortOrder = 0;
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
    return NextResponse.json({ inserted });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Seed failed' }, { status: 500 });
  }
}
