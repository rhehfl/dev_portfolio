import MarkDownWrapper from '@/components/common/MarkDownWrapper';
import ViewCounter from '@/features/blog/components/ViewCounter';
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
interface Props {
  params: Promise<{ id: string }>;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  // DB에서 글 정보 가져오기 (제목, 내용, 썸네일, 태그, 작성일)
  const { data: post } = await supabase
    .from('posts')
    .select('title, content, thumbnail, tags, created_at')
    .eq('id', id)
    .single();

  if (!post) {
    return {
      title: '페이지를 찾을 수 없음',
    };
  }

  const description =
    post.content
      .replace(/[#*`\[\]()]/g, '')
      .replace(/\n/g, ' ')
      .slice(0, 140) + '...';

  const images = post.thumbnail
    ? [{ url: post.thumbnail, width: 1200, height: 630 }]
    : [];

  return {
    title: post.title,

    description: description,

    keywords: post.tags ?? [],

    openGraph: {
      title: post.title,
      description: description,
      type: 'article',
      publishedTime: post.created_at,
      authors: ['구도윤'],
      tags: post.tags ?? [],
      images: images,
    },

    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: images,
    },
  };
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto py-10 prose lg:prose-xl prose-neutral dark:prose-invert text-foreground">
      <ViewCounter id={id} />
      <h1 className="leading-loose">{post.title}</h1>
      <div className="text-muted-foreground mb-8">
        {new Date(post.created_at).toLocaleDateString()} 작성
      </div>
      <MarkDownWrapper>{post.content}</MarkDownWrapper>
    </article>
  );
}
