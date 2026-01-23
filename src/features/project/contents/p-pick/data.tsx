import CaseStudy from '@/features/project/components/CaseStudy';
import { Smartphone, Map } from 'lucide-react';
export const PPICK_INTRO = {
  overview: `P-Pick은 "계획 없는 여행도 완벽할 수 있다"는 모토로 시작된 MBTI 'P' 유형을 위한 여행 가이드 서비스입니다.
  복잡한 검색 대신 숏폼 콘텐츠를 넘겨보듯 직관적인 UI로 주변 여행지를 탐색하고, 현재 위치를 기반으로 최적의 동선을 즉흥적으로 추천받을 수 있습니다.`,
  features: [
    {
      title: '숏폼 스타일의 여행지 탐색',
      description:
        'TikTok이나 Reels처럼 스와이프 한 번으로 주변 관광지 정보를 빠르게 탐색할 수 있습니다. 텍스트보다 이미지와 영상을 강조하여 여행지의 매력을 직관적으로 전달합니다.',
      mediaSrc: '/p-pick/ppick4.png',
      isVideo: false,
    },
    {
      title: '내 위치 기반 즉흥 경로 추천',
      description:
        '현재 위치를 실시간으로 추적하여 반경 내 가볼 만한 곳을 지도 위에 핀포인트로 시각화합니다. 카카오맵 API와 연동하여 도보, 대중교통 경로를 바로 안내합니다.',
      mediaSrc: '/p-pick/ppick2.png',
      isVideo: false,
    },
    {
      title: '바텀 시트를 이용한 직관적 정보 제공',
      description:
        'framer-motion 라이브러리를 활용해 바텀 시트를 구현, 사용자가 여행지의 상세 정보, 사진, 리뷰를 손쉽게 확인할 수 있도록 했습니다. 화면 전환 없이도 풍부한 정보를 제공하여 몰입감을 높였습니다.',
      mediaSrc: '/p-pick/ppick3.png',
      isVideo: false,
    },
    {
      title: '실시간 여행자 리뷰 공유',
      description:
        'Firebase를 백엔드로 활용하여 로그인한 유저들이 실시간으로 여행지 리뷰와 별점을 남기고 공유할 수 있는 커뮤니티 기능을 제공합니다.',
      mediaSrc: '/p-pick/ppick1.png',
      isVideo: false,
    },
  ],
};

export const PPICK_CONTRIBUTIONS = [
  {
    title: 'UI/UX & Interactive Design',
    tag: 'User Experience',
    icon: <Smartphone className="w-5 h-5 text-green-500" />,
    points: [
      'Swiper.js를 활용한 숏폼 스타일 인터페이스 개발',
      '데이터 페칭 시 스켈레톤 UI를 적용하여 CLS를 방지하고 체감 로딩 속도 개선',
    ],
  },
];
export const PERFORMANCE = [
  {
    title: '네트워크 워터폴 현상 개선',
    contents: (
      <CaseStudy.Body>
        <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
          <CaseStudy.Markdown>
            {`활용한 Open API 구조상 **[위치 정보 → 상세 정보 → 이미지 URL]** 로 이어지는 구조 변경이 불가능했습니다.
            초기 설계에서는 모든 여행지의 이미지를 한 번에 로딩하려다 보니, 이 Waterfall 대기 시간이 누적되어 **초기 화면 렌더링(LCP)까지 치명적인 지연**이 발생했습니다.`}
          </CaseStudy.Markdown>
        </CaseStudy.Section>

        <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
          <CaseStudy.Markdown>
            {`API 구조를 변경할 수 없는 상황에서, **초기 로딩 부하를 분산**시키는 전략으로 선회했습니다.
            - **Swiper Virtual 모드**: 전체 리스트를 요청하지 않고, 뷰포트에 보이는 슬라이드만 우선 렌더링
            - **점진적 프리패치(Pre-fetch)**: 현재 슬라이드를 볼 때 **다음 슬라이드의 3단계 요청을 백그라운드에서 미리 수행**하여 대기 시간 은폐
            - **Lazy Loading**: 당장 보이지 않는 이미지는 로딩을 지연시켜 초기 대역폭 확보`}
          </CaseStudy.Markdown>

          <CaseStudy.Code>
            {`
<Swiper 
  modules={[Virtual]} 
  virtual={{ enabled: true }}
  onSlideChange={(swiper) => {
    // 사용자가 보고 있는 동안 다음 여행지의 3단계 요청을 미리 시작
    prefetchNextSpot(swiper.activeIndex + 1); 
  }}
>
  {slides.map((slide, index) => (
    <SwiperSlide key={slide.id} virtualIndex={index}>
       <DetailContent data={slide} />
    </SwiperSlide>
  ))}
</Swiper>`}
          </CaseStudy.Code>
        </CaseStudy.Section>

        <CaseStudy.Section title="성과 지표" dotColor="bg-green-400">
          <CaseStudy.Metrics>
            <CaseStudy.MetricItem
              name="초기 API 요청"
              before="10회"
              after="3회"
              rate="초기 로딩 단축"
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
          제어할 수 없는 API의 구조적 한계(Waterfall)를 점진적 프리패칭 기술로
          은폐하여, 사용자에게 끊김 없는 탐색 경험을 제공했습니다.
        </CaseStudy.Result>
      </CaseStudy.Body>
    ),
  },
  {
    title: '다이나믹 서브셋 적용을 통한 폰트 용량 82% 감소',
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
            {`프로젝트에서 사용하는  \`font-weight\`가 제한적이므로 가변 폰트보다 **일반 다이나믹 서브셋**이 용량 절감에 유리하다고 판단했습니다.
            로컬 호스팅 대신 유지보수 비용이 낮은 **CDN + 다이나믹 서브셋** 방식을 채택하여 필요한 글자만 분할 다운로드되도록 구성했습니다.

         `}
          </CaseStudy.Markdown>
          <CaseStudy.Code>
            {`
<link 
  rel="stylesheet" 
  as="style" 
  crossorigin 
  href="https://cdn.jsdelivr.net/gh/.../pretendard-dynamic-subset.css" 
/>}`}
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
