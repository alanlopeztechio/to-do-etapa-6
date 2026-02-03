import {clerkMiddleware, createRouteMatcher, getAuth} from '@clerk/nextjs/server'
import {NextResponse} from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/studio(.*)',
  '/api/draft-mode/enable(.*)',
  '/',
  '/:slug',
  '/projects/:slug',
  '/api/clerk/webhooks(.*)',
  '/api/stripe/webhook(.*)',
])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isSignInRoute = createRouteMatcher(['/sign-in(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isSignInRoute(req)) {
    const {isAuthenticated} = await auth()
    if (isAuthenticated) {
      const url = new URL('/dashboard', req.url)
      return NextResponse.redirect(url)
    }
  }
  if (!isPublicRoute(req)) {
    await auth.protect()
  }

  if (isAdminRoute(req) && (await auth()).sessionClaims?.metadata?.role !== 'admin') {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
