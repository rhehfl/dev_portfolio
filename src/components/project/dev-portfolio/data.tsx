import { CaseStudy } from '@/components/project/card/CaseStudy';

// 1. 트러블 슈팅 (Troubleshooting)
export const PORTFOLIO_TROUBLESHOOTING = [
  {
    title: '확장 불가능한 Flat 컴포넌트 구조의 한계 극복',
    contents: (
      <CaseStudy.Body>
        <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
          <CaseStudy.Markdown>
            {`초기 트러블 슈팅 컴포넌트는 모든 데이터를 하나의 Props 객체로 전달받는 **Flat한 구조**였습니다.
            하지만 프로젝트마다 '코드 예시가 없는 경우', '이미지가 여러 장인 경우', '비디오가 필요한 경우' 등 요구사항이 계속 늘어났고, 이를 처리하기 위해 **Props가 비대해지고 내부 분기(if/else) 로직이 복잡해지는 유지보수 지옥**에 빠졌습니다.`}
          </CaseStudy.Markdown>
          <CaseStudy.Code>
            {`// Before: 모든 케이스를 하나의 Props로 처리 (유연성 부족)
// 새로운 타입이 생길 때마다 Props와 내부 로직 수정 불가피
<TroubleShooting
  title="제목" 
  problem="문제" 
  solution="해결" 
  code={codeSnippet} // 코드가 없으면? null 전달?
  videoSrc={...}     // 비디오가 추가된다면?
/>`}
          </CaseStudy.Code>
        </CaseStudy.Section>

        <CaseStudy.Section
          title="해결 과정 (Compound Pattern)"
          dotColor="bg-blue-400"
        >
          <CaseStudy.Markdown>
            {`컴포넌트의 제어권을 부모에게 넘겨주는 **Compound Component** 패턴을 도입하여 구조를 전면 리팩터링했습니다.
            \`CaseStudy\`를  \`Header\`,  \`Section\`, \`Code\` 등의 하위 컴포넌트로 쪼개
            이제 필요한 블록만 조립하여 사용할 수 있어 어떤 형태의 콘텐츠도 유연하게 대응할 수 있게 되었습니다.`}
          </CaseStudy.Markdown>
          <CaseStudy.Code>
            {`
// After: 필요한 요소만 선택적으로 조합
<CaseStudy>
  <CaseStudy.Header>제목</CaseStudy.Header>
  <CaseStudy.Body>
    <CaseStudy.Section title="문제">...</CaseStudy.Section>
    
    {/* 코드가 필요하면 넣고, 없으면 안 넣으면 됨 */}
    <CaseStudy.Code>{code}</CaseStudy.Code> 
    
    {/* 새로운 요구사항(예: 팁 박스)이 생겨도 컴포넌트 추가만 하면 끝 */}
    <CaseStudy.Tip>...</CaseStudy.Tip>
  </CaseStudy.Body>
</CaseStudy>`}
          </CaseStudy.Code>
        </CaseStudy.Section>

        <CaseStudy.Result isHighlighted>
          새로운 UI 요구사항 발생 시 기존 코드 수정 없이 컴포넌트 조합만으로
          대응 가능한 유연한 구조 구축
        </CaseStudy.Result>
      </CaseStudy.Body>
    ),
  },
  {
    title: '뒤로가기 시 스크롤 위치 소실 문제 해결',
    contents: (
      <CaseStudy.Body>
        <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
          <CaseStudy.Markdown>
            {`페이지 이동 후 뒤로가기를 했을 때, 브라우저의 기본 스크롤 복원 동작이 완벽하지 않아 사용자가 보던 위치를 잃어버리는 문제가 있었습니다.
            `}
          </CaseStudy.Markdown>
        </CaseStudy.Section>

        <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
          <CaseStudy.Markdown>
            {` **Session Storage**와 **History API**를 활용한 커스텀 훅 \`useScrollRestoration\`을 구현했습니다.
            1. 페이지 이동 전, 현재 스크롤 위치를 \`window.history.state\`의 고유 키와 매핑하여 세션 스토리지에 저장합니다.
            2. 페이지 컴포넌트가 마운트될 때(\`useIsomorphicLayoutEffect\`), 저장된 위치값이 있다면 즉시 해당 위치로 스크롤을 이동시킵니다.`}
          </CaseStudy.Markdown>
          <CaseStudy.Code>
            {`// useScrollRestoration.tsx
useIsomorphicLayoutEffect(() => {
  if ('scrollRestoration' in window.history) {
    // 브라우저 자동 복원 비활성화
    window.history.scrollRestoration = 'manual';
  }
}, []);

useIsomorphicLayoutEffect(() => {
  const historyKey = historyKeyRef.current;
  const savedPos = storageMap[historyKey];

  if (savedPos) {
    // 저장된 위치로 즉시 이동
    window.scrollTo({ top: savedPos, behavior: 'instant' });
  }
}, [storageMap]);`}
          </CaseStudy.Code>
        </CaseStudy.Section>
        <CaseStudy.Section title="훅 고도화">
          <CaseStudy.Markdown>
            {`브라우저 내 스크롤 위치 복원 로직은 클라이언트에서 자주 사용되는 커스텀 훅이라고 생각이 들어
                클라이언트 개발에 유용한 훅을 제공하는 오픈 소스 라이브러리에 기여했습니다.

    1. 비동기 데이터 로딩을 대기할 수 있는 enabled 옵션
    2. 스크롤 이동 애니메이션 제어 옵션
    3. 새로고침 대응을 위한 beforeunload 이벤트 핸들링 기능

등 다양한 유즈케이스를 고려한 기능을 추가했습니다.`}
          </CaseStudy.Markdown>
        </CaseStudy.Section>

        <CaseStudy.Result isHighlighted>
          페이지 이동 간 정확한 스크롤 위치 복원으로 끊김 없는 탐색 경험 제공 및
          오픈 소스 기여
        </CaseStudy.Result>
      </CaseStudy.Body>
    ),
  },
];

