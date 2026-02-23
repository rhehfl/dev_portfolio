'use client';
import ProjectHeader from '@/features/project/components/ProjectHeader';
import ProjectLinks from '@/features/project/components/ProjectLinks';

import ProjectFeature from '@/features/project/components/ProjectFeature';
import KeyAchievements from '@/features/project/components/KeyAchievements';
import {
  DORAN_CONTRIBUTIONS,
  dorandoranPerformanceData,
  dorandoranTroubleshootingData,
} from '@/features/project/contents/doran-doran/data';
import { useReadmeContent } from '@/features/project/hooks/useReadmeContetnt';
import ImagePreloader from '@/components/common/ImagePreloader';
import { ProjectNavigation } from '@/features/project/components/ProjectNavigation';
import ProjectDetailRenderer from '@/features/project/components/ProjectDetailRenderer';
const PRELOAD_IMAGES = [
  'https://github.com/user-attachments/assets/606374e7-bb1e-4d33-a714-873225720984',
  'https://github.com/user-attachments/assets/3d921d3d-b7f1-468f-9943-2435420b1031',
  'https://github.com/user-attachments/assets/f7ccb6d9-482a-4c98-b1bf-85ba46313b3d',
  'https://github.com/user-attachments/assets/b08a4267-e15e-4607-88bf-1a9164ae8158',
];
export default function DoranDoran() {
  const readmeContent = useReadmeContent({
    repo: 'doran-doran',
    branch: 'main',
  });
  return (
    <div className="p-5 h-full">
      <div className="lg:p-10">
        <ProjectHeader
          title="Doran-Doran"
          description="Google Gemini 기반 AI 페르소나 및 실시간 사용자 채팅 플랫폼"
          techStack={[
            'Next.js',
            'TypeScript',
            'NestJS',
            'Tanstack Query',
            'Tailwind CSS',
          ]}
          period="2024.10 - 2025.12"
          role="풀스택 (1인 개발)"
          teamSize="개인 프로젝트"
        />
        <ProjectLinks github="https://github.com/rhehfl/doran-doran" />

        <ImagePreloader images={PRELOAD_IMAGES} />
        <ProjectFeature readmeContent={readmeContent} />

        <KeyAchievements items={DORAN_CONTRIBUTIONS} />

        <h3 className="text-2xl font-bold text-foreground mb-6 border-l-4 border-primary pl-3">
          트러블 슈팅
        </h3>
        <section className="flex flex-col gap-8">
          {dorandoranTroubleshootingData.map((data) => (
            <ProjectDetailRenderer key={data.id} data={data} />
          ))}
        </section>

        <h3 className="text-2xl my-5 font-bold text-foreground mb-6 border-l-4 border-primary pl-3">
          성능 개선 및 아키텍처
        </h3>
        <section className="flex flex-col gap-8">
          {dorandoranPerformanceData.map((data) => (
            <ProjectDetailRenderer key={data.id} data={data} />
          ))}
        </section>
        <ProjectNavigation currentDetailUrl="doran-doran" />
      </div>
    </div>
  );
}
