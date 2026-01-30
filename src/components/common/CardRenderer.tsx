import ModernAgile from '@/features/experience/contents/modern-agile/ModernAgile';
import ModernKit from '@/features/hero/contents/modern-kit/ModernKit';
import Coko from '@/features/project/contents/coko/Coko';
import DevPortfolio from '@/features/project/contents/dev-portfolio/Dev_Portfolio';
import DoranDoran from '@/features/project/contents/doran-doran/Doran-Doran';
import PPick from '@/features/project/contents/p-pick/P-Pick';
import { notFound } from 'next/navigation';

const PROJECT_COMPONENTS: Record<string, React.ReactElement> = {
  coko: <Coko />,
  'p-pick': <PPick />,
  'doran-doran': <DoranDoran />,
  'dev-portfolio': <DevPortfolio />,
  'modern-kit': <ModernKit />,
  'modern-agile': <ModernAgile />,
};

interface CardRendererProps {
  id: string;
}

export default function CardRenderer({ id }: CardRendererProps) {
  const isValidProjectId = (key: string): key is string => {
    return Object.keys(PROJECT_COMPONENTS).includes(key);
  };

  if (!isValidProjectId(id)) {
    notFound();
  }

  return PROJECT_COMPONENTS[id];
}
