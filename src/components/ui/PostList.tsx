import { Post } from '@/domain/Post';
import { UserProfile } from '@/domain/User';
import { client } from '@/lib/client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { PostItem } from './PostItem';

function PostList({ user }: { user: UserProfile }) {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['posts', user.handle],
    queryFn: async () => {
      const res = await client.post.all.$get();
      const data = await res.json();
      return data as Post[];
    },
  });

  if (isLoading || !posts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="divide-y divide-gray-100">
      {posts.map((post: Post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
