import { CaseStudy } from '@/components/project/card/CaseStudy';
import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';
import {
  DORAN_CONTRIBUTIONS,
  DORAN_INTRO,
  DORAN_PERFORMANCE,
  DORAN_TROUBLESHOOTING,
} from '@/components/project/doran-doran/data';
import PreloadHover from '@/components/common/PreloadHover';
import ProjectFeature from '@/components/project/card/ProjectFeature';
import KeyAchievements from '@/components/project/card/KeyAchievements';

const PRELOAD_IMAGES = [
  '/doran-doran/doran1.png',
  '/doran-doran/doran2.png',
  '/doran-doran/doran4.png',
];
export default function DoranDoran() {
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

        <PreloadHover images={PRELOAD_IMAGES} delay={100}>
          <ProjectFeature {...DORAN_INTRO} />
        </PreloadHover>

        <KeyAchievements items={DORAN_CONTRIBUTIONS} />

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          트러블 슈팅
        </h3>
        <section className="flex flex-col gap-8">
          {DORAN_TROUBLESHOOTING.map((study, idx) => (
            <CaseStudy key={idx}>
              <CaseStudy.Header>{study.title}</CaseStudy.Header>
              {study.contents}
            </CaseStudy>
          ))}
        </section>

        <h3 className="text-2xl my-5 font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          성능 개선 및 아키텍처
        </h3>
        <section className="flex flex-col gap-8">
          {DORAN_PERFORMANCE.map((study, idx) => (
            <CaseStudy key={idx}>
              <CaseStudy.Header>{study.title}</CaseStudy.Header>
              {study.contents}
            </CaseStudy>
          ))}
        </section>
      </div>
    </div>
  );
}
