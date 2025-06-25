'use client';

import { UserProfile } from '@/domain/User';
import { client } from '@/lib/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRef, useState } from 'react';

function PostForm({ user }: { user: UserProfile }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: async (newPost: {
      content: string;
      image: string | null;
      handle: string;
    }) => {
      const res = await client.post.create.$post(newPost);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', user.handle] });
      setContent('');
      setImage(null);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      createPostMutation.mutate({
        content,
        image,
        handle: user.handle,
      });
    }
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setImage(base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full bg-gray-200"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          )}
        </div>
        <div className="flex-grow">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          />
          {image && (
            <Image src={image} alt="upload preview" width={500} height={500} />
          )}
          <div>
            <button type="button" onClick={handleImageButtonClick}>
              画像
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />
          </div>
          <button type="submit">投稿する</button>
        </div>
      </div>
    </form>
  );
}

export default PostForm;
