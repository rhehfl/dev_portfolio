import BlogCard from '@/features/blog/components/BlogCard';
import BlogSidebar from '@/features/blog/components/BlogSidebar';
import { supabase } from '@/lib/supabase';

interface BlogPageProps {
  searchParams: Promise<{
    tag?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag } = await searchParams;

  let query = supabase
    .from('posts')
    .select('id, title, content,created_at, tags, thumbnail, view_count')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (tag) {
    query = query.contains('tags', [tag]);
  }

  const { data: posts } = await query;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">기술 블로그</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <BlogSidebar currentTag={tag} />
        <main className="flex-1">
          {tag && (
            <div className="mb-6 flex items-center gap-2">
              <span className="text-xl font-semibold text-blue-600">
                #{tag}
              </span>
              <span className="text-gray-500">관련 글 목록</span>
            </div>
          )}

          {!posts || posts.length === 0 ? (
            <div className="text-center py-20 text-gray-500 border rounded-xl bg-gray-50">
              작성된 글이 없습니다.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
