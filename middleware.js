import { NextResponse } from 'next/server';

export function middleware(request) {
  // Ana sayfaya gelen istekleri kontrol et
  if (request.nextUrl.pathname === '/') {
    // Login sayfasına yönlendir
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Middleware'in hangi path'lerde çalışacağını belirt
export const config = {
  matcher: '/'
};
