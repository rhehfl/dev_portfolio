import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function BlogSidebar({
  currentTag,
}: {
  currentTag?: string;
}) {
  const { data: posts } = await supabase
    .from('posts')
    .select('tags')
    .eq('is_published', true);

  const tagCounts: Record<string, number> = {};

  posts?.forEach((post) => {
    post.tags?.forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="sticky top-24 p-6 border rounded-xl bg-white dark:bg-gray-900 dark:border-gray-700">
        <h3 className="font-bold text-lg mb-4">🏷️ 태그 목록</h3>

        <ul className="space-y-2">
          <li>
            <Link
              href="/blog"
              className={`flex justify-between items-center text-sm px-3 py-2 rounded-lg transition-colors ${
                !currentTag
                  ? 'bg-blue-50 text-blue-600 font-semibold dark:bg-blue-900/30 dark:text-blue-400'
                  : 'hover:bg-gray-100 text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <span>전체 보기</span>
              <span className="bg-gray-100 text-xs px-2 py-0.5 rounded-full dark:bg-gray-800">
                {posts?.length || 0}
              </span>
            </Link>
          </li>

          {sortedTags.map(([tag, count]) => (
            <li key={tag}>
              <Link
                href={`/blog?tag=${tag}`}
                className={`flex justify-between items-center text-sm px-3 py-2 rounded-lg transition-colors ${
                  currentTag === tag
                    ? 'bg-blue-50 text-blue-600 font-semibold dark:bg-blue-900/30 dark:text-blue-400'
                    : 'hover:bg-gray-100 text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800'
                }`}
              >
                <span>{tag}</span>
                <span className="bg-gray-100 text-xs px-2 py-0.5 rounded-full dark:bg-gray-800">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
