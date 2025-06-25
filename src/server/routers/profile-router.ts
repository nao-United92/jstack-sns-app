import { z } from 'zod';
import { j, publicProcedure } from '../jstack';
import { eq } from 'drizzle-orm';
import { users } from '../db/schema';

export const profileRouter = j.router({
  get: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input, c }) => {
      const { db } = ctx;
      const { userId } = input;

      const user = await db
        .select()
        .from(users)
        .where(eq(users.clerkId, userId))
        .limit(1);

      return c.json(user[0] ?? null);
    }),
});
