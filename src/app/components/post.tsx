'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { client } from '@/lib/client';
import { Button } from '@/components/ui/button';

export const RecentPost = () => {
  const [name, setName] = useState<string>('');
  const queryClient = useQueryClient();

  const { data: recentPost, isPending: isLoadingPosts } = useQuery({
    queryKey: ['get-recent-post'],
    queryFn: async () => {
      const res = await client.post.recent.$get();
      return await res.json();
    },
  });

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const res = await client.post.create.$post({ name });
      return await res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get-recent-post'] });
      setName('');
    },
  });

  return (
    <div className="w-full max-w-sm backdrop-blur-lg bg-black/15 px-8 py-6 rounded-md text-zinc-100/75 space-y-2">
      {isLoadingPosts ? (
        <p className="text-[#ececf399] text-base/6">Loading posts...</p>
      ) : recentPost ? (
        <p className="text-[#ececf399] text-base/6">
          Your recent post: "{recentPost.name}"
        </p>
      ) : (
        <p className="text-[#ececf399] text-base/6">You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost({ name });
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            createPost({ name });
          }
        }}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Enter a title..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-base/6 rounded-md bg-black/50 hover:bg-black/75 focus-visible:outline-none ring-2 ring-transparent  hover:ring-zinc-800 focus:ring-zinc-800 focus:bg-black/75 transition h-12 px-4 py-2 text-zinc-100"
        />
        <Button disabled={isPending} type="submit" variant="destructive">
          {isPending ? 'Creating...' : 'Create Post'}
        </Button>
      </form>
    </div>
  );
};
