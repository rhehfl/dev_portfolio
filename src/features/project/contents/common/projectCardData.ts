import { ProjectCard } from '@/features/project/types/ProjectCard';

// 홈 그리드는 md:grid-cols-3 기준: featured(2칸)+sub(1칸)이 1행, mini 3장이 2행을 채운다.
// tier 부여/순서 변경 시 마지막 행이 비어 보일 수 있으니 개수·순서를 함께 조정할 것.
export const ProjectCardData: ProjectCard[] = [
  {
    description: '학습 흐름과 운영 효율을 함께 개선한 퀴즈 기반 교육 웹 서비스',
    githubLink: 'https://github.com/modern-agile-team/8term-coko-Front',
    title: 'CoKo',
    previewImageUrl: '/coko/coko_previewImage.png',
    detailUrl: 'coko',
    techStack: [
      'React',
      'TypeScript',
      'Vite',
      'Zustand',
      'Tanstack Query',
      'Styled-Components',
    ],
    period: '2024.09 ~ 2025.03 (6개월)',
    tier: 'featured',
    highlights: [
      '초기 번들 사이즈 85% 감소 (2.0MB → 300KB)',
      '어드민 구축으로 콘텐츠 운영 요청을 직접 처리할 수 있는 환경 구현',
    ],
  },
  {
    description:
      '고객 인입을 분류·티켓팅해 반복 운영 업무를 줄이는 n8n 기반 사내 자동화 플랫폼',
    title: 'Hermes',
    techStack: ['n8n', 'Jira API', 'LLM'],
    period: '2026.05 ~',
    tier: 'mini',
    badge: 'work',
  },
  {
    description:
      '반복되는 Suspense 런타임 오류를 규칙으로 사전 차단하는 ESLint 플러그인 (npm 배포)',
    githubLink: 'https://github.com/rhehfl/eslint-plugin-react-suspense-check',
    title: 'react-suspense-check',
    techStack: ['JavaScript', 'ESLint', 'Vitest'],
    period: '개인 프로젝트',
    tier: 'mini',
  },
  {
    description: '한국관광공사 api를 사용한 위치기반 관광지 추천 웹 앱',
    githubLink: 'https://github.com/P-pick/front',
    title: 'p-pick',
    previewImageUrl: '/p-pick/ppickFrame.png',
    detailUrl: 'p-pick',
    techStack: [
      'React',
      'TypeScript',
      'Vite',
      'Zustand',
      'Tanstack Query',
      'Tailwind CSS',
    ],
    period: '2024.06 ~ 2024.09 (3개월)',
  },
  {
    description: 'AI 페르소나 및 실시간 사용자와 소통하는 채팅 플랫폼',
    githubLink: 'https://github.com/rhehfl/doran-doran',
    title: 'DoranDoran',
    previewImageUrl: '/doran-doran/doran_preview.png',
    detailUrl: 'doran-doran',
    techStack: [
      'Next.js',
      'TypeScript',
      'NestJS',
      'AWS',
      'Tanstack Query',
      'Tailwind CSS',
    ],
    period: '2025.09 ~ 2025.12',
    tier: 'mini',
  },
  {
    description: '개발 포트폴리오 웹사이트',
    githubLink: 'https://github.com/rhehfl/dev-portfolio',
    title: 'DevPortfolio',
    previewImageUrl: '/dev-portfolio/preview.png',
    detailUrl: 'dev-portfolio',
    techStack: [
      'Next.js',
      'TypeScript',
      'NestJS',
      'AWS',
      'Tanstack Query',
      'Tailwind CSS',
    ],
    period: '2025.12 ~',
  },
];
