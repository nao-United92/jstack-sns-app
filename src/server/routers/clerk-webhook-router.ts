import { WebhookEvent } from '@clerk/nextjs/server';
import { j, publicProcedure } from '../jstack';
import { Webhook } from 'svix';
import { users } from '../db/schema';

export const clerkWebhookRouter = j.router({
  clerk: publicProcedure.post(async ({ c, ctx }) => {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    const { db } = ctx;

    if (!WEBHOOK_SECRET) {
      throw new Error('WEBHOOK_SECRET is not defined');
    }

    const payload = await c.req.text();
    const headers = c.req.raw.headers;

    const svixHeaders = {
      'svix-id': headers.get('svix-id') || '',
      'svix-timestamp': headers.get('svix-timestamp') || '',
      'svix-signature': headers.get('svix-signature') || '',
    };

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;

    try {
      evt = (await wh.verify(payload, svixHeaders)) as WebhookEvent;
    } catch (error) {
      console.error(error);
      throw new Error('Invalid webhook signature');
    }

    const eventType = evt.type;

    if (eventType === 'user.created') {
      const { id, email_addresses, first_name, last_name } = evt.data;

      await db.insert(users).values({
        clerkId: id,
        email: email_addresses[0]?.email_address ?? '',
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        avatarUrl: '',
        bio: '',
        handle: email_addresses[0]?.email_address?.split('@')[0] || '',
      });
    }

    return c.json({ message: 'webhook received successfully' }, 200);
  }),
});