// 2. 성능 개선 (Performance)
export const PORTFOLIO_PERFORMANCE = [
  {
    title: '이미지 프리로딩을 통한 체감 대기시간 감소',
    contents: (
      <CaseStudy.Body>
        <CaseStudy.Section title="도입 배경" dotColor="bg-red-400">
          <CaseStudy.Markdown>
            {`특정 아코디언 메뉴를 열었을 때 이미지가 즉시 로드되지 않아 사용자가 빈 이미지를 보게 되는 현상이 있었습니다.
            이는 상세 화면으로 진입하는 순간에만 이미지를 로드하다 보니 발생하는 문제였습니다.`}
          </CaseStudy.Markdown>
        </CaseStudy.Section>

        <CaseStudy.Section title="구현 내용" dotColor="bg-blue-400">
          <CaseStudy.Markdown>
            {`\`PreloadHover\` 컴포넌트를 구현하여 **Hover Intent** 감지 시스템을 구축했습니다.
            1. 사용자가 카드 위에 마우스를 특정 시간 이상 올리고 있을 때만 상세 페이지 이미지를 요청합니다.
            2. Next.js의 \`Image\`태그를 숨겨서 렌더링하여 최적화된 이미지를 브라우저에 미리 적재합니다.
            3. Slot 패턴을 사용하여 다양한 카드 컴포넌트에 재사용할 수 있도록 설계했습니다.`}
          </CaseStudy.Markdown>
          <CaseStudy.Code>
            {`
 {shouldLoad && (
        <div className="absolute top-0 left-0 -z-50 w-px h-px overflow-hidden opacity-0 pointer-events-none">
          {imageSources.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt="preload-hidden"
              width={CASE_STUDY_THUMB_WIDTH}
              height={CASE_STUDY_THUMB_HEIGHT}
              priority={true}
            />
          ))}
        </div>

`}
          </CaseStudy.Code>
        </CaseStudy.Section>
        <CaseStudy.Section
          title="성능 측정 (Fast 3G 환경)"
          dotColor="bg-green-400"
        >
          <CaseStudy.Metrics>
            <CaseStudy.MetricItem
              name="즉시 클릭 시"
              before="2,100ms"
              after="1,800ms"
              rate="15% 단축"
            />
            <CaseStudy.MetricItem
              name="호버 후(1초 이상) 클릭"
              before="2,100ms"
              after="28ms"
              rate="Zero Latency"
            />
          </CaseStudy.Metrics>
        </CaseStudy.Section>
        <CaseStudy.Result isHighlighted>
          상세 페이지 진입 시 이미지 로딩 시간 '0초'에 수렴 (LCP 최적화)
        </CaseStudy.Result>
      </CaseStudy.Body>
    ),
  },
];

// 3. 프로젝트 소개 (Intro)
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
