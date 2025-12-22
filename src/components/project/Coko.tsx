import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';
import ProjectTroubleShooting from '@/components/project/detail/ProjectTroubleShooting';

export default function Coko() {
  return (
    <div className="p-5 overflow-y-scroll h-full">
      <div className="p-10 ">
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
          role="프론트엔드 팀장"
          teamSize="6명"
        />
        <ProjectLinks github="https://github.com/modern-agile-team/8term-coko-Front" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          🔧 Trouble Shooting
        </h3>
        <ProjectTroubleShooting
          title="ref 콜백 함수 전달로 인한 무한 리렌더링 이슈 해결"
          problem="팝오버 컴포넌트가 열릴 때 무한 리렌더링이 발생하여 페이지가 멈추는 현상 발생"
          recognition={[
            'ref 콜백은 렌더링마다 새로운 함수 참조가 생성되면 다시 실행된다는 점을 인지',
            'ref 콜백 내부에서 상태를 변경하면서 렌더링 → ref 재호출 → 상태 변경의 무한 사이클이 발생한다고 판단함',
          ]}
          process={[
            'ref 콜백 함수를 useCallback으로 감싸 함수 참조가 유지되도록 수정함',
          ]}
          result={[
            '팝오버가 열릴 때 발생하던 무한 렌더링 현상이 완전히 제거됨',
            'React에서 함수 참조 변경이 렌더링과 부수 효과에 직접적인 영향을 준다는 것을 경험하고 이해함',
          ]}
          codeSnippet={`const QuizPopoverCallbackRef = useCallback((el: HTMLDivElement) => {
    if (globalIndex === 0) {
      getClientRectRefCallback<HTMLDivElement>(el);
    }
    popoverRef.current = el;
  }, []);
  //...생략
  
      {isOpen && (
        <S.SpeechBubble
          id="quiz-popover"
          ref={QuizPopoverCallbackRef}
          onClick={e => e.stopPropagation()}
          $bgColor={COLORS[globalIndex % 4]}
        >`}
        />
      </div>
      asdasdasshh
    </div>
  );
}
