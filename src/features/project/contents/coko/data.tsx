import { ProjectDetailData } from '@/features/project/types/projectDetail';
import { Code2, Rocket } from 'lucide-react';

export const COKO_INTRO = {
  overview: `코코(Coko) 기존의 프로그래밍 학습 사이트가 재미없다는 문제의식에서 출발하여 프로그래밍 언어(JavaScript)를
게임처럼 재밌고 몰입감 있게 배울 수 있도록 만든 모던 애자일 8기의 메인 프로젝트입니다.
`,
  features: [
    {
      title: '다양한 유형의 인터랙티브 퀴즈',
      description:
        'OX, 객관식, 빈칸 채우기, 코드 조합하기 등 다양한 유형의 퀴즈 로직을 자체 구현하여, 단순 암기가 아닌 참여형 학습 경험을 제공합니다.',
      mediaSrc: '/coko/coko1.png',
      isVideo: false,
    },
    {
      title: '동기 부여를 위한 캐릭터 상점',
      description:
        '퀴즈를 풀며 획득한 포인트로 나만의 캐릭터 스킨과 아이템을 구매하고 커스터마이징할 수 있는 상점 시스템입니다.',
      mediaSrc: '/coko/coko3.png',
      isVideo: false,
    },
    {
      title: '실시간 랭킹 및 경쟁 시스템',
      description:
        '전체 사용자 중 나의 순위를 실시간으로 확인하고, 매주 초기화되는 시즌제 랭킹을 통해 지속적인 학습 동기를 부여합니다.',
      mediaSrc: '/coko/coko2.png',
      isVideo: false,
    },
    {
      title: '나의 성장을 증명하는 뱃지 컬렉션',
      description:
        '특정 레벨 달성, 아이템 구매 등 특정 조건을 달성하면 잠겨있던 뱃지가 해금됩니다. 획득한 뱃지는 프로필에 전시하여 성취감을 시각화할 수 있습니다.',
      mediaSrc: '/coko/coko4.png',
      isVideo: false,
    },
  ],
};

export const COKO_CONTRIBUTIONS = [
  {
    title: 'Core Engineering & UX',
    tag: 'Core Engineering',
    icon: <Code2 className="w-5 h-5 text-blue-500" />,
    points: [
      'highlight.js 와 직접 구현한 라인 넘버링 로직을 결합하여 코드 가독성을 IDE 수준으로 개선',
      'Suspense와 ErrorBoundary를 활용한 비동기 처리 표준화 및 도메인 기반 폴더 구조 도입 주도',
    ],
  },
  {
    title: 'DevOps & Productivity',
    tag: 'Operational Efficiency',
    icon: <Rocket className="w-5 h-5 text-green-500" />,
    points: [
      'Swagger 수동 입력의 비효율을 해소하기 위해 Admin 페이지 개발, 데이터 CRUD 및 AWS S3 이미지 업로드 기능 구현',
      'GitHub Actions와 EC2를 연동하여 메인 브랜치 병합 시 자동 배포되는 파이프라인 설계',
    ],
  },
];

