'use client';

import { client } from '@/lib/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { set } from 'zod';

function PostForm() {
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
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setContent('');
      setImage(null);
    },
  });
}

export default PostForm;
