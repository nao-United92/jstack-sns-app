import { Post } from '@/domain/Post';
import { client } from '@/lib/client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

function PostList() {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
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
        <div key={post.id}>
          <p>{post.content}</p>
          <p>{post.like}</p>
          <p>{post.image}</p>
          <p>{post.name}</p>
          <p>{post.handle}</p>
        </div>
      ))}
    </div>
  );
  return <div>PostList</div>;
}

export default PostList;
