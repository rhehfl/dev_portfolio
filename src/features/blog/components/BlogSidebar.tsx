import { createServerSupabaseClient } from '@/lib/supabase-server';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default async function BlogSidebar({
  currentTag,
}: {
  currentTag?: string;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let query = supabase.from('posts').select('tags');

  if (!session) {
    query = query.eq('is_published', true);
  }

  const { data: posts } = await query;

  const tagCounts: Record<string, number> = {};

  posts?.forEach((post) => {
    post.tags?.forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="sticky top-24 p-6 border border-border rounded-xl bg-card shadow-sm">
        <h3 className="font-bold text-lg mb-4 text-foreground">🏷️ 태그 목록</h3>

        <ul className="space-y-2">
          <li>
            <Link
              href="/blog"
              className={cn(
                'flex justify-between items-center text-sm px-3 py-2 rounded-lg transition-all border border-transparent',
                !currentTag
                  ? 'bg-primary-soft text-foreground font-semibold shadow-sm'
                  : 'bg-secondary text-secondary-foreground hover:bg-primary-soft',
              )}
            >
              <span>전체 보기</span>
              <span
                className={cn(
                  'text-xs px-2 py-0.5 rounded-full border border-transparent',
                  !currentTag
                    ? 'bg-primary-soft text-foreground'
                    : 'bg-muted text-muted-foreground border-border',
                )}
              >
                {posts?.length || 0}
              </span>
            </Link>
          </li>

          {sortedTags.map(([tag, count]) => (
            <li key={tag}>
              <Link
                href={`/blog?tag=${tag}`}
                className={cn(
                  'flex justify-between items-center text-sm px-3 py-2 rounded-lg transition-all border border-transparent',
                  currentTag === tag
                    ? 'bg-primary-soft text-foreground font-semibold shadow-sm'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary-soft',
                )}
              >
                <span>{tag}</span>
                <span
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full border border-transparent',
                    currentTag === tag
                      ? 'bg-primary-soft text-foreground'
                      : 'bg-muted text-muted-foreground border-border',
                  )}
                >
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
