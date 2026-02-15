import Editor from '@/features/blog/components/Editor';
export default async function EditPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <Editor postId={id} />;
}
