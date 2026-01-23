'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/Blog';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.id}`}
      className="group block border rounded-xl overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-gray-900 dark:border-gray-700"
    >
      {post.thumbnail && (
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-5">
        <h2 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 border-t pt-3 dark:border-gray-700">
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>{post.view_count}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
