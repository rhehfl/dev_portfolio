import ImprovementCard from '@/components/project/card/ImprovementCard';
import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';
import ProjectTroubleShooting, {
  TroubleShootingItem,
} from '@/components/project/detail/ProjectTroubleShooting';

const TROUBLESHOOTING_DATA: TroubleShootingItem[] = [
  {
    title: '데이터 페칭 최적화',
    problem: {
      src: '/p-pick/trouble1.png',
      alt: '네트워크 요청 그래프',
      desc: '초기 렌더링 시 다수의 API 요청이 동시에 발생하여 네트워크 병목 현상 유발',
      type: 'image',
    },
    recognition: '한번에 너무 많은 양의 데이터를 요청하는 구조 확인',
    process: [
      '가상화를 통해 렌더링 되는 컴포넌트 수를 제한하여 필요한 데이터만 요청하도록 변경',
      '`img` 태그의 `loading="lazy"` 속성을 활용하여 이미지 지연 로딩 적용',
    ],
    result: [
      '초기 API 요청 개수를 10회 이상 → 3회로 축소 ',
      '초기 이미지 개수도 약 30개 이상 → 4개로 축소.',
    ],
  },
];

export const P_PICK_IMPROVEMENTS = [
  {
    id: 2,
    title: 'Dynamic Subset 적용으로 웹 폰트 최적화',
    problem:
      '다양한 font-weight를 포함한 폰트 파일 로딩으로 인해 네트워크 리소스가 낭비되고 초기 렌더링 속도 저하가 우려',
    solution: [
      '불필요한 글리프를 제거하고 화면에 필요한 글자만 동적으로 로딩하는 일반 Dynamic Subset 기법 적용',
      'WOFF2 포맷 사용으로 리소스 경량화',
    ],
    result: '폰트 파일의 용량을 획기적으로 줄여 LCP 성능을 개선',
    metrics: [
      {
        name: '폰트 용량',
        before: '1,559KB',
        after: '272KB',
        rate: '82% 절감',
      },
    ],
  },
] as const;
export default function PPick() {
  return (
    <div className="p-5 h-full ">
      <div className="lg:p-10">
        <ProjectHeader
          id="intro"
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
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          트러블 슈팅
        </h3>
        <section className="flex flex-col gap-8 ">
          {TROUBLESHOOTING_DATA.map((item, index) => (
            <ProjectTroubleShooting key={index} {...item} />
          ))}
        </section>
        <h3 className="text-2xl my-5 font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-3">
          성능 개선
        </h3>
        <section className="flex flex-col gap-8 ">
          {P_PICK_IMPROVEMENTS.map((item) => (
            <ImprovementCard key={item.id} {...item} />
          ))}
        </section>
      </div>
    </div>
  );
}
