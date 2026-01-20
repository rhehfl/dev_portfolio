import { CaseStudy } from '@/components/project/card/CaseStudy';
import { Code2, Rocket } from 'lucide-react';

export const COKO_TROUBLESHOOTING = [
  {
    title: 'ref 콜백 함수 전달로 인한 무한 리렌더링 이슈 해결',
    contents: (
      <CaseStudy.Body>
        <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
          <CaseStudy.Figure
            src="/coko/t1.png"
            caption="팝업 컴포넌트 마운트 시 무한 리렌더링 발생"
          />

          <CaseStudy.Markdown>
            {`\`DOM rect\` 정보를 전역 상태로 저장하여 사용하기 위해서 콜백ref를 통해 컴포넌트의 DOM 노드를 접근해야하는 상황에
            특정 팝업 컴포넌트가 마운트되면 무한 리렌더링이 발생하여 브라우저가 프리징되는 현상이 있었습니다.`}
          </CaseStudy.Markdown>
        </CaseStudy.Section>

        <CaseStudy.Section title="원인 파악" dotColor="bg-orange-400">
          <CaseStudy.Markdown>
            {`React의 \`ref\` 콜백은 렌더링마다 새로운 함수 참조가 전달되면 다시 실행됩니다. 
             **ref 실행 → 상태 변경 → 리렌더링 → ref 재실행**의 무한 루프가 원인이었습니다.`}
          </CaseStudy.Markdown>
        </CaseStudy.Section>

        <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
          <CaseStudy.Figure
            src="/coko/t2.png"
            caption="ref 콜백을 useCallback으로 감싸 참조를 고정"
          />
        </CaseStudy.Section>

        <CaseStudy.Result isHighlighted>
          팝업 브라우저 프리징 현상 완전 제거 및 팀내 이슈 공유
        </CaseStudy.Result>
      </CaseStudy.Body>
    ),
  },
  {
    title: '퀴즈 데이터 유실 방지',
    contents: (
      <CaseStudy.Body>
        <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
          <CaseStudy.Markdown>
            {`퀴즈 풀이 도중 실수로 **새로고침**이나 **뒤로가기**를 눌렀을 때, 전역 상태가 초기화되어 진행 상황이 모두 날아가는 문제가 있었습니다.`}
          </CaseStudy.Markdown>
        </CaseStudy.Section>

        <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
          <CaseStudy.Markdown>{`복잡한 복구 로직 대신, 브라우저의 \`beforeunload\` 이벤트를 활용해 실수를 방지하는 것이 MVP 단계에서 가장 효율적인 해결책이라 판단했습니다.`}</CaseStudy.Markdown>
          <CaseStudy.Code>
            {`
  useEffect(() => {
    if (!enabled) return; 

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [enabled, handleBeforeUnload]);
}`}
          </CaseStudy.Code>
          훅 내부의 일부 코드
        </CaseStudy.Section>

        <CaseStudy.Result isHighlighted>
          실수로 인한 퀴즈 데이터 유실 방지 및 사용자 경험 향상
        </CaseStudy.Result>
      </CaseStudy.Body>
    ),
  },
  {
    title: 'HOC 패턴과 제네릭을 활용한 복잡한 데이터 로직 추상화',
    contents: (
      <CaseStudy.Body>
        <CaseStudy.Section title="도입 이유" dotColor="bg-red-400">
          <CaseStudy.Markdown>
            {`퀴즈 컴포넌트가 **실전 모드, 튜토리얼 모드, 잠김 상태** 등 다양한 상황에서 재사용되어야 했습니다.
            하지만 각 모드마다 데이터를 가져오는 로직이 달라, 컴포넌트 내부에 **비즈니스 로직이 강하게 결합**되고 코드 중복이 발생했습니다.`}
          </CaseStudy.Markdown>
        </CaseStudy.Section>

        <CaseStudy.Section title="문제 발생" dotColor="bg-orange-400">
          <CaseStudy.Markdown>
            {`로직 분리를 위해 **HOC**를 도입했으나, TypeScript 환경에서 **Props 타입 추론**이 깨지는 문제가 발생했습니다.
            래핑된 컴포넌트는 \`quizzes\` 데이터가 필요하지만, HOC를 사용하는 부모 컴포넌트 입장에서는 \`quizzes\`를 전달할 필요가 없어야 함
            단순 래핑 시 TS는 여전히 부모에게 \`quizzes\` Props를 요구하는 문제 발생`}
          </CaseStudy.Markdown>
        </CaseStudy.Section>

        <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
          <CaseStudy.Markdown>
            {`**제네릭**과 **교차 타입**을 활용해 타입 안전성을 확보했습니다.
            1. 제네릭 \`P\`를 통해 원본 컴포넌트의 \`props\` 타입을 보존 후 hoc가 제공해주는 데이터를 \`InjectedProps\`로 분리
            2. 고차 컴포넌트가 반환할 컴포넌트의 props 타입을 \`as P\`를 통해 타입 단언하여 Ts가 부모 컴포넌트에게 \`quizzes\` Props를 요구하지 않도록 처리
         `}
          </CaseStudy.Markdown>
          <CaseStudy.Code>
            {`// 제네릭 P를 통해 원본 컴포넌트의 Props를 보존
const withQuizzes = <P extends object>(
  // 래핑 대상: 기존 Props(P) + 주입받을 Props(quizzes) 필요
  WrappedComponent: FC<P & InjectedProps> 
) => {
  // 반환 컴포넌트: quizzes는 내부 주입되므로 외부에서는 P와 설정값만 받음
  const ComponentWithQuizzes: FC<P & WithQuizzesProps> = ({ 
    partId, partStatus, ...props 
  }) => {
    // ... 데이터 페칭 및 분기 로직 ...
    return (
      <WrappedComponent
        {...(props as P)} // 제네릭 타입 단언
        quizzes={quizzes} // 데이터 주입(Injection)
      />
    );
  };
  return ComponentWithQuizzes;
};`}
          </CaseStudy.Code>
        </CaseStudy.Section>

        <CaseStudy.Result isHighlighted>
          복잡한 분기 로직을 분리 및 추상화하고 타입 안전성을 유지하며 컴포넌트
          재사용성 극대화
        </CaseStudy.Result>
      </CaseStudy.Body>
    ),
  },
];

