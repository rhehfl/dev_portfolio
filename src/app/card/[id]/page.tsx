import { notFound } from 'next/navigation';
import Coko from '@/components/project/Coko';
import DoranDoran from '@/components/project/Doran-Doran';
import PPick from '@/components/project/P-Pick';
import DevPortfolio from '@/components/project/Dev_Portfolio';

type ProjectKey = 'coko' | 'p-pick' | 'doran-doran' | 'dev-portfolio';

const cardDetailMap: Record<ProjectKey, React.ReactNode> = {
  coko: <Coko />,
  'p-pick': <PPick />,
  'doran-doran': <DoranDoran />,
  'dev-portfolio': <DevPortfolio />,
};

interface CardDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CardDetailPage({ params }: CardDetailPageProps) {
  const { id } = await params;

  const isValidProject = (key: string): key is ProjectKey => {
    return Object.keys(cardDetailMap).includes(key);
  };

  if (!isValidProject(id)) {
    notFound();
  }

  return <>{cardDetailMap[id]}</>;
}
