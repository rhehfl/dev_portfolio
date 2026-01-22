import { supabase } from '@/lib/supabase';
import { Post } from '@/types/Blog';
import Link from 'next/link';

export const revalidate = 60;

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, content, created_at, tags')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (!posts) return <p>게시글이 없습니다.</p>;

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">기술 블로그</h1>
      <div className="grid gap-6">
        {posts.map((post: Post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="block p-6 border rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <div className="text-gray-500 text-sm mt-2">
              {new Date(post.created_at).toLocaleDateString()}
            </div>
            <div className="mt-2 flex gap-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
