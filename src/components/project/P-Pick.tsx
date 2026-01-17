import { CaseStudy } from '@/components/project/card/CaseStudy';
import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';
const PERFORMANCE = [
  {
    title: '대량 네트워크 워터폴 현상 해결',
    contents: (
      <CaseStudy.Body>
        <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
          <CaseStudy.Markdown>
            {`초기 설계에서는 **Promise.allSettled**로 모든 상세 이미지를 한 번에 요청하여 **로딩 후 쾌적한 탐색** 을 의도했습니다.
            
            그러나 실제로는 초기 진입 시 30개 이상의 이미지(수백 KB)가 동시에 요청되면서 심각한 ** Waterfall 현상** 이 발생했고, 과도한 대기 시간으로 인해 UX가 저하되었습니다.`}
          </CaseStudy.Markdown>
        </CaseStudy.Section>

        <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
          <CaseStudy.Markdown>
            {`**DevTools 분석**을 통해 일괄 요청이 병목임을 확인하고, **점진적 로딩 전략**으로 전면 수정했습니다.
            
            - **Swiper Virtual 모드**: 전체 DOM을 그리지 않고 현재, 이전, 다음 슬라이드만 렌더링
            - **점진적 프리패치(Pre-fetch)**: 현재 페이지를 볼 때 다음 페이지 데이터를 백그라운드에서 미리 요청
            - **Lazy Loading**: 뷰포트 밖의 이미지는 \`loading="lazy"\`로 로딩 지연`}
          </CaseStudy.Markdown>

          <CaseStudy.Code>
            {`// ✅ 뷰포트 내의 슬라이드만 렌더링 (Virtual) & 다음 페이지 프리패치
<Swiper modules={[Virtual]} virtual={{ enabled: true }}>
  {slides.map((slide, index) => (
    <SwiperSlide key={slide.id} virtualIndex={index}>
      {/* 현재 슬라이드가 마운트되면 다음 데이터 미리 로드 */}
      <DetailContent 
        data={slide} 
        onViewportEnter={() => prefetchNext(index + 1)} 
      />
    </SwiperSlide>
  ))}
</Swiper>`}
          </CaseStudy.Code>
        </CaseStudy.Section>

        <CaseStudy.Section title="성과 지표" dotColor="bg-green-400">
          <CaseStudy.Metrics>
            <CaseStudy.MetricItem
              name="초기 API 요청"
              before="10회+"
              after="3회"
              rate="70% 감소"
            />
            <CaseStudy.MetricItem
              name="초기 로드 이미지"
              before="30개+"
              after="4개"
              rate="86% 감소"
            />
          </CaseStudy.Metrics>
        </CaseStudy.Section>

        <CaseStudy.Result>
          불필요한 네트워크 비용을 획기적으로 줄이면서도, 다음 페이지 프리패칭을
          통해 끊김 없는 사용자 경험(Seamless UX)을 유지했습니다.
        </CaseStudy.Result>
      </CaseStudy.Body>
    ),
  },
  {
    title: '폰트 용량 82% 감소: 다이나믹 서브셋 적용',
    contents: (
      <CaseStudy.Body>
        <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
          <CaseStudy.Markdown>
            {`초기 로딩 시 Pretendard 폰트 용량이 약 **1,559KB**에 달해 네트워크 비용 증가가 우려되었습니다. 
            WOFF2 포맷을 사용하더라도 기본적으로 모든 글자 정보를 포함하고 있어 용량 최적화에 한계가 있었습니다.`}
          </CaseStudy.Markdown>
        </CaseStudy.Section>

        <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
          <CaseStudy.Markdown>
            {`다양한 서브셋 방식(가변, 다이나믹)과 CDN 사용 여부를 비교 분석했습니다.

            - **전략 수립**: 프로젝트에서 사용하는 \`font-weight\`가 제한적이므로, 가변(Variable) 폰트보다 **일반 다이나믹 서브셋**이 용량 절감에 유리하다고 판단했습니다.
            - **구현**: 로컬 호스팅 대신 유지보수 비용이 낮은 **CDN + 다이나믹 서브셋** 방식을 채택하여 필요한 글자만 분할 다운로드되도록 구성했습니다.`}
          </CaseStudy.Markdown>
          <CaseStudy.Code>
            {`/* CSS: CDN을 통한 다이나믹 서브셋 적용 예시 */
@import url('https://cdn.jsdelivr.net/gh/.../pretendard-dynamic-subset.css');

body {
  font-family: 'Pretendard', sans-serif;
}`}
          </CaseStudy.Code>
        </CaseStudy.Section>

        <CaseStudy.Section title="성과 지표" dotColor="bg-green-400">
          <CaseStudy.Metrics>
            <CaseStudy.MetricItem
              name="폰트 리소스 용량"
              before="1,559KB"
              after="272KB"
              rate="82% 감소"
            />
          </CaseStudy.Metrics>
        </CaseStudy.Section>

        <CaseStudy.Result>
          불필요한 폰트 데이터 다운로드를 제거하여 초기 로딩 속도(FCP)를
          개선하고 네트워크 비용을 절감했습니다.
        </CaseStudy.Result>
      </CaseStudy.Body>
    ),
  },
];

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

        <h3 className="text-2xl my-5 font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          성능 개선
        </h3>
        <section className="flex flex-col gap-8 ">
          {PERFORMANCE.map((item, idx) => (
            <CaseStudy key={idx}>
              <CaseStudy.Header>{item.title}</CaseStudy.Header>
              {item.contents}
            </CaseStudy>
          ))}
        </section>
      </div>
    </div>
  );
}
