import { notFound } from 'next/navigation';

import Coko from '@/components/project/coko/Coko';
import DevPortfolio from '@/components/project/dev-portfolio/Dev_Portfolio';
import DoranDoran from '@/components/project/doran-doran/Doran-Doran';
import PPick from '@/components/project/p-pick/P-Pick';

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
