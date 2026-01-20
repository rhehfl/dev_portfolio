import { CaseStudy } from '@/components/project/card/CaseStudy';
import TeamCulture from '@/components/project/card/TeamCulture';
import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';

interface CaseStudyItem {
  title: string;
  contents: React.ReactNode;
}

export const COKO_TROUBLESHOOTING: CaseStudyItem[] = [
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
];

const COKO_PERFORMANCE: CaseStudyItem[] = [
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

export default function Coko() {
  return (
    <div className="p-5 h-full ">
      <div className="lg:p-10">
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
          role="프론트엔드 팀장, 어드민 페이지 개발"
          teamSize="6명"
        />
        <ProjectLinks github="https://github.com/modern-agile-team/8term-coko-Front" />
        <TeamCulture
          items={[
            {
              title: 'DX 개선',
              tag: 'Productivity',
              points: [
                'Github Actions를 이용한 CI/CD 자동화 구축',
                '어드민 페이지를 통한 콘텐츠 관리',
              ],
            },
            {
              title: '협업 프로세스',
              tag: 'Process',
              points: [
                'PR, Issue 템플릿 작성 및 코드 리뷰 체크리스트 도입',
                'Swagger를 활용한 API 명세',
                'Notion 기반의 스프린트 관리',
                'Figma를 활용한 디자이너와의 협업',
              ],
            },
          ]}
        />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          트러블 슈팅
        </h3>
        <section className="flex flex-col gap-8">
          {COKO_TROUBLESHOOTING.map((study, idx) => (
            <CaseStudy key={idx}>
              <CaseStudy.Header>{study.title}</CaseStudy.Header>
              {/* JSX 자체를 렌더링 */}
              {study.contents}
            </CaseStudy>
          ))}
        </section>

        <h3 className="text-2xl my-5 font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          성능 개선
        </h3>
        <section className="flex flex-col gap-8">
          {COKO_PERFORMANCE.map((study, idx) => (
            <CaseStudy key={idx}>
              <CaseStudy.Header>{study.title}</CaseStudy.Header>
              {study.contents}
            </CaseStudy>
          ))}
        </section>
      </div>
    </div>
  );
}
