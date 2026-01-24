import Coko from '@/features/project/contents/coko/Coko';
import DevPortfolio from '@/features/project/contents/dev-portfolio/Dev_Portfolio';
import DoranDoran from '@/features/project/contents/doran-doran/Doran-Doran';
import PPick from '@/features/project/contents/p-pick/P-Pick';
import { notFound } from 'next/navigation';
import { JSX } from 'react';

const PROJECT_COMPONENTS: Record<string, JSX.Element> = {
  coko: <Coko />,
  'p-pick': <PPick />,
  'doran-doran': <DoranDoran />,
  'dev-portfolio': <DevPortfolio />,
  'modern-kit': <DevPortfolio />,
};

interface ProjectRendererProps {
  id: string;
}

export default function ProjectRenderer({ id }: ProjectRendererProps) {
  const isValidProjectId = (key: string): key is string => {
    return Object.keys(PROJECT_COMPONENTS).includes(key);
  };

  if (!isValidProjectId(id)) {
    notFound();
  }

  return PROJECT_COMPONENTS[id];
}
