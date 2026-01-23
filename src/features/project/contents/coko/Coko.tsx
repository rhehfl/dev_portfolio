import PreloadHover from '@/components/common/PreloadHover';
import KeyAchievements from '@/features/project/components/KeyAchievements';
import ProjectFeature from '@/features/project/components/ProjectFeature';
import ProjectHeader from '@/features/project/components/ProjectHeader';
import ProjectLinks from '@/features/project/components/ProjectLinks';
import CokoTroubleshooting from '@/components/project/coko/coko-troubleshooting.mdx';
import CokoPerformance from '@/components/project/coko/coko-performance.mdx';
import {
  COKO_CONTRIBUTIONS,
  COKO_INTRO,
} from '@/features/project/contents/coko/data';

const PRELOAD_IMAGES = [
  '/coko/coko1.png',
  '/coko/coko2.png',
  '/coko/coko3.png',
  '/coko/coko4.png',
];

export default function Coko() {
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
        <PreloadHover images={PRELOAD_IMAGES}>
          <ProjectFeature {...COKO_INTRO} />
        </PreloadHover>
        <KeyAchievements items={COKO_CONTRIBUTIONS} />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          트러블 슈팅
        </h3>
        <section className="flex flex-col gap-8">
          <CokoTroubleshooting />
        </section>

        <h3 className="text-2xl my-5 font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          성능 개선
        </h3>
        <section className="flex flex-col gap-8">
          <CokoPerformance />
        </section>
      </div>
    </div>
  );
}
