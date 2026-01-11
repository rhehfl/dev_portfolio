import { CaseStudy } from '@/components/project/card/CaseStudy';
import TeamCulture from '@/components/project/card/TeamCulture';
import ExpandableSection from '@/components/project/detail/ExpandableSection';
import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';

export default function Coko() {
  return (
    <div className="p-5 h-full ">
      <div className="lg:p-10">
        <ProjectHeader
          id="intro"
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
        <section className="flex flex-col gap-8 ">
          <CaseStudy>
            <CaseStudy.Header>
              ref 콜백 함수 전달로 인한 무한 리렌더링 이슈 해결
            </CaseStudy.Header>
            <CaseStudy.Body>
              <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
                <CaseStudy.Figure
                  src="/coko/t1.png"
                  alt="무한 렌더링 이슈 코드 스니펫"
                  caption="팝업 컴포넌트 마운트 시 ref 콜백 내부 상태 변경으로 브라우저 프리징 발생"
                />
              </CaseStudy.Section>

              <CaseStudy.Section title="원인 파악" dotColor="bg-orange-400">
                <CaseStudy.Markdown>
                  React의 ref 콜백은 렌더링마다 새로운 함수 참조가 전달되면 다시
                  실행됩니다. 해당 ref 내부에서 상태를 변경하고 있었고, 그 결과
                  **상태 변경 → 리렌더링 → ref 재실행**의 무한 루프가
                  발생했습니다. 이 문제는 UI 일부가 아니라 **페이지 전체를
                  멈추게 하는 치명적인 이슈**라고 판단했습니다.
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
                <CaseStudy.Figure
                  src="/coko/t2.png"
                  alt="ref 콜백 함수 수정"
                  caption="ref 콜백을 useCallback으로 감싸 참조를 고정"
                />
              </CaseStudy.Section>

              <CaseStudy.Result>
                팝업 사용 시 발생하던 브라우저 프리징 현상 완전 제거, `ref` 사용
                시 주의사항을 팀 내 공유하여 유사 이슈 재발 방지
              </CaseStudy.Result>
            </CaseStudy.Body>
          </CaseStudy>
          <ExpandableSection title="아아">
            <div>dsdsd</div>
          </ExpandableSection>

          <CaseStudy>
            <CaseStudy.Header>
              진행 상태 관리 리팩토링 (useFunnel)
            </CaseStudy.Header>
            <CaseStudy.Body>
              <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
                기존 코드가 컴포넌트 스스로 렌더링을 해야할지 결정하여
                재사용하기 까다로운 구조라고 판단.
              </CaseStudy.Section>

              <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
                <CaseStudy.Markdown>
                  - 외부에서 흐름 관리를 위해 토스에서 영감을 받은 `useFunnel`
                  훅을 도입하여 선언적인 구조로 변경. - 프로젝트 규모에 맞게
                  복잡한기능은 제외하고, 단순히 현재 `step`과 `setStep`만
                  제공하도록 경량화하여 구현.
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              <CaseStudy.Result>
                외부에서 흐름을 관리하여 가독성이 증가했으며, 각 컴포넌트 내부
                사정에 구애받지 않게 재사용 가능.
              </CaseStudy.Result>
            </CaseStudy.Body>
          </CaseStudy>
        </section>

        {/* =================================================================
            SECTION 2. 성능 개선
            : 텍스트 위주의 깔끔한 구조
           ================================================================= */}
        <h3 className="text-2xl my-5 font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          성능 개선
        </h3>
        <section className="flex flex-col gap-8 ">
          <CaseStudy>
            <CaseStudy.Header>라우트 기반 코드 스플리팅 적용</CaseStudy.Header>
            <CaseStudy.Body>
              <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
                초기 진입 시 전체 페이지의 리소스를 한 번에 다운로드하여 FCP
                시간이 지연될 우려가 있었습니다.
              </CaseStudy.Section>

              <CaseStudy.Section title="해결 방안" dotColor="bg-blue-400">
                <CaseStudy.Markdown>
                  - React의 `lazy`와 동적 `import()`를 활용하여 페이지 단위로
                  컴포넌트를 분리했습니다. - 사용자가 해당 경로에 접근할 때만
                  필요한 리소스를 로드하도록 라우터를 재설계했습니다.
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              <CaseStudy.Result>
                초기 진입 속도를 개선하고 네트워크 리소스 비용을 절감.
              </CaseStudy.Result>
            </CaseStudy.Body>
          </CaseStudy>

          <CaseStudy>
            <CaseStudy.Header>
              이미지 프리로딩 훅 구현을 통한 UX 개선
            </CaseStudy.Header>
            <CaseStudy.Body>
              <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
                특정 페이지 진입이나 화면이 전환될 때 이미지가 뒤늦게 로딩되어
                깜빡이거나 Layout Shift가 발생하여 사용자 몰입을 방해했습니다.
              </CaseStudy.Section>

              <CaseStudy.Section title="해결 방안" dotColor="bg-blue-400">
                <CaseStudy.Markdown>
                  - `usePreloadImages` 커스텀 훅을 제작하여
                  `Promise.allSettled`로 주요 이미지 리소스를 병렬로 미리
                  캐싱했습니다. - `Image` 객체를 생성하여 브라우저 캐시에
                  이미지를 미리 적재한 뒤 화면을 렌더링하도록 흐름을
                  제어했습니다.
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              <CaseStudy.Result>
                화면 전환 시 이미지가 즉시 표시되도록 하여 시각적 끊김 없는
                부드러운 사용자 경험을 제공했습니다.
              </CaseStudy.Result>
            </CaseStudy.Body>
          </CaseStudy>
        </section>
      </div>
    </div>
  );
}
