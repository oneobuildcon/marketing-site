import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPath = pathname.startsWith('/admin');
  // The auth endpoint must stay public — it is how you obtain the token in the
  // first place. Protecting it would block every login attempt with a 401.
  const isAuthApi = pathname === '/api/admin/auth';
  const isAdminApi = pathname.startsWith('/api/admin') && !isAuthApi;
  const isLoginPath = pathname === '/admin/login';

  // Forward the current pathname to server components via a request header,
  // so the admin layout can tell the login route apart from the shell.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  const pass = () => NextResponse.next({ request: { headers: requestHeaders } });

  if (isAuthApi) return pass();

  if (!isAdminPath && !isAdminApi) return pass();

  const token = request.cookies.get('admin_token')?.value;
  const secret = new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET || 'fallback-secret-32-chars-minimum!!'
  );

  let valid = false;
  if (token) {
    try {
      await jwtVerify(token, secret);
      valid = true;
    } catch {}
  }

  // Admin API routes return JSON 401 instead of redirecting to the login page.
  if (isAdminApi) {
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return pass();
  }

  if (!valid && !isLoginPath) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  if (valid && isLoginPath) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  return pass();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
