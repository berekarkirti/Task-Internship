import { NextResponse } from 'next/server';

export function middleware(request) {

  const userCookie = request.cookies.get('user');

  if (!userCookie) 
  {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const user = JSON.parse(userCookie.value || '{}');

  if (!user.email || !user.name) 
  {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = 
{
  matcher: ['/dashboard/:path*'],
};