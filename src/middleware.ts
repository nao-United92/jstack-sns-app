import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { create } from 'domain';

const isProtectedRoute = createRouteMatcher('/');
const isWebhookRoute = createRouteMatcher('/api/webhooks/clerk(.*)');
const isPingRoute = createRouteMatcher('/api/system/ping');

export default clerkMiddleware(async (auth, req) => {
  if (isWebhookRoute(req) || isPingRoute(req)) {
    return;
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
