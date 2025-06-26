'use client';

import { Post } from '@/domain/Post';
import { Button } from '@/components/ui/button';
import { MessageCircle, Repeat, Heart, Share } from 'lucide-react';
import Image from 'next/image';

interface PostItemProps {
  post: Post;
  currentUserHandle?: string | null;
}

export function PostItem({ post, currentUserHandle }: PostItemProps) {
  return (
    <div className="hover:bg-gray-50 transition-colors px-4 py-3">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
            {currentUserHandle?.[0]?.toUpperCase()}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center text-sm">
            <span className="font-bold text-gray-900 mr-1">
              {post.name || post.handle}
            </span>
            <span className="text-gray-500 mr-1">@{post.handle}</span>
            <span className="text-gray-500">
              · {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-1 text-gray-900">{post.content}</p>
        </div>
      </div>
    </div>
  );
}
