'use client';

import KeyAchievements from '@/features/project/components/KeyAchievements';
import ProjectFeature from '@/features/project/components/ProjectFeature';
import ProjectHeader from '@/features/project/components/ProjectHeader';
import ProjectLinks from '@/features/project/components/ProjectLinks';
import CokoTroubleshooting from '@/features/project/contents/coko/coko-troubleshooting.mdx';
import CokoPerformance from '@/features/project/contents/coko/coko-performance.mdx';
import { COKO_CONTRIBUTIONS } from '@/features/project/contents/coko/data';
import { useReadmeContent } from '@/features/project/hooks/useReadmeContetnt';
import ImagePreloader from '@/components/common/ImagePreloader';
import { ProjectNavigation } from '@/features/project/components/ProjectNavigation';

const PRELOAD_IMAGES = [
  'https://github.com/user-attachments/assets/c9dc7ee4-c3e1-471d-ae2a-65d45bf5a782',
  'https://github.com/user-attachments/assets/7ec48940-caa9-4544-b78a-ce7bd6005d4c',
  'https://github.com/user-attachments/assets/b2a7859a-9bdb-404b-b022-01dbbb6ad715',
  'https://github.com/user-attachments/assets/ab391b9d-50ca-4848-8ec7-78f31321da4e',
  'https://github.com/user-attachments/assets/a2c37db9-4a67-4735-9318-536938741c3f',
  'https://github.com/user-attachments/assets/154be841-bf5b-4d71-acd7-5ad670ea5bd2',
];

export default function Coko() {
  const readmeContent = useReadmeContent({
    repo: '8term-coko-Front',
    branch: 'develop',
  });
  return (
    <div className="p-5 h-full ">
      <div className="my-8"></div>
      <div className="lg:p-10">
        <ProjectHeader
          title="CoKo"
          description="JS를 재미있게 학습하기 위한 퀴즈 기반 교육 웹 사이트"
          techStack={[
            'React',
            'TypeScript',
            'Vite',
            'Zustand',
            'Tanstack Query',
            'Styled-Components',
          ]}
          period="2024.09 - 2025.03 (6개월)"
          role="프론트엔드 팀장, 어드민 페이지 개발"
          teamSize="6명"
        />
        <ProjectLinks github="https://github.com/modern-agile-team/8term-coko-Front" />
        <ImagePreloader images={PRELOAD_IMAGES} />
        <ProjectFeature readmeContent={readmeContent} />
        <KeyAchievements items={COKO_CONTRIBUTIONS} />
        <h3 className="text-2xl font-bold text-foreground mb-6 border-l-4 border-primary pl-3">
          트러블 슈팅
        </h3>
        <section className="flex flex-col gap-8">
          <CokoTroubleshooting />
        </section>

        <h3 className="text-2xl my-5 font-bold text-foreground mb-6 border-l-4 border-primary pl-3">
          성능 개선
        </h3>
        <section className="flex flex-col gap-8">
          <CokoPerformance />
        </section>
        <ProjectNavigation currentDetailUrl="coko" />
      </div>
    </div>
  );
}
