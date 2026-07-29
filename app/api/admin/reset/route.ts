import { NextRequest, NextResponse } from 'next/server';
import { verifyOtp, hashPassword } from '@/lib/adminOtp';
import { saveAdminPasswordHash } from '@/lib/site-db';

export async function POST(req: NextRequest) {
  try {
    const { code, newPassword } = await req.json();
    const pw = String(newPassword ?? '').trim();
    if (pw.length < 6) return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    const v = verifyOtp(String(code ?? ''));
    if (!v.ok) return NextResponse.json({ error: v.reason }, { status: 401 });
    await saveAdminPasswordHash(hashPassword(pw));
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}
