import CardRenderer from '@/components/common/CardRenderer';

interface CardDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CardDetailPage({ params }: CardDetailPageProps) {
  const { id } = await params;

  return <CardRenderer id={id} />;
}
