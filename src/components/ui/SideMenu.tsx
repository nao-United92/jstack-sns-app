import { SignOutButton } from '@clerk/nextjs';
import React from 'react';
import { Search, ListTodo, Bookmark, User, Twitter } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { name: 'Explore', icon: Search, href: '/' },
  { name: 'Lists', icon: ListTodo, href: '/profile' },
  { name: 'Bookmarks', icon: Bookmark, href: '/bookmarks' },
  { name: 'Profile', icon: User, href: '/profile' },
];

function SideMenu() {
  return (
    <div className="fixed top-0 left-0 h-screen flex flex-col border-r w-64 py-4 px-2 bg-white z-30 overflow-y-auto shadow-md">
      <div className="px-4 md-6">
        <Link href="/" className="flex items-center gap-2">
          <Twitter className="h-8 w-8 text-blue-500" />
        </Link>
      </div>
    </div>
  );
}

export default SideMenu;
