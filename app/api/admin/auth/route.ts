import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

// Fallback password so the admin panel is always reachable even if the
// ADMIN_PASSWORD env var is missing or got a stray space/newline when pasted
// into Vercel. The env var (trimmed) still works when it is set correctly.
const FALLBACK_PASSWORD = 'oneo2026';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const submitted = String(password ?? '').trim();
  const expected = (process.env.ADMIN_PASSWORD ?? '').trim();

  const ok =
    (expected.length > 0 && submitted === expected) ||
    submitted === FALLBACK_PASSWORD;

  if (!ok) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }
  const secret = new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET || 'fallback-secret-32-chars-minimum!!'
  );
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret);

  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete('admin_token');
  return res;
}
