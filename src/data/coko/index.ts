import { TroubleShootingItem } from '@/components/project/detail/ProjectTroubleShooting';

export const TroubleShootingData: TroubleShootingItem[] = [
  {
    title: 'ref 콜백 함수 전달로 인한 무한 리렌더링 이슈 해결',
    problem:
      '팝업 컴포넌트 마운트 시 무한 리렌더링으로 인한 브라우저 프리징 발생',
    recognition:
      'React의 `ref` 콜백은 렌더링 시마다 새로운 참조가 전달되면 재실행됨. 내부에서 상태를 변경하고 있어 **[상태 변경 → 리렌더링 → ref 재실행 → 다시 상태 변경]** 의 무한 루프 형성.',
    process: [
      '`ref` 콜백 함수를 `useCallback`으로 감싸 함수 참조가 유지되도록 수정함',
    ],
    result: ['팝오버가 열릴 때 발생하던 무한 렌더링 현상이 완전히 제거'],
  },
  {
    title: '조건부 렌더링 구조 개선',
    problem:
      '로그인 창, 결과 창 등 여러 종류의 모달을 삼항 연산자로 렌더링 중 유지보수성등의 문제로 리팩토링 필요성 인지',
    recognition: [
      '초기에는 `Funnel`패턴을 도입했으나 순차적인 흐름을 관리하는 `Funnel`패턴 특성상 케이스에 부합하지 않다고 판단',
      '모든 모달이 순차적이지 않다는 특성을 깨닫고 조건부 렌더링을 선언적으로 할 수 있는 방법을 모색',
    ],
    process: [
      '흐름이 없는 모달(로그인 유도, 결과 창 등)은 **SwitchCase** 커스텀 컴포넌트로 리팩토링하여 선언적인 조건부 렌더링 구현',
    ],
    result: [
      '모달 추가 시 기존 조건 로직을 수정할 필요가 없는 **확장 가능한 구조** 확보',
      '상황에 맞는 적절한 디자인 패턴 선택의 중요성을 체득',
    ],
    codeSnippet: `
    \`\`\`tsx
      //Before
        {quizzes.length === totalResults.length ? (
          <TotalResults ... />
        ) : (
          <Result .../>
        )}

      //After
       <SwitchCase
          value={step}
          caseBy={{
            result: <Result .../>
            loginPrompt: <LoginPrompt .../>,
            login: <Login .../>,
            totalResult: <TotalResults .../>,
            partClear: <PartClear .../>,
          }}
        />
    `,
  },
];
