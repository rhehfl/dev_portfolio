// 1. 성능 최적화 및 구조 개선 데이터
export const IMPROVEMENT_DATA = [
  {
    title: '라우트 기반 코드 스플리팅 적용',
    problem:
      '초기 진입 시 전체 페이지의 리소스를 한 번에 다운로드하여 초기 번들 사이즈가 비대해지고, 이로 인해 FCP 시간이 지연될  우려가 있었습니다.',
    solution: [
      'React의 `lazy`와 동적 `import()`를 활용하여 페이지 단위로 컴포넌트를 분리했습니다.',
      '사용자가 해당 경로에 접근할 때만 필요한 리소스를 로드하도록 라우터를 재설계했습니다.',
    ],
    result:
      '초기 로딩 시 불필요한 자바스크립트 실행을 방지하여 초기 진입 속도를 개선하고, 네트워크 리소스 비용을 절감하는 효율적인 아키텍처를 구축했습니다.',
  },
  {
    title: '이미지 프리로딩 훅 구현을 통한 UX 개선',
    problem:
      '특정 페이지 진입이나 화면이 전환될 때 이미지가 뒤늦게 로딩되어 깜빡이거나 레이아웃이 밀리는 현상(Layout Shift)이 발생하여 사용자 몰입을 방해했습니다.',
    solution: [
      '`usePreloadImages` 커스텀 훅을 제작하여 `Promise.allSettled`로 주요 이미지 리소스를 병렬로 미리 캐싱했습니다.',
      '`Image` 객체를 생성하여 브라우저 캐시에 이미지를 미리 적재한 뒤 화면을 렌더링하도록 흐름을 제어했습니다.',
    ],
    result:
      '화면 전환 시 이미지가 즉시 표시되도록 하여 시각적 끊김 없는 부드러운 사용자 경험을 제공했습니다.',
  },
  {
    title: '복잡한 단계별 UI 관리를 위한 Funnel 훅 설계',
    problem:
      '회원가입, 튜토리얼 등 여러 단계(Step)로 이루어진 UI의 상태 관리가 분산되어 있고, 흐름 제어 로직이 컴포넌트에 강하게 결합되어 유지보수가 어려웠습니다.',
    solution: [
      '토스 라이브러리에서 영감을 받아 `useFunnel` 훅을 직접 구현하여 상태 관리와 UI 렌더링 로직을 분리했습니다.',
      '제네릭 타입을 활용하여 스텝 이름을 타입 안전하게 관리하고, `Funnel.Step` 컴포넌트로 선언적인 코드 작성을 가능하게 했습니다.',
    ],
    result:
      '단계별 흐름 제어 로직을 한 곳으로 응집시켜 비즈니스 로직의 파악이 쉬워졌으며, 팀원들이 동일한 패턴으로 복잡한 UI를 쉽게 구현할 수 있게 되었습니다.',
  },
] as const;

// 2. 트러블 슈팅 데이터
export const TROUBLESHOOTING_DATA = [
  {
    title: '선언적 에러 처리를 통한 사용자 경험 방어',

    problem:
      'API 요청 실패나 런타임 에러 발생 시, 전체 화면이 흰색으로 멈추거나(White Screen) 사용자에게 알 수 없는 에러가 노출되어 경험을 해침.',
    recognition:
      '모든 컴포넌트 내부에서 `try-catch`로 에러를 잡는 것은 비효율적이며, 에러 발생 시 Fallback UI를 보여주어 이탈을 막아야 함.',
    process: [
      '`react-error-boundary` 라이브러리를 도입하여 컴포넌트를 구현.',
      '퀴즈 페이지와 같이 중요한 비즈니스 로직이 있는 섹션을 감싸서 부분적인 에러가 전체 앱을 중단시키지 않도록 격리.',
      '`FallbackComponent`로 `NotFound` 또는 재시도 버튼이 있는 UI를 연결.',
    ],
    result:
      '예기치 못한 에러가 발생하더라도 앱이 멈추지 않고, 사용자에게 적절한 안내 UI를 제공하여 서비스의 안정성을 확보함.',
    codeSnippet: `
    \`\`\`ts
import { ErrorBoundary } from 'react-error-boundary';

export default function QuizErrorBoundary({ children }: PropsWithChildren) {
  // 에러 발생 시 NotFound 컴포넌트를 대신 렌더링하여 앱 중단 방지
  return <ErrorBoundary FallbackComponent={NotFound}>{children}</ErrorBoundary>;
}

    `,
  },
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
] as const;
