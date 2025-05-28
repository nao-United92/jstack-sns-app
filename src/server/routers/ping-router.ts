import { j, publicProcedure } from '../jstack';

export const pingRouter = j.router({
  ping: publicProcedure.get(({ c }) => {
    return c.json({ message: 'pong' });
  }),
});
