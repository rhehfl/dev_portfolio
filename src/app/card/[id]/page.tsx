import { notFound } from 'next/navigation';
import Coko from '@/components/project/Coko';
import DoranDoran from '@/components/project/Doran-Doran';
import PPick from '@/components/project/P-Pick';

type ProjectKey = 'coko' | 'p-pick' | 'doran-doran';

const cardDetailMap: Record<ProjectKey, React.ReactNode> = {
  coko: <Coko />,
  'p-pick': <PPick />,
  'doran-doran': <DoranDoran />,
};

// 1. Next.js 15에서는 params 타입이 Promise입니다.
interface CardDetailPageProps {
  params: Promise<{ id: string }>;
}

// 2. async 키워드 추가
export default async function CardDetailPage({ params }: CardDetailPageProps) {
  // 3. await로 params 안의 값을 꺼냅니다.
  const { id } = await params;

  const isValidProject = (key: string): key is ProjectKey => {
    return Object.keys(cardDetailMap).includes(key);
  };

  if (!isValidProject(id)) {
    notFound();
  }

  return <>{cardDetailMap[id]}</>;
}
