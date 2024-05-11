import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req, event) {
  const token = await getToken({ req })
  const isAuthenticated = !!token

  // Redirect to sign in page if not authenticated
  if (isAuthenticated && req.nextUrl.pathname.startsWith('/auth/signin')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  //todo breaks application if navigate directly to the profile/personal_data
  if (
    req.nextUrl.pathname.startsWith('/user/personal_data') ||
    req.nextUrl.pathname.startsWith('/user/orders_list')
  ) {
    const authMiddleware = await withAuth({
      pages: {
        signIn: '/auth/signin',
      },
    })
    return authMiddleware(req, event)
  }

  // Allow unrestricted access to other pages
  return NextResponse.next()
}
