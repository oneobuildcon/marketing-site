import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

// Decode the "role" claim from the configured Supabase key (a JWT) WITHOUT
// exposing the key itself. A real service-role key has role === 'service_role';
// the public anon key has role === 'anon'. Using the anon key server-side is the
// usual reason writes silently fail under Row Level Security.
function keyRole(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
  try {
    const payload = JSON.parse(
      Buffer.from(key.split('.')[1] ?? '', 'base64').toString('utf8')
    );
    return payload.role ?? 'unknown';
  } catch {
    return key ? 'not-a-jwt' : 'missing';
  }
}

export async function GET() {
  const result: Record<string, unknown> = {
    serviceKeyRole: keyRole(),
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
  };

  try {
    const supabase = createServerClient();

    // Try a write and read it back, surfacing the raw Supabase error.
    const probe = { _diag: true, at: new Date().toISOString() };
    const write = await supabase
      .from('site_settings')
      .upsert({ key: '__diag__', value: probe, updated_at: new Date().toISOString() })
      .select();
    result.writeError = write.error?.message ?? null;
    result.writeReturnedRows = write.data?.length ?? 0;

    const read = await supabase
      .from('site_settings')
      .select('key')
      .eq('key', '__diag__')
      .maybeSingle();
    result.readError = read.error?.message ?? null;
    result.readFoundDiagRow = !!read.data;

    // Show what is ACTUALLY stored under the real 'packages' key right now, so
    // we can tell whether the admin Save is landing in the database.
    const pkgRows = await supabase
      .from('site_settings')
      .select('value, updated_at')
      .eq('key', 'packages');
    result.packagesRowCount = pkgRows.data?.length ?? 0;
    result.packagesReadError = pkgRows.error?.message ?? null;
    const pkgValue: any = pkgRows.data?.[0]?.value;
    result.packagesUpdatedAt = pkgRows.data?.[0]?.updated_at ?? null;
    result.storedPrices = Array.isArray(pkgValue?.pkgMeta)
      ? pkgValue.pkgMeta.map((p: any) => ({ id: p.id, price: p.price }))
      : null;
  } catch (e: any) {
    result.exception = e?.message ?? String(e);
  }

  return NextResponse.json(result);
}
