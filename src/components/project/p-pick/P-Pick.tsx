import { CaseStudy } from '@/components/project/card/CaseStudy';
import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';
import { PERFORMANCE } from '@/components/project/p-pick/data';

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

        <h3 className="text-2xl my-5 font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          성능 개선
        </h3>
        <section className="flex flex-col gap-8 ">
          {PERFORMANCE.map((item, idx) => (
            <CaseStudy key={idx}>
              <CaseStudy.Header>{item.title}</CaseStudy.Header>
              {item.contents}
            </CaseStudy>
          ))}
        </section>
      </div>
    </div>
  );
}
