import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';
import ProjectTroubleShooting from '@/components/project/detail/ProjectTroubleShooting';

export default function Coko() {
  return (
    <div className="p-5">
      <div className="p-10">
        <ProjectHeader
          title="CoKo (Co-Coding)"
          description="개발 지식을 퀴즈와 미니 게임으로 학습하는 인터랙티브 웹 플랫폼"
          tags={['React 18', 'TypeScript', 'Vite', 'Zustand']}
          period="2024.01 - 2024.02 (6주)"
          role="Frontend Lead, 핵심 로직 구현"
          teamSize="Frontend 4명, Backend 2명"
        />

        {/* 2. 링크 블록 */}
        <ProjectLinks demo="https://coko.run" github="https://github.com/..." />

        {/* 4. 트러블 슈팅 블록 */}
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
