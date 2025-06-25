import { posts, users } from '@/server/db/schema';
import { desc, eq, like } from 'drizzle-orm';
import { z } from 'zod';
import { j, publicProcedure } from '../jstack';
import { uploadImage } from '@/lib/cloudinary';

export const postRouter = j.router({
  all: publicProcedure.query(async ({ c, ctx }) => {
    const { db } = ctx;

    const postData = await db
      .select({
        id: posts.id,
        content: posts.content,
        handle: posts.handle,
        name: users.name,
        like: posts.like,
        image: posts.image,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        avatarUrl: users.avatarUrl,
      })
      .from(posts)
      .innerJoin(users, eq(posts.handle, users.handle))
      .orderBy(desc(posts.createdAt));

    return c.superjson({ postData });
  }),
  create: publicProcedure
    .input(
      z.object({
        content: z.string().min(1),
        handle: z.string(),
        image: z.string().nullable(),
      })
    )
    .mutation(async ({ c, ctx, input }) => {
      const { content, handle, image } = input;
      const { db } = ctx;

      let imageUrl = null;

      if (image) {
        try {
          imageUrl = await uploadImage(image);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }

      const post = await db.insert(posts).values({
        content,
        handle,
        image: imageUrl,
        like: 0,
      });

      return c.superjson(post);
    }),
});
