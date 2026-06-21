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
