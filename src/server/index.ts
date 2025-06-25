import { profile } from 'console';
import { j } from './jstack';
import { clerkWebhookRouter } from './routers/clerk-webhook-router';
import { pingRouter } from './routers/ping-router';
import { postRouter } from './routers/post-router';
import { profileRouter } from './routers/profile-router';

/**
 * This is your base API.
 * Here, you can handle errors, not-found responses, cors and more.
 *
 * @see https://jstack.app/docs/backend/app-router
 */
const api = j
  .router()
  .basePath('/api')
  .use(j.defaults.cors)
  .onError(j.defaults.errorHandler);

/**
 * This is the main router for your server.
 * All routers in /server/routers should be added here manually.
 */
const appRouter = j.mergeRouters(api, {
  post: postRouter,
  system: pingRouter,
  webhook: clerkWebhookRouter,
  profile: profileRouter,
});

export type AppRouter = typeof appRouter;

export default appRouter;
