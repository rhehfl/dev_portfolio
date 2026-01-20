import { CaseStudy } from '@/components/project/card/CaseStudy';
import TeamCulture from '@/components/project/card/TeamCulture';
import {
  COKO_PERFORMANCE,
  COKO_TROUBLESHOOTING,
} from '@/components/project/coko/data';
import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';

export default function Coko() {
  return (
    <div className="p-5 h-full ">
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
        <TeamCulture
          items={[
            {
              title: 'DX 개선',
              tag: 'Productivity',
              points: [
                'Github Actions를 이용한 CI/CD 자동화 구축',
                '어드민 페이지를 통한 콘텐츠 관리',
              ],
            },
            {
              title: '협업 프로세스',
              tag: 'Process',
              points: [
                'PR, Issue 템플릿 작성 및 코드 리뷰 체크리스트 도입',
                'Swagger를 활용한 API 명세',
                'Notion 기반의 스프린트 관리',
                'Figma를 활용한 디자이너와의 협업',
              ],
            },
          ]}
        />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          트러블 슈팅
        </h3>
        <section className="flex flex-col gap-8">
          {COKO_TROUBLESHOOTING.map((study, idx) => (
            <CaseStudy key={idx}>
              <CaseStudy.Header>{study.title}</CaseStudy.Header>
              {/* JSX 자체를 렌더링 */}
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
