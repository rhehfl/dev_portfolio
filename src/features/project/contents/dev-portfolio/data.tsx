import ProjectDetail from '@/features/project/components/ProjectDetail';
import { ProjectDetailData } from '@/features/project/types/projectDetail';

export const devPortfolioProjectPerformanceData: ProjectDetailData[] = [
  {
    id: 'in-view-image-preloading',
    header: 'In-View 감지를 통한 이미지 프리로딩 및 UX 개선',
    sections: [
      {
        title: '도입 배경',
        dotColor: 'bg-red-400',
        contents: [
          {
            type: 'text',
            value:
              '기존에는 상세 화면 진입 시 이미지를 요청하여 로딩 딜레이가 발생했습니다. 초기에는 Hover 방식으로 시도했으나, **모바일 환경(터치 인터페이스)** 에서는 `Hover` 가 동작하지 않아 최적화 효과를 볼 수 없는 한계가 있었습니다.',
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
              '`IntersectionObserver` 기반의 컴포넌트를 구현하여 **In-View** 의 프리로딩 시스템을 구축했습니다.\n\n1. **Intersection Observer**를 활용해 사용자가 해당 위치에 접근할 때 이미지를 백그라운드에서 미리 요청합니다.\n2. `new Image()` API와 `decoding="async"` 속성을 사용하여 DOM 렌더링 비용 없이 브라우저 캐시에만 이미지를 적재합니다.',
          },
          {
            type: 'code',
            language: 'javascript',
            value: `const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      // DOM 렌더링 없이 브라우저 캐시에만 적재
      const img = new Image();
      img.decoding = 'async'; // 메인 스레드 블로킹 방지
      img.src = src;
      observer.disconnect();
    }
  },
  { rootMargin: '200px' } // 뷰포트 진입 전 미리 로딩
);`,
          },
        ],
      },
      {
        title: '성능 측정 (제한 없음 환경)',
        dotColor: 'bg-green-400',
        contents: [
          {
            type: 'metrics',
            items: [
              {
                name: '클릭 후 로딩 시간',
                before: '2,000ms',
                after: '1,000ms',
                rate: '2배이상 감소',
              },
            ],
          },
        ],
      },
    ],
    result:
      '데스크톱 및 모바일 환경 모두에서 사용자 로딩시간 0초로 감소 및 CLS 제거',
  },
];
export const devPortfolioTroubleshootingData: ProjectDetailData[] = [
  {
    id: 'refactoring-flat-component-structure',
    header: '확장 불가능한 Flat 컴포넌트 구조의 한계 극복',
    link: '/blog/0d1a6bc2-1e4c-4d19-bbe2-9a4e7d0a0ce3',
    sections: [
      {
        title: '문제 상황',
        dotColor: 'bg-red-400',
        contents: [
          {
            type: 'text',
            value:
              '초기 트러블 슈팅 컴포넌트는 모든 데이터를 하나의 Props 객체로 전달받는 **Flat한 구조**였습니다. 하지만 요구사항이 늘어남에 따라 **유지보수 지옥**에 빠졌습니다.',
          },
          {
            type: 'code',
            language: 'tsx',
            value: `// Before: 모든 케이스를 하나의 Props로 처리\n<TroubleShooting\n  title="제목"\n  code={codeSnippet}\n  videoSrc={...}\n/>`,
          },
        ],
      },
      {
        title: '해결 과정 (Compound Pattern)',
        dotColor: 'bg-blue-400',
        contents: [
          {
            type: 'text',
            value:
              '컴포넌트의 제어권을 부모에게 넘겨주는 **Compound Component** 패턴을 도입하여 구조를 전면 리팩터링했습니다.',
          },
          {
            type: 'code',
            language: 'tsx',
            value: `// After: 필요한 요소만 선택적으로 조합\n<ProjectDetail>\n  <ProjectDetail.Header>제목</ProjectDetail.Header>\n  <ProjectDetail.Body>\n    <ProjectDetail.Section title="문제">...</ProjectDetail.Section>\n    <ProjectDetail.Code>{code}</ProjectDetail.Code>\n  </ProjectDetail.Body>\n</ProjectDetail>`,
          },
        ],
      },
    ],
    result:
      '새로운 UI 요구사항 발생 시 기존 코드 수정 없이 컴포넌트 조합만으로 대응 가능한 유연한 구조 구축',
  },
  {
    id: 'solve-scroll-restoration-issue',
    header: '뒤로가기 시 스크롤 위치 소실 문제 해결',
    sections: [
      {
        title: '문제 상황',
        dotColor: 'bg-red-400',
        contents: [
          {
            type: 'text',
            value:
              '페이지 이동 후 뒤로가기를 했을 때, 브라우저의 기본 스크롤 복원 동작이 완벽하지 않은 문제가 있었습니다.',
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
              '**Session Storage**와 **History API**를 활용한 커스텀 훅 `useScrollRestoration`을 구현했습니다.',
          },
          {
            type: 'code',
            language: 'tsx',
            value: `// useScrollRestoration.tsx\nuseIsomorphicLayoutEffect(() => {\n  if ('scrollRestoration' in window.history) {\n    window.history.scrollRestoration = 'manual';\n  }\n}, []);`,
          },
        ],
      },
    ],
    result:
      '페이지 이동 간 정확한 스크롤 위치 복원으로 끊김 없는 탐색 경험 제공 및 오픈 소스 기여',
  },
];
export const PORTFOLIO_INTRO = {
  overview: `Dev Portfolio는 저의 개발 역량과 프로젝트 경험을 가장 효과적으로 전달하기 위해 설계된 웹 사이트입니다.
  Next.js 16의 최신 기능을 실험적으로 도입하고, Framer Motion을 활용한 마이크로 인터랙션을 통해 '사용자 경험(UX)을 중요시하는 개발자'라는 정체성을 표현했습니다.`,
  features: [
    {
      title: '끊김 없는 페이지 탐색 (Scroll Restoration)',
      description:
        '커스텀 훅을 통해 브라우저 히스토리와 연동된 정교한 스크롤 복원 기능을 구현하여, 뒤로 가기 시에도 사용자의 탐색 흐름이 끊기지 않습니다.',
      mediaSrc: '/dev-portfolio/preview.png', // *이미지 경로 확인 필요
      isVideo: false,
    },
    {
      title: '반응형 인터랙티브 UI',
      description:
        'Radix UI와 Tailwind CSS를 결합하여 접근성(A11y)을 준수하면서도, 모바일과 데스크탑 환경에 맞춰 최적화된 모달 및 드로어 인터페이스를 제공합니다.',
      mediaSrc: '/dev-portfolio/preview.png',
      isVideo: false,
    },
    {
      title: '몰입감 있는 이미지 전환',
      description:
        '목록의 썸네일이 상세 화면으로 부드럽게 확장되는 Shared Element Transition 애니메이션을 적용하여 시각적 만족도를 높였습니다.',
      mediaSrc: '/dev-portfolio/preview.png',
      isVideo: false,
    },
  ],
};
