'use client';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import { client } from '@/lib/client';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

function Home() {
  const { userId } = useAuth();

  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) return null;
      const res = await client.profile.get.$get({ userId });
      return await res.json();
    },
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto min-h-screen">
      <div>
        <PostForm user={user} />
      </div>

      <PostList user={user} />
    </div>
  );
}

export default Home;
