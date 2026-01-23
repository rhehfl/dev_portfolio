import ProjectRenderer from '@/features/project/components/ProjectRenderer';

interface CardDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CardDetailPage({ params }: CardDetailPageProps) {
  const { id } = await params;

  return <ProjectRenderer id={id} />;
}
