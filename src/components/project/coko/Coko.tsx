import PreloadHover from '@/components/common/PreloadHover';
import { CaseStudy } from '@/components/project/card/CaseStudy';
import KeyAchievements from '@/components/project/card/KeyAchievements';
import ProjectFeature from '@/components/project/card/ProjectFeature';
import {
  COKO_CONTRIBUTIONS,
  COKO_INTRO,
  COKO_PERFORMANCE,
  COKO_TROUBLESHOOTING,
} from '@/components/project/coko/data';
import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';

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
        <ProjectFeature {...COKO_INTRO} />
        <KeyAchievements items={COKO_CONTRIBUTIONS} />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          트러블 슈팅
        </h3>
        <section className="flex flex-col gap-8">
          {COKO_TROUBLESHOOTING.map((study, idx) => (
            <CaseStudy key={idx}>
              <CaseStudy.Header>{study.title}</CaseStudy.Header>
              {study.contents}
            </CaseStudy>
          ))}
        </section>

        <h3 className="text-2xl my-5 font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          성능 개선
        </h3>
        <section className="flex flex-col gap-8">
          {COKO_PERFORMANCE.map((study, idx) => (
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
