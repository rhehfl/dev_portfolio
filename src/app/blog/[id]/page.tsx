import ViewCounter from '@/components/blog/ViewCounter';
import MarkDownWrapper from '@/components/common/MarkDownWrapper';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export default async function BlogPost({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto py-10 prose lg:prose-xl">
      <ViewCounter id={id} />
      <h1>{post.title}</h1>
      <div className="text-gray-500 mb-8">
        {new Date(post.created_at).toLocaleDateString()} 작성
      </div>
      <MarkDownWrapper>{post.content}</MarkDownWrapper>
    </article>
  );
}
