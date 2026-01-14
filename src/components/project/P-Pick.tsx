import { CaseStudy } from '@/components/project/card/CaseStudy';
import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';

export default function PPick() {
  return (
    <div className="p-5 h-full ">
      <div className="lg:p-10">
        <ProjectHeader
          title="P-Pick"
          description="한국관광공사 Open API를 활용해 숏 폼 형식으로 주변 여행지를 둘러볼 수 있는 사이트"
          techStack={[
            'React',
            'TypeScript',
            'Vite',
            'Zustand',
            'Tanstack Query',
            'Tailwind CSS',
          ]}
          period="2025.06 ~ 2025.09 (3개월)"
          role="프론트엔드 개발"
          teamSize="2명"
        />
        <ProjectLinks github="https://github.com/P-pick/front" />

        {/* =================================================================
            SECTION 1. 트러블 슈팅
            : 문제 상황을 이미지로 보여줘야 하는 케이스를 깔끔하게 처리
           ================================================================= */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          트러블 슈팅
        </h3>
        <section className="flex flex-col gap-8 ">
          <CaseStudy>
            <CaseStudy.Header>데이터 페칭 최적화</CaseStudy.Header>
            <CaseStudy.Body>
              <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
                <CaseStudy.Figure
                  src="/p-pick/trouble1.png"
                  alt="네트워크 요청 그래프"
                  caption="초기 렌더링 시 다수의 API 요청이 동시에 발생하여 네트워크 병목 현상 유발"
                />
              </CaseStudy.Section>

              <CaseStudy.Section title="원인 파악" dotColor="bg-orange-400">
                한번에 너무 많은 양의 데이터를 요청하는 구조 확인
              </CaseStudy.Section>

              <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
                <CaseStudy.Markdown>
                  - 가상화를 통해 렌더링 되는 컴포넌트 수를 제한하여 필요한
                  데이터만 요청하도록 변경 - `img` 태그의 `loading="lazy"`
                  속성을 활용하여 이미지 지연 로딩 적용
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              <CaseStudy.Result>
                <CaseStudy.Markdown>
                  - 초기 API 요청 개수를 10회 이상 → **3회로 축소** 초기 이미지
                  개수도 약 30개 이상 → **4개로 축소**
                </CaseStudy.Markdown>
              </CaseStudy.Result>
            </CaseStudy.Body>
          </CaseStudy>
        </section>

        <h3 className="text-2xl my-5 font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          성능 개선
        </h3>
        <section className="flex flex-col gap-8 ">
          <CaseStudy>
            <CaseStudy.Header hasMetrics>
              Dynamic Subset 적용으로 웹 폰트 최적화
            </CaseStudy.Header>
            <CaseStudy.Body>
              <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
                다양한 font-weight를 포함한 폰트 파일 로딩으로 인해 네트워크
                리소스가 낭비되고 초기 렌더링 속도 저하가 우려되었습니다.
              </CaseStudy.Section>

              <CaseStudy.Section title="해결 방안" dotColor="bg-blue-400">
                <CaseStudy.Markdown>
                  - 불필요한 글리프를 제거하고 화면에 필요한 글자만 동적으로
                  로딩하는 일반 **Dynamic Subset** 기법 적용 - **WOFF2** 포맷
                  사용으로 리소스 경량화
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              {/* 수치 데이터를 직관적인 태그로 표현 */}
              <CaseStudy.Metrics>
                <CaseStudy.MetricItem
                  name="폰트 용량"
                  before="1,559KB"
                  after="272KB"
                  rate="82% 절감"
                />
              </CaseStudy.Metrics>
              <CaseStudy.Result>
                폰트 파일의 용량을 줄여 LCP 성능 개선
              </CaseStudy.Result>
            </CaseStudy.Body>
          </CaseStudy>
        </section>
      </div>
    </div>
  );
}
