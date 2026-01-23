import { Code2, Rocket } from 'lucide-react';

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
    tag: 'Core Engineering',
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
      'Swagger 수동 입력의 비효율을 해소하기 위해 Admin 페이지 개발, 데이터 CRUD 및 AWS S3 이미지 업로드 기능 구현',
      'GitHub Actions와 EC2를 연동하여 메인 브랜치 병합 시 자동 배포되는 파이프라인 설계',
    ],
  },
];
