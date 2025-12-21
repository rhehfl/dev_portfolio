import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';
import ProjectTroubleShooting from '@/components/project/detail/ProjectTroubleShooting';

export default function Coko() {
  return (
    <div className="p-5">
      <div className="p-10">
        <ProjectHeader
          title="CoKo"
          description="JS를 재미있게 학습하기 위한 프로젝트"
          techStack={[
            'React',
            'TypeScript',
            'Vite',
            'Zustand',
            'Tanstack Query',
            'Styled-Components',
          ]}
          period="2024.09 - 2025.03 (6개월)"
          role="Frontend Lead, 핵심 로직 구현"
          teamSize="6명"
        />
        <ProjectLinks github="https://github.com/modern-agile-team/8term-coko-Front" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          🔧 Trouble Shooting
        </h3>
        <ProjectTroubleShooting
          items={[
            {
              title: 'Suspense 에러 핸들링',
              problem: '비동기 컴포넌트 에러가 런타임에서야 발견됨',
              solution: 'ESLint 플러그인 제작하여 빌드 타임 감지',
              result: '런타임 에러 0건 달성',
              codeSnippet: `module.exports = { rules: { ... } }`,
            },
          ]}
        />
        <ProjectTroubleShooting
          items={[
            {
              title: 'Suspense 에러 핸들링',
              problem: '비동기 컴포넌트 에러가 런타임에서야 발견됨',
              solution: 'ESLint 플러그인 제작하여 빌드 타임 감지',
              result: '런타임 에러 0건 달성',
              codeSnippet: `module.exports = { rules: { ... } }`,
            },
          ]}
        />
      </div>
    </div>
  );
}
