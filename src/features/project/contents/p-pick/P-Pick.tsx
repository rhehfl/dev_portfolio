import PreloadHover from '@/components/common/PreloadHover';
import CaseStudy from '@/features/project/components/CaseStudy';
import KeyAchievements from '@/features/project/components/KeyAchievements';
import ProjectFeature from '@/features/project/components/ProjectFeature';
import ProjectHeader from '@/features/project/components/ProjectHeader';
import ProjectLinks from '@/features/project/components/ProjectLinks';
import {
  PPICK_INTRO,
  PPICK_CONTRIBUTIONS,
} from '@/features/project/contents/p-pick/data';
import PERFORMANCE from '@/features/project/contents/p-pick/performance.mdx';
const PRELOAD_IMAGES = [
  '/p-pick/ppick1.png',
  '/p-pick/ppick2.png',
  '/p-pick/ppick3.png',
  '/p-pick/ppick4.png',
];

export default function PPick() {
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
        <PreloadHover images={PRELOAD_IMAGES} delay={100}>
          <ProjectFeature {...PPICK_INTRO} />
        </PreloadHover>
        <KeyAchievements items={PPICK_CONTRIBUTIONS} />
        <h3 className="text-2xl my-5 font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          성능 개선
        </h3>
        <section className="flex flex-col gap-8 ">
          <PERFORMANCE />
        </section>
      </div>
    </div>
  );
}
