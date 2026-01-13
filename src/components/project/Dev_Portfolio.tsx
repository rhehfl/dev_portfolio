import { CaseStudy } from '@/components/project/card/CaseStudy';
import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';

export default function DevPortfolio() {
  return (
    <div className="p-5 h-full ">
      <div className="lg:p-10">
        <ProjectHeader
          id="intro"
          title="DevPortfolio"
          description="개인 포트폴리오 사이트"
          techStack={['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']}
          period="2025.12 ~ 2025.12"
          role="프론트엔드 개발"
          teamSize="개인 프로젝트"
        />
        <ProjectLinks github="https://github.com/rhehfl/dev-portfolio" />

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-black pl-3 dark:border-white">
          트러블 슈팅
        </h3>
        <section className="flex flex-col gap-8 ">
          <CaseStudy>
            <CaseStudy.Header>
              정교한 스크롤 위치 복원 (Custom Scroll Restoration)
            </CaseStudy.Header>
            <CaseStudy.Body>
              <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
                Next.js의 기본 스크롤 복원 기능이 복잡한 라우팅(Intercepting
                Routes)이나 뒤로 가기 시 일부 상황에서 정확한 위치를 찾아가지
                못하는 한계가 있었습니다.
              </CaseStudy.Section>

              <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
                <CaseStudy.Markdown>
                  - 브라우저의 **History API**(`history.state`)에 고유한 스크롤
                  키(`__scroll_key`)를 주입하여 현재 상태를 식별하도록 구현 -
                  **SessionStorage**를 활용하여 페이지 별 스크롤 위치를
                  영구적으로 매핑 및 저장 - `useIsomorphicLayoutEffect`를 통해
                  렌더링 직전 스크롤 위치를 즉시 복원하여 화면 깜빡임 방지
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              <CaseStudy.Result>
                <CaseStudy.Markdown>
                  - 목록에서 상세 페이지를 다녀와도 정확한 스크롤 위치 유지 -
                  `window` 스크롤뿐만 아니라 특정 `ref` 요소의 내부 스크롤까지
                  복원 가능한 확장성 확보
                </CaseStudy.Markdown>
              </CaseStudy.Result>
            </CaseStudy.Body>
          </CaseStudy>

          <CaseStudy>
            <CaseStudy.Header>
              flat 컴포넌트에서 Compound Component 패턴으로 전환하여 UI 유연성
              확보
            </CaseStudy.Header>
            <CaseStudy.Body>
              <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
                <CaseStudy.Markdown>
                  {` 기존 포트폴리오 카드는 데이터를 \`props\`로 받아 렌더링하는 \`flat\`한 컴포넌트 형태였습니다.
        이로 인해 텍스트 -> 이미지 -> 텍스트 순서로 배치하고 싶어도 정해진 렌더링 순서를 바꾸기 어렵다는 문제점이 있었습니다.`}
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
                <CaseStudy.Markdown>
                  자식 컴포넌트를 `Header`, `Section`, `Figure`등으로 분리한
                  `Compound Component` 패턴을 도입했습니다.
                </CaseStudy.Markdown>

                <CaseStudy.Code>
                  {`\`\`\`tsx
// ❌ Before: props로 전달하여 렌더링 자유도가 떨어짐
const DATA = [{
  problem: { 
    type: 'image', 
    src: '...', 
    desc: '...' // 타입 정의가 계속 늘어남
  },
  solution: ['텍스트 1', '텍스트 2'] 
}];

// ✅ After: 자유로운 JSX 구조 작성 가능
<CaseStudy>
  <CaseStudy.Section title="문제">
    <CaseStudy.Figure src="..." />
  </CaseStudy.Section>
  
  <CaseStudy.Section title="해결">
    <p>텍스트 설명</p>
    <CodeBlock /> 
  </CaseStudy.Section>
</CaseStudy>
\`\`\``}
                </CaseStudy.Code>
              </CaseStudy.Section>
              <CaseStudy.Result>
                <CaseStudy.Markdown>
                  {`기존 트러블 슈팅, 성능 개선 등 분리해 사용했던 컴포넌트를
                  통합하여 컴포넌트 재사용성 향상 및 기본 스타일링을 추상화하여 코드 가독성 향상`}
                </CaseStudy.Markdown>
              </CaseStudy.Result>
            </CaseStudy.Body>
          </CaseStudy>
        </section>
      </div>
    </div>
  );
}
