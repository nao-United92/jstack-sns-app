import PostForm from '@/components/ui/PostForm';
import PostList from '@/components/ui/PostList';
import { SignOutButton } from '@clerk/nextjs';

export default async function Home() {
  return (
    <div className="max-w-xl mx-auto min-h-screen">
      <div>
        <PostForm />
      </div>
      <PostList />
    </div>
  );
}
