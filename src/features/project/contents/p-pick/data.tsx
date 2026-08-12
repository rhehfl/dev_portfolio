import { ProjectDetailData } from "@/features/project/types/projectDetail";

export const projectPerformanceData: ProjectDetailData[] = [
  {
    id: "network-waterfall-optimization",
    header: "숏폼 탐색의 첫 대기 시간을 줄이다",
    sections: [
      {
        title: "문제",
        dotColor: "bg-rose-500",
        contents: [
          {
            type: "text",
            value:
              "관광지 목록, 상세 정보, 이미지가 순차적으로 이어지는 Open API 구조에서 초기 화면에 너무 많은 요청과 이미지를 한 번에 보냈습니다. 결과적으로 첫 슬라이드를 보기 전까지 네트워크 대기가 길어졌습니다.",
          },
        ],
      },
      {
        title: "결정과 구현",
        dotColor: "bg-primary",
        contents: [
          {
            type: "text",
            value:
              "**전체를 먼저 가져오는 방식** 대신, `useSuspenseInfiniteQuery`로 페이지 단위 목록을 만들고 Swiper Virtual로 화면에 필요한 슬라이드만 렌더링했습니다. 현재 위치를 기준으로 다음 페이지를 미리 요청하고, 상세 이미지는 실제로 필요한 시점까지 지연했습니다.",
          },
          {
            type: "code",
            language: "tsx",
            value: `const { data, fetchNextPage, hasNextPage } =
  useSuspenseInfiniteQuery({
    queryKey: ['places', location],
    queryFn: ({ pageParam }) => getPlaces({ location, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

const slides = data.pages.flatMap((page) => page.items);
// 현재 슬라이드 근처에서 다음 페이지를 선행 요청하고,
// 상세 이미지는 슬라이드가 필요해질 때 로드한다.`,
          },
        ],
      },
      {
        title: "확인한 변화",
        dotColor: "bg-emerald-500",
        contents: [
          {
            type: "metrics",
            items: [
              {
                name: "초기 API 요청",
                before: "10회 이상",
                after: "3회",
                rate: "초기 요청 축소",
              },
              {
                name: "초기 이미지 요청",
                before: "38개 · 13.5MB",
                after: "약 8개 · 753KB",
                rate: "초기 대역폭 축소",
              },
            ],
          },
        ],
      },
    ],
    result:
      "API 구조를 바꾸지 못하는 조건에서도, 요청 우선순위와 렌더링 범위를 다시 설계해 사용자가 첫 콘텐츠를 더 빨리 보도록 만들었습니다.",
  },
  {
    id: "infinite-swiper-state-recovery",
    header: "무한 슬라이드의 복구 시점을 안정화하다",
    sections: [
      {
        title: "문제",
        dotColor: "bg-rose-500",
        contents: [
          {
            type: "text",
            value:
              "이전 페이지를 앞쪽에 추가하면 기존 슬라이드의 인덱스가 밀립니다. 이미지가 없는 관광지에서는 Swiper의 `slidesUpdated` 이벤트가 기대한 시점에 오지 않아, 오버레이가 해제되지 않는 경우도 있었습니다.",
          },
        ],
      },
      {
        title: "복구 규칙",
        dotColor: "bg-primary",
        contents: [
          {
            type: "text",
            value:
              "앞에 추가된 항목 수만큼 목표 인덱스를 보정하고, DOM 반영 직후 실행이 보장되는 `useLayoutEffect`에서 슬라이드 위치를 복구했습니다. 세션의 현재 슬라이드와 페이지 파라미터는 URL query로 옮겨 새로고침·공유·재진입에도 같은 지점을 되찾게 했습니다.",
          },
          {
            type: "code",
            language: "tsx",
            value: `const restoredIndex = savedIndex + prependedItems.length;

useLayoutEffect(() => {
  swiperRef.current?.slideTo(restoredIndex, 0);
}, [restoredIndex]);

// /places?slide-index=12&page-param=3
// 탐색 상태를 URL에서 다시 복원한다.`,
          },
        ],
      },
    ],
    result:
      "데이터 추가, Swiper 갱신, 이미지 유무가 서로 다른 타이밍으로 움직이는 문제를 상태 규칙과 복구 시점으로 분리해 안정화했습니다.",
  },
];

export const PPICK_CONTRIBUTIONS = [
  "Swiper 기반 숏폼 탐색 인터페이스 구현",
  "Suspense 기반 목록 조회와 스켈레톤으로 로딩 상태 설계",
  "위치 권한 거부 시에도 탐색을 계속할 수 있는 대체 흐름 구현",
];
