import { CaseStudy } from '@/components/project/card/CaseStudy';
import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';
import MarkDownWrapper from '@/components/common/MarkDownWrapper';

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
                {/* 텍스트 대신 이미지를 바로 넣을 수 있음 */}
                <CaseStudy.Figure
                  src="/coko/t1.png"
                  alt="무한 렌더링 이슈 코드 스니펫"
                  caption="팝업 컴포넌트 마운트 시 무한 리렌더링으로 인한 브라우저 프리징 발생"
                />
              </CaseStudy.Section>

              <CaseStudy.Section title="원인 파악" dotColor="bg-orange-400">
                <MarkDownWrapper>
                  React의 `ref` 콜백은 렌더링 시마다 새로운 참조가 전달되면
                  재실행됨. 내부에서 상태를 변경하고 있어 **[상태 변경 →
                  리렌더링 → ref 재실행 → 다시 상태 변경]** 의 무한 루프 형성.
                </MarkDownWrapper>
              </CaseStudy.Section>

              <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
                <CaseStudy.Figure
                  src="/coko/t2.png"
                  alt="ref 콜백 함수 수정"
                  caption="ref 콜백 함수를 useCallback으로 감싸 함수 참조가 유지되도록 수정함"
                />
              </CaseStudy.Section>

              <CaseStudy.Result>
                팝오버가 열릴 때 발생하던 무한 렌더링 현상이 완전히 제거
              </CaseStudy.Result>
            </CaseStudy.Body>
          </CaseStudy>

          {/* Case 2: 코드 스니펫 비교가 필요한 경우 */}
          <CaseStudy>
            <CaseStudy.Header>조건부 렌더링 구조 개선</CaseStudy.Header>
            <CaseStudy.Body>
              <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
                로그인 창, 결과 창 등 여러 종류의 모달을 삼항 연산자로 렌더링 중
                유지보수성등의 문제로 리팩토링 필요성 인지
              </CaseStudy.Section>

              <CaseStudy.Section title="인식 및 과정" dotColor="bg-blue-400">
                <MarkDownWrapper>
                  - 초기에는 `Funnel`패턴을 도입했으나 순차적인 흐름이 아니어서
                  부적합하다고 판단. - 흐름이 없는 모달(로그인 유도, 결과 창
                  등)은 **SwitchCase** 커스텀 컴포넌트로 리팩토링하여 선언적인
                  조건부 렌더링 구현.
                </MarkDownWrapper>

                {/* 코드 스니펫 */}
                <CaseStudy.Code>
                  {`\`\`\`tsx
// Before (삼항 연산자 지옥)
{quizzes.length === totalResults.length ? (
  <TotalResults ... />
) : (
  <Result .../>
)}

// After (SwitchCase - 선언적)
<SwitchCase
  value={step}
  caseBy={{
    result: <Result .../>,
    loginPrompt: <LoginPrompt .../>,
    login: <Login .../>,
    totalResult: <TotalResults .../>,
    partClear: <PartClear .../>,
  }}
/>
\`\`\``}
                </CaseStudy.Code>
              </CaseStudy.Section>

              <CaseStudy.Result>
                모달 추가 시 기존 조건 로직을 수정할 필요가 없는 **확장 가능한
                구조** 확보 및 상황에 맞는 패턴 선택의 중요성 체득
              </CaseStudy.Result>
            </CaseStudy.Body>
          </CaseStudy>

          {/* Case 3: 명령형 -> 선언적 코드 전환 (코드 포함) */}
          <CaseStudy>
            <CaseStudy.Header>
              명령형 처리에서 선언적 코드로 전환
            </CaseStudy.Header>
            <CaseStudy.Body>
              <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
                이전 프로젝트에서는 API를 호출할 때마다 컴포넌트 내부에서
                `isLoading` 상태를 관리하고, `.catch()`를 통해 에러를 개별적으로
                핸들링해야 했습니다.
              </CaseStudy.Section>

              <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
                <MarkDownWrapper>
                  - React의 **Suspense**와 **Error Boundary**를 도입하여 비동기
                  상태 처리를 선언적으로 변경. - TanStack Query의
                  `useSuspenseQuery`를 활용하여 데이터 로딩과 에러 처리를
                  중앙화함.
                </MarkDownWrapper>
                <div className="mt-4">
                  <MarkDownWrapper>
                    {`\`\`\`tsx
// ✅ After: 선언적 처리 (Suspense & Error Boundary)
// 부모 컴포넌트 혹은 라우터 레벨
const UserPage = () => (
  <ErrorBoundary fallback={<ItemFallback />}>
    <Suspense fallback={<Loader />}>
      <UserReviews intId={1} />
    </Suspense>
  </ErrorBoundary>
);

const UserReviews = ({ intId }) => {
  const { data } = useSuspenseQuery(useReviewOptions(intId));
  return <ReviewList data={data} />;
};
\`\`\``}
                  </MarkDownWrapper>
                </div>
              </CaseStudy.Section>

              <CaseStudy.Result>
                컴포넌트 내부 분기문 제거로 코드가 간결해지고, 에러 처리가 누락
                없이 일관된 UX를 제공하게 됨.
              </CaseStudy.Result>
            </CaseStudy.Body>
          </CaseStudy>

          {/* Case 4: Funnel 도입 */}
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
                <MarkDownWrapper>
                  - 외부에서 흐름 관리를 위해 토스에서 영감을 받은 `useFunnel`
                  훅을 도입하여 선언적인 구조로 변경. - 프로젝트 규모에 맞게
                  복잡한기능은 제외하고, 단순히 현재 `step`과 `setStep`만
                  제공하도록 경량화하여 구현.
                </MarkDownWrapper>
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
                <MarkDownWrapper>
                  - React의 `lazy`와 동적 `import()`를 활용하여 페이지 단위로
                  컴포넌트를 분리했습니다. - 사용자가 해당 경로에 접근할 때만
                  필요한 리소스를 로드하도록 라우터를 재설계했습니다.
                </MarkDownWrapper>
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
                <MarkDownWrapper>
                  - `usePreloadImages` 커스텀 훅을 제작하여
                  `Promise.allSettled`로 주요 이미지 리소스를 병렬로 미리
                  캐싱했습니다. - `Image` 객체를 생성하여 브라우저 캐시에
                  이미지를 미리 적재한 뒤 화면을 렌더링하도록 흐름을
                  제어했습니다.
                </MarkDownWrapper>
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
