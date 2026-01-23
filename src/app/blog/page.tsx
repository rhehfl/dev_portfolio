import BlogCard from '@/components/blog/BlogCard';
import { supabase } from '@/lib/supabase';
import { Post } from '@/types/Blog';

export const revalidate = 60;

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, content, created_at, tags, thumbnail, view_count')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (!posts) return <p>게시글이 없습니다.</p>;

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">기술 블로그</h1>
      <div className="grid gap-6">
        {posts.map((post: Post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
