// src/features/project/components/RelatedBlogSection.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar } from 'lucide-react';

interface BlogPostPreview {
  title: string;
  description: string;
  date: string;
  thumbnailUrl?: string;
  tags?: string[];
  href: string;
}

interface RelatedBlogSectionProps {
  posts: BlogPostPreview[];
}

export function RelatedBlogSection({ posts }: RelatedBlogSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-20 space-y-6">
      <div className="flex items-center gap-2 border-b pb-2 border-border/40">
        <BookOpen className="w-5 h-5 text-primary" />
        <h4 className="text-xl font-bold tracking-tight">관련 블로그 포스트</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, idx) => (
          <Link key={idx} href={post.href} className="group">
            <Card className="h-full overflow-hidden border-border/60 hover:border-primary/50 hover:shadow-md transition-all duration-300 bg-card/50 backdrop-blur-sm">
              {post.thumbnailUrl && (
                <div className="relative w-full h-40 overflow-hidden">
                  <Image
                    src={post.thumbnailUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
                <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
                {post.tags && (
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] px-2 py-0"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
