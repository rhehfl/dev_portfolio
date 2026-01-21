import PreloadHover from '@/components/common/PreloadHover';
import { CaseStudy } from '@/components/project/card/CaseStudy';
import KeyAchievements from '@/components/project/card/KeyAchievements';
import ProjectFeature from '@/components/project/card/ProjectFeature';
import {
  PORTFOLIO_INTRO,
  PORTFOLIO_PERFORMANCE,
  PORTFOLIO_TROUBLESHOOTING,
} from '@/components/project/dev-portfolio/data'; // 위에서 작성한 data 파일 import
import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';

const PRELOAD_IMAGES = [
  '/dev-portfolio/preview.png',
  // 추가 스크린샷이 있다면 여기에 경로 추가
];

export default function DevPortfolio() {
  return (
    <div className="p-5 h-full ">
      <div className="my-8"></div>
      <div className="lg:p-10">
        <ProjectHeader
          title="Dev Portfolio"
          description="Next.js 16과 React 19로 구축한 인터랙티브 포트폴리오"
          techStack={['Next.js', 'TypeScript', 'Framer Motion', 'Zustand']}
          period="2025.01 - 2025.02 (진행 중)"
          role="프론트엔드 개발 및 UI/UX 디자인"
          teamSize="1명 (개인 프로젝트)"
        />
        <ProjectLinks github="https://github.com/rhehfl/dev_portfolio" />

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          트러블 슈팅
        </h3>
        <section className="flex flex-col gap-8">
          {PORTFOLIO_TROUBLESHOOTING.map((study, idx) => (
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
          {PORTFOLIO_PERFORMANCE.map((study, idx) => (
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