export const COKO_PERFORMANCE = [
  {
    title: '라우트 기반 코드 스플리팅 적용',
    contents: (
      <CaseStudy.Body>
        <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
          초기 진입 시 전체 페이지의 리소스를 한 번에 다운로드하여 FCP 시간이
          지연될 우려가 있었습니다.
        </CaseStudy.Section>

        <CaseStudy.Section title="해결 방안" dotColor="bg-blue-400">
          <CaseStudy.Markdown>
            {`- React의 \`lazy\`와 동적 \`import()\`를 활용하여 페이지 단위로 컴포넌트를 분리했습니다.
            사용자가 해당 경로에 접근할 때만 필요한 리소스를 로드하도록 했습니다.`}
          </CaseStudy.Markdown>
        </CaseStudy.Section>

        <CaseStudy.Result>
          초기 진입 속도를 개선하고 네트워크 리소스 비용을 절감.
        </CaseStudy.Result>
      </CaseStudy.Body>
    ),
  },
  {
    title: '이미지 프리로딩 훅 구현을 통한 UX 개선',
    contents: (
      <CaseStudy.Body>
        <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
          특정 페이지 진입이나 화면이 전환될 때 이미지가 뒤늦게 로딩되어
          깜빡이거나 Layout Shift가 발생하여 사용자 몰입을 방해했습니다.
        </CaseStudy.Section>

        <CaseStudy.Section title="해결 방안" dotColor="bg-blue-400">
          <CaseStudy.Markdown>
            {`\`usePreloadImages\` 커스텀 훅을 제작하여 \`Image\` 객체를 생성하여 브라우저 캐시에 이미지를 미리 적재한 뒤 화면을 렌더링하도록 흐름을 제어했습니다.
             초기 네트워크 부하가 커진다는 **Trade-off**가 있지만, 사용자 경험 향상을 위해 이미지 프리로딩을 선택했습니다.
             이미지 로딩 실패를 대비하기 위해 \`Promise.allSettled\`를 사용했습니다.
            `}
          </CaseStudy.Markdown>
          <CaseStudy.Code>
            {`// 이미지 객체 생성 및 병렬 요청 프로미스 배열 생성
const imagePromises = imageUrls.map((url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = baseUrl + url;
  });
});

// 일부 실패하더라도 전체 로직이 중단되지 않도록 allSettled 사용
await Promise.allSettled(imagePromises);
setIsLoading(false);`}
          </CaseStudy.Code>
        </CaseStudy.Section>

        <CaseStudy.Result>
          화면 전환 시 이미지가 즉시 표시되도록 하여 시각적 끊김 없는 부드러운
          사용자 경험을 제공했습니다.
        </CaseStudy.Result>
      </CaseStudy.Body>
    ),
  },
];

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
    tag: 'Frontend Architect',
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
      '**백오피스(Admin) 독자 개발**: Swagger 수동 입력의 비효율을 해소하기 위해 데이터 CRUD 및 **AWS S3** 이미지 업로드 기능 구현',
      '**CI/CD 파이프라인 구축**: GitHub Actions와 EC2를 연동하여 메인 브랜치 병합 시 자동 배포되는 파이프라인 설계',
      '**지식 공유 문화 형성**: CI/CD 구축 과정 및 트러블 슈팅 경험을 블로그로 작성하고 팀 내 공유하여 레퍼런스 제공',
    ],
  },
];
