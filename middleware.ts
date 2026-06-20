import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPath = request.nextUrl.pathname === '/admin/login';

  // Forward the current pathname to server components via a request header,
  // so the admin layout can tell the login route apart from the shell.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);
  const pass = () => NextResponse.next({ request: { headers: requestHeaders } });

  if (!isAdminPath) return pass();

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

  if (!valid && !isLoginPath) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  if (valid && isLoginPath) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  return pass();
}

export const config = {
  matcher: ['/admin/:path*'],
};
