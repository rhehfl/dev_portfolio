import { ProjectCard } from '@/types/ProjectCard';

export const ProjectCardData: ProjectCard[] = [
  {
    description: 'JS를 재미있게 학습하기 위한 퀴즈 기반 교육 웹 사이트',
    githubLink: 'https://github.com/modern-agile-team/8term-coko-Front',
    title: 'CoKo',
    previewImageUrl: '/coko/coko_previewImage.png',
    detailUrl: 'coko',
    thechStack: [
      'React',
      'TypeScript',
      'Vite',
      'Zustand',
      'Tanstack Query',
      'Styled-Components',
    ],
    period: '2024.09 - 2025.03 (6개월)',
  },
  {
    description: '한국관광공사 api를 사용한 위치기반 관광지 추천 웹 앱',
    githubLink: 'https://github.com/rhehfl/doran-doran',
    title: 'p-pick',
    previewImageUrl: '/p-pick/ppickFrame.png',
    detailUrl: 'p-pick',
    thechStack: [
      'React',
      'TypeScript',
      'Vite',
      'Zustand',
      'Tanstack Query',
      'Tailwind CSS',
    ],
    period: '2025.06 ~ 2025.09 (3개월)',
  },
  {
    description: 'AI 페르소나 및 실시간 사용자와 소통하는 힐링 채팅 플랫폼',
    githubLink: 'https://github.com/rhehfl/doran-doran',
    title: 'DoranDoran',
    previewImageUrl: '/herosection_main.png', // public 폴더 내 해당 이미지 경로로 수정해주세요
    detailUrl: 'doran-doran',
    thechStack: [
      'Next.js',
      'TypeScript',
      'NestJS',
      'AWS',
      'Tanstack Query',
      'Tailwind CSS',
    ],
    period: '2024.10 ~ 2025.02 (진행 중)',
  },
];
