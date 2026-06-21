import { projects as staticProjects, type Project } from './projects';
import { createServerClient } from './supabase-server';

export type DbProject = Omit<Project, 'count'> & {
  count: number;
  photos: string[];
};

function hasSupabase() {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function staticToDb(p: Project): DbProject {
  return {
    ...p,
    count: p.count,
    photos: Array.from({ length: p.count }, (_, i) => `/projects/${p.slug}/${i + 1}.jpg`),
  };
}

function rowToProject(row: any): DbProject {
  return {
    slug: row.slug,
    count: row.photos?.length ?? 0,
    photos: row.photos ?? [],
    category: row.category,
    status: row.status,
    area: row.area,
    year: row.year,
    duration: row.duration,
    budget: row.budget,
    en: {
      name: row.en_name,
      type: row.en_type,
      location: row.en_location,
      desc: row.en_desc,
      highlights: row.en_highlights ?? [],
      ...(row.en_testimonial_quote
        ? { testimonial: { quote: row.en_testimonial_quote, author: row.en_testimonial_author } }
        : {}),
    },
    mr: {
      name: row.mr_name || row.en_name,
      type: row.mr_type || row.en_type,
      location: row.mr_location || row.en_location,
      desc: row.mr_desc || row.en_desc,
      highlights: row.mr_highlights?.length ? row.mr_highlights : row.en_highlights ?? [],
      ...(row.mr_testimonial_quote
        ? { testimonial: { quote: row.mr_testimonial_quote, author: row.mr_testimonial_author } }
        : {}),
    },
  };
}

export function projectToRow(p: Partial<DbProject>): Record<string, any> {
  const row: Record<string, any> = {};
  if (p.slug !== undefined) row.slug = p.slug;
  if (p.category !== undefined) row.category = p.category;
  if (p.status !== undefined) row.status = p.status;
  if (p.area !== undefined) row.area = p.area;
  if (p.year !== undefined) row.year = p.year;
  if (p.duration !== undefined) row.duration = p.duration;
  if (p.budget !== undefined) row.budget = p.budget;
  if (p.photos !== undefined) row.photos = p.photos;
  if (p.en !== undefined) {
    row.en_name = p.en.name;
    row.en_type = p.en.type;
    row.en_location = p.en.location;
    row.en_desc = p.en.desc;
    row.en_highlights = p.en.highlights ?? [];
    row.en_testimonial_quote = p.en.testimonial?.quote ?? null;
    row.en_testimonial_author = p.en.testimonial?.author ?? null;
  }
  if (p.mr !== undefined) {
    row.mr_name = p.mr.name;
    row.mr_type = p.mr.type;
    row.mr_location = p.mr.location;
    row.mr_desc = p.mr.desc;
    row.mr_highlights = p.mr.highlights ?? [];
    row.mr_testimonial_quote = p.mr.testimonial?.quote ?? null;
    row.mr_testimonial_author = p.mr.testimonial?.author ?? null;
  }
  return row;
}

export async function getProjects(): Promise<DbProject[]> {
  if (!hasSupabase()) {
    return staticProjects.map(staticToDb);
  }
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    // Empty DB (not yet seeded) → fall back to static projects.
    if (!data || data.length === 0) return staticProjects.map(staticToDb);
    return data.map(rowToProject);
  } catch (e) {
    // Never let a Supabase outage / bad key take the public site down.
    console.error('getProjects: falling back to static projects:', e);
    return staticProjects.map(staticToDb);
  }
}

export async function getProject(slug: string): Promise<DbProject | null> {
  if (!hasSupabase()) {
    const p = staticProjects.find((x) => x.slug === slug);
    return p ? staticToDb(p) : null;
  }
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).maybeSingle();
    if (error) throw error;
    if (data) return rowToProject(data);
  } catch (e) {
    console.error('getProject: falling back to static project:', e);
  }
  const p = staticProjects.find((x) => x.slug === slug);
  return p ? staticToDb(p) : null;
}

export async function createProject(
  data: Omit<DbProject, 'photos'> & { photos: string[] }
): Promise<DbProject> {
  const supabase = createServerClient();
  const row = projectToRow(data);
  // determine next sort_order
  const { data: existing } = await supabase
    .from('projects')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1);
  row.sort_order = ((existing?.[0]?.sort_order as number) ?? 0) + 1;
  const { data: inserted, error } = await supabase.from('projects').insert(row).select().single();
  if (error) throw error;
  return rowToProject(inserted);
}

export async function updateProject(slug: string, data: Partial<DbProject>): Promise<DbProject> {
  const supabase = createServerClient();
  const row = projectToRow(data);
  delete row.slug; // do not change primary slug on update
  const { data: updated, error } = await supabase
    .from('projects')
    .update(row)
    .eq('slug', slug)
    .select()
    .single();
  if (error) throw error;
  return rowToProject(updated);
}

export async function deleteProject(slug: string): Promise<void> {
  const supabase = createServerClient();
  const { error } = await supabase.from('projects').delete().eq('slug', slug);
  if (error) throw error;
}

export async function uploadPhoto(slug: string, file: File): Promise<string> {
  const supabase = createServerClient();
  const path = `${slug}/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from('projects').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from('projects').getPublicUrl(path);
  return data.publicUrl;
}

export async function deletePhoto(url: string): Promise<void> {
  const supabase = createServerClient();
  const marker = '/storage/v1/object/public/projects/';
  const idx = url.indexOf(marker);
  if (idx === -1) return; // not a supabase storage url (e.g. local path)
  const path = url.slice(idx + marker.length);
  const { error } = await supabase.storage.from('projects').remove([path]);
  if (error) throw error;
}
