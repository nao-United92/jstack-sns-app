'use client';
import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/client';
import Image from 'next/image';
import { UserProfile } from '@/domain/User';
import { BarChart, Calendar, FileImage, MapPin, Smile, X } from 'lucide-react';

export default function PostForm({ user }: { user: UserProfile }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: async (newPost: {
      content: string;
      handle: string;
      image: string;
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
        handle: user.handle,
        image: image || undefined,
      });
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
            {user.name[0]?.toUpperCase()}
          </div>
        </div>
        <div className="flex-grow">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What is happening?!"
            className="w-full p-2 text-xl border-none focus:outline-none resize-none min-h-[80px]"
            rows={3}
          />

          {image && (
            <div className="relative mt-2 mb-3">
              <div className="rounded-xl overflow-hidden relative max-h-[300px]">
                <Image
                  src={image}
                  alt="Upload preview"
                  width={500}
                  height={300}
                  className="object-contain max-w-full"
                />
              </div>
              <button
                type="button"
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
            <div className="flex gap-2 text-blue-500">
              <button
                type="button"
                onClick={handleImageButtonClick}
                className="p-2 rounded-full hover:bg-blue-50"
              >
                <FileImage size={18} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
              <button
                type="button"
                className="p-2 rounded-full hover:bg-blue-50"
              >
                <BarChart size={18} />
              </button>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-blue-50"
              >
                <Smile size={18} />
              </button>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-blue-50"
              >
                <Calendar size={18} />
              </button>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-blue-50"
              >
                <MapPin size={18} />
              </button>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {createPostMutation.isPending ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
