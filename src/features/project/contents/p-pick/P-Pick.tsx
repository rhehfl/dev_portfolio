'use client';

import ImagePreloader from '@/components/common/ImagePreloader';
import KeyAchievements from '@/features/project/components/KeyAchievements';
import ProjectDetailRenderer from '@/features/project/components/ProjectDetailRenderer';
import ProjectFeature from '@/features/project/components/ProjectFeature';
import ProjectHeader from '@/features/project/components/ProjectHeader';
import ProjectLinks from '@/features/project/components/ProjectLinks';
import { ProjectNavigation } from '@/features/project/components/ProjectNavigation';
import {
  PPICK_CONTRIBUTIONS,
  projectPerformanceData,
} from '@/features/project/contents/p-pick/data';
import { useReadmeContent } from '@/features/project/hooks/useReadmeContent';
const PRELOAD_IMAGES = [
  'https://github.com/user-attachments/assets/9d738ca2-4279-439e-b6bf-e8fac11cd640',
  'https://github.com/rhehfl.png',
  'https://avatars.githubusercontent.com/u/117448747?v=4',
];

export default function PPick() {
  const { content: readmeContent } = useReadmeContent({
    branch: 'develop',
    repo: 'P_PICK',
  });
  return (
    <div className="p-5 h-full ">
      <div className="lg:p-10">
        <ProjectHeader
          title="P-Pick"
          description="한국관광공사 Open API를 활용해 숏 폼 형식으로 주변 여행지를 둘러볼 수 있는 사이트"
          techStack={[
            'React',
            'TypeScript',
            'Vite',
            'Zustand',
            'Tanstack Query',
            'Tailwind CSS',
          ]}
          period="2025.06 ~ 2025.09 (3개월)"
          role="프론트엔드 개발"
          teamSize="2명"
        />
        <ProjectLinks github="https://github.com/P-pick/front" />
        <ImagePreloader images={PRELOAD_IMAGES} />
        <ProjectFeature readmeContent={readmeContent || ''} />
        <KeyAchievements items={PPICK_CONTRIBUTIONS} />
        <h3 className="text-2xl my-5 font-bold text-foreground mb-6 border-l-4 border-primary pl-3">
          성능 개선
        </h3>
        <section className="flex flex-col gap-8 ">
          {projectPerformanceData.map((data) => (
            <ProjectDetailRenderer key={data.id} data={data} />
          ))}
        </section>
        <ProjectNavigation currentDetailUrl="p-pick" />
      </div>
    </div>
  );
}