export const cokoTroubleshootingData: ProjectDetailData[] = [
  {
    id: 'ref-callback-rerender',
    header: 'ref 콜백 함수 전달로 인한 무한 리렌더링 이슈 해결',
    sections: [
      {
        title: '문제 상황',
        dotColor: 'bg-red-400',
        contents: [
          {
            type: 'figure',
            src: '/coko/t1.png',
            caption: '팝업 컴포넌트 마운트 시 무한 리렌더링 발생',
          },
          {
            type: 'text',
            value:
              '`DOM rect` 정보를 전역 상태로 저장하기 위해 콜백 ref로 DOM 노드에 접근해야 했습니다. 하지만 특정 팝업 컴포넌트가 마운트되면 **무한 리렌더링이 발생하여 브라우저가 프리징**되는 현상이 있었습니다.',
          },
        ],
      },
      {
        title: '원인 파악',
        dotColor: 'bg-orange-400',
        contents: [
          {
            type: 'text',
            value:
              'React의 `ref` 콜백은 렌더링마다 새로운 함수 참조가 전달되면 다시 실행됩니다. **ref 실행 → 상태 변경 → 리렌더링 → ref 재실행**의 무한 루프가 원인이었습니다.',
          },
        ],
      },
      {
        title: '해결 과정',
        dotColor: 'bg-blue-400',
        contents: [
          {
            type: 'figure',
            src: '/coko/t2.png',
            caption: 'ref 콜백을 useCallback으로 감싸 참조를 고정',
          },
        ],
      },
    ],
    result: 'useCallback을 활용한 ref 참조 안정화 및 브라우저 프리징 문제 제거',
  },
  {
    id: 'quiz-data-loss-prevention',
    header: '퀴즈 데이터 유실 방지',
    sections: [
      {
        title: '문제 상황',
        dotColor: 'bg-red-400',
        contents: [
          {
            type: 'text',
            value:
              '퀴즈 풀이 도중 실수로 **새로고침**이나 **뒤로가기**를 눌렀을 때, 전역 상태가 초기화되어 진행 상황이 모두 날아가는 문제가 있었습니다.',
          },
        ],
      },
      {
        title: '해결 과정',
        dotColor: 'bg-blue-400',
        contents: [
          {
            type: 'text',
            value:
              '복잡한 복구 로직 대신, 브라우저의 `beforeunload` 이벤트를 활용해 실수를 방지하는 것이 MVP 단계에서 가장 효율적인 해결책이라 판단했습니다.',
          },
          {
            type: 'code',
            language: 'typescript',
            value: `useEffect(() => {
  if (!enabled) return;

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, [enabled, handleBeforeUnload]);`,
          },
        ],
      },
    ],
    result: '실수로 인한 퀴즈 데이터 유실 방지 및 사용자 경험 향상',
  },
  {
    id: 'hoc-generic-abstraction',
    header: 'HOC 패턴과 제네릭을 활용한 복잡한 데이터 로직 추상화',
    sections: [
      {
        title: '도입 이유',
        dotColor: 'bg-red-400',
        contents: [
          {
            type: 'text',
            value:
              '퀴즈 컴포넌트가 **실전 모드, 튜토리얼 모드, 잠김 상태** 등 다양한 상황에서 재사용되어야 했습니다. 하지만 각 모드마다 데이터를 가져오는 로직이 달라, 컴포넌트 내부에 **비즈니스 로직이 강하게 결합**되고 코드 중복이 발생했습니다.',
          },
        ],
      },
      {
        title: '문제 발생',
        dotColor: 'bg-orange-400',
        contents: [
          {
            type: 'text',
            value:
              '로직 분리를 위해 **HOC**를 도입했으나, TypeScript 환경에서 **Props 타입 추론**이 깨지는 문제가 발생했습니다.\n\n- 래핑된 컴포넌트는 `quizzes` 데이터가 필요함\n- 하지만 HOC를 사용하는 부모 입장에서는 `quizzes`를 전달할 필요가 없어야 함\n- 단순 래핑 시 TS는 여전히 부모에게 `quizzes` Props를 요구함',
          },
        ],
      },
      {
        title: '해결 과정',
        dotColor: 'bg-blue-400',
        contents: [
          {
            type: 'text',
            value:
              '**제네릭**과 **교차 타입**을 활용해 타입 안전성을 확보했습니다.\n\n1. 제네릭 `P`를 통해 원본 컴포넌트의 `props` 타입을 보존 후 HOC가 제공해주는 데이터를 `InjectedProps`로 분리\n2. 고차 컴포넌트가 반환할 컴포넌트의 props 타입을 `as P`를 통해 타입 단언하여 TS가 부모 컴포넌트에게 `quizzes` Props를 요구하지 않도록 처리',
          },
          {
            type: 'code',
            language: 'typescript',
            value: `const withQuizzes = <P extends object>(
  WrappedComponent: FC<P & InjectedProps>
) => {
  const ComponentWithQuizzes: FC<P & WithQuizzesProps> = ({
    partId,
    partStatus,
    ...props
  }) => {
    return (
      <WrappedComponent
        {...(props as P)}
        quizzes={quizzes}
      />
    );
  };
  return ComponentWithQuizzes;
};`,
          },
        ],
      },
    ],
    result:
      '복잡한 분기 로직을 분리 및 추상화하고 타입 안전성을 유지하며 컴포넌트 재사용성 극대화',
  },
];

export const cokoPerformanceData: ProjectDetailData[] = [
  {
    id: 'react-lazy-bundle-optimization',
    header: 'React.lazy를 활용한 번들 최적화 및 초기 로딩 속도 개선',
    sections: [
      {
        title: '도입 배경',
        dotColor: 'bg-red-400',
        contents: [
          {
            type: 'text',
            value:
              'SPA의 특성상 초기 진입 시 모든 페이지의 리소스를 한 번에 다운로드하여 FCP 지연이 우려되었습니다. 특히 네트워크가 느린 모바일 환경에서 사용자 이탈 우려가 컸습니다.',
          },
        ],
      },
      {
        title: '구현 내용',
        dotColor: 'bg-blue-400',
        contents: [
          {
            type: 'text',
            value:
              '페이지별 진입 시점에 필요한 리소스만 로드하는 전략을 도입했습니다.\n\n1. `React.lazy`와 동적 `import()`를 사용하여 라우터 레벨에서 컴포넌트를 분리했습니다.\n2. `Suspense` 컴포넌트를 상위 트리에 배치하여, 청크(Chunk) 파일이 다운로드되는 동안 스켈레톤 UI를 노출해 UX 저하를 방지했습니다.',
          },
          {
            type: 'code',
            language: 'tsx',
            value: `const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

return (
  <Suspense fallback={<PageSkeleton />}>
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </Suspense>
);`,
          },
        ],
      },
      {
        title: '성능 측정',
        dotColor: 'bg-green-400',
        contents: [
          {
            type: 'metrics',
            items: [
              {
                name: '초기 번들 사이즈',
                before: '2.0 MB',
                after: '300 KB',
                rate: '85% 감소',
              },
            ],
          },
        ],
      },
    ],
    result:
      '초기 리소스 용량을 85% 감축하여 쾌적한 진입 속도와 데이터 비용 절감 달성',
  },
];
