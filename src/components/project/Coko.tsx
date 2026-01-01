import ImprovementCard from '@/components/project/card/ImprovementCard';
import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';
import ProjectTroubleShooting from '@/components/project/detail/ProjectTroubleShooting';
import { NavButton, NavGroup } from '@/components/ui/navTab';
import { IMPROVEMENT_DATA, TROUBLESHOOTING_DATA } from '@/data/coko';

export default function Coko() {
  return (
    <div className="p-5 h-full">
      <div className="lg:p-10 ">
        <NavGroup>
          <NavButton href="#intro">소개</NavButton>
          <NavButton href="#projects">트러블 슈팅</NavButton>
          <NavButton href="#improvements">성능 개선</NavButton>
        </NavGroup>
        <ProjectHeader
          id="intro"
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
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          트러블 슈팅
        </h3>
        <section className="flex flex-col gap-8 ">
          {TROUBLESHOOTING_DATA.map((item, index) => (
            <ProjectTroubleShooting key={index} {...item} />
          ))}
        </section>
        <h3 className="text-2xl my-5 font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          성능 개선
        </h3>
        <section className="flex flex-col gap-8 ">
          {IMPROVEMENT_DATA.map((item, index) => (
            <ImprovementCard key={index} {...item} />
          ))}
        </section>
      </div>
    </div>
  );
}
