import { createServerClient } from './supabase-server';
import {
  packages as staticPackages,
  categories as staticCategories,
  defaultPackageContent,
  type PackageContent,
  type PackageMeta,
  type CategoryMeta,
} from '@/data/packagesData';

export type PackagesData = {
  content: PackageContent;
  pkgMeta: PackageMeta[];
  catMeta: CategoryMeta[];
};

function hasSupabase() {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL;
}

export function staticPackagesData(): PackagesData {
  return {
    content: defaultPackageContent,
    pkgMeta: staticPackages.map((p) => ({ ...p })),
    catMeta: staticCategories.map((c) => ({ ...c })),
  };
}

export async function getPackagesData(): Promise<PackagesData> {
  if (!hasSupabase()) return staticPackagesData();
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'packages')
      .maybeSingle();
    if (error) throw error;
    const value = data?.value as Partial<PackagesData> | undefined;
    if (value && value.content && value.pkgMeta && value.catMeta) {
      return value as PackagesData;
    }
  } catch (e) {
    console.error('getPackagesData: falling back to static packages:', e);
  }
  return staticPackagesData();
}

export async function savePackagesData(value: PackagesData): Promise<void> {
  const supabase = createServerClient();
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key: 'packages', value, updated_at: new Date().toISOString() });
  if (error) throw error;
}

// ── Homepage stats ──────────────────────────────────────────────────────────
// "projects" auto-counts from the projects table; "years" auto-ticks from the
// founding year; "clients" and "cities" are admin-editable numbers.
export type HomeStatsConfig = { startYear: number; clients: number; cities: number; projectsBase: number };
export type HomeStats = { projects: number; years: number; clients: number; cities: number };

const DEFAULT_HOME_STATS: HomeStatsConfig = { startYear: 2020, clients: 25, cities: 2, projectsBase: 20 };

export async function getHomeStatsConfig(): Promise<HomeStatsConfig> {
  if (!hasSupabase()) return DEFAULT_HOME_STATS;
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'homeStats')
      .maybeSingle();
    if (error) throw error;
    const v = data?.value as Partial<HomeStatsConfig> | undefined;
    if (v) {
      return {
        startYear: Number(v.startYear) || DEFAULT_HOME_STATS.startYear,
        clients: Number(v.clients) || DEFAULT_HOME_STATS.clients,
        cities: Number(v.cities) || DEFAULT_HOME_STATS.cities,
        projectsBase: v.projectsBase == null ? DEFAULT_HOME_STATS.projectsBase : Number(v.projectsBase),
      };
    }
  } catch (e) {
    console.error('getHomeStatsConfig: falling back to defaults:', e);
  }
  return DEFAULT_HOME_STATS;
}

export async function saveHomeStatsConfig(value: HomeStatsConfig): Promise<void> {
  const supabase = createServerClient();
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key: 'homeStats', value, updated_at: new Date().toISOString() });
  if (error) throw error;
}

// addedCount = projects actually added through the admin panel. The displayed
// "Projects Completed" is the baseline (work done before tracking) plus those.
export async function getHomeStats(addedCount: number): Promise<HomeStats> {
  const cfg = await getHomeStatsConfig();
  const years = Math.max(1, new Date().getFullYear() - cfg.startYear);
  return { projects: cfg.projectsBase + addedCount, years, clients: cfg.clients, cities: cfg.cities };
}

// ── Milestones (About page timeline) ────────────────────────────────────────
export type Milestone = { year: string; en: string; mr: string };

const DEFAULT_MILESTONES: Milestone[] = [
  { year: "2019", en: "One O Buildcon founded in Pune", mr: "पुण्यात वन ओ बिल्डकॉनची स्थापना" },
  { year: "2020", en: "Delivered our first premium residential bungalows", mr: "आमचे पहिले प्रीमियम निवासी बंगले पूर्ण केले" },
  { year: "2021", en: "Expanded to farmhouse and commercial builds", mr: "फार्महाउस आणि व्यावसायिक बांधकामापर्यंत विस्तार" },
  { year: "2022", en: "Completed 10+ projects across Pune", mr: "पुण्यात १०+ प्रकल्प पूर्ण" },
  { year: "2023", en: "Growing client base across Pune and Maharashtra", mr: "पुणे आणि महाराष्ट्रात ग्राहक आधार वाढवत आहे" },
  { year: "2024", en: "Introduced transparent package-based pricing", mr: "पारदर्शक पॅकेज-आधारित किंमत सुरू केली" },
  { year: "2025", en: "Completed 20+ projects across residential & commercial", mr: "निवासी आणि व्यावसायिक क्षेत्रात २०+ प्रकल्प पूर्ण" },
  { year: "2026", en: "Continuing to grow with new residential & commercial projects", mr: "नवीन निवासी आणि व्यावसायिक प्रकल्पांसह वाढ सुरू" },
];

export async function getMilestones(): Promise<Milestone[]> {
  if (!hasSupabase()) return DEFAULT_MILESTONES;
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'milestones')
      .maybeSingle();
    if (error) throw error;
    const v = data?.value as Milestone[] | undefined;
    if (Array.isArray(v) && v.length) return v;
  } catch (e) {
    console.error('getMilestones: falling back to defaults:', e);
  }
  return DEFAULT_MILESTONES;
}

export async function saveMilestones(value: Milestone[]): Promise<void> {
  const supabase = createServerClient();
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key: 'milestones', value, updated_at: new Date().toISOString() });
  if (error) throw error;
}

export type Lead = { id: string; created_at: string; data: Record<string, unknown> };

export async function getLeads(): Promise<Lead[]> {
  if (!hasSupabase()) return [];
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Lead[];
}

export async function createLead(payload: Record<string, unknown>): Promise<void> {
  if (!hasSupabase()) return;
  const supabase = createServerClient();
  const { error } = await supabase.from('leads').insert({ data: payload });
  if (error) throw error;
}
