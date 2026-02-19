'use client';
import ProjectHeader from '@/features/project/components/ProjectHeader';
import ProjectLinks from '@/features/project/components/ProjectLinks';
import PORTFOLIO_TROUBLESHOOTING from '@/features/project/contents/dev-portfolio/troubleshooting.mdx';
import PORTFOLIO_PERFORMANCE from '@/features/project/contents/dev-portfolio/performance.mdx';
import { ProjectNavigation } from '@/features/project/components/ProjectNavigation';

export default function DevPortfolio() {
  return (
    <div className="p-5 h-full ">
      <div className="lg:p-10">
        <ProjectHeader
          title="Dev Portfolio"
          description="Next js 기반 포트폴리오"
          techStack={['Next.js', 'TypeScript', 'Framer Motion']}
          period="2025.01 - 2025.02 (진행 중)"
          role="프론트엔드 개발"
          teamSize="1명 (개인 프로젝트)"
        />
        <ProjectLinks github="https://github.com/rhehfl/dev_portfolio" />

        <h3 className="text-2xl font-bold text-foreground mb-6 border-l-4 border-primary pl-3">
          트러블 슈팅
        </h3>
        <section className="flex flex-col gap-8">
          <PORTFOLIO_TROUBLESHOOTING />
        </section>

        <h3 className="text-2xl my-5 font-bold text-foreground mb-6 border-l-4 border-primary pl-3">
          성능 개선
        </h3>
        <section className="flex flex-col gap-8">
          <PORTFOLIO_PERFORMANCE />
        </section>
        <ProjectNavigation currentDetailUrl="dev-portfolio" />
      </div>
    </div>
  );
}
