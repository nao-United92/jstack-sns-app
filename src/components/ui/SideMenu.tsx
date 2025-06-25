'use client';

import { useClerk } from '@clerk/nextjs';
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
  const { signOut } = useClerk();
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="fixed top-0 left-0 h-screen flex flex-col border-r w-64 py-4 px-2 bg-white z-30 overflow-y-auto shadow-md">
      <div className="px-4 md-6">
        <Link href="/" className="flex items-center gap-2">
          <Twitter className="h-8 w-8 text-blue-500" />
        </Link>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <div className="flex items-center gap-4 px-4 py-3 text-lg rounded-full hover:bg-gray-100 transition-colors font-normal">
            <item.icon className="h-6 w-6" />
            <span>{item.name}</span>
          </div>
        ))}
      </nav>

      <div className="mt-auto px-4 md-6">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-full hover:bg-red-100 transition-colors flex items-center gap-3 text-red-600 border border-red-200"
        >
          <span className="font-medium">ログアウト</span>
        </button>
      </div>
    </div>
  );
}

export default SideMenu;
