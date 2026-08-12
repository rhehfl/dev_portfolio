import { ProjectCard } from "@/features/project/types/ProjectCard";

// 홈 그리드는 md:grid-cols-3 기준: featured(2칸)+sub(1칸)이 1행, mini 3장이 2행을 채운다.
// tier 부여/순서 변경 시 마지막 행이 비어 보일 수 있으니 개수·순서를 함께 조정할 것.
export const ProjectCardData: ProjectCard[] = [
  {
    description:
      "JavaScript를 퀴즈로 학습하는 서비스. 학습 화면과 콘텐츠를 관리하는 운영 어드민을 함께 구현했습니다.",
    githubLink: "https://github.com/modern-agile-team/8term-coko-Front",
    title: "CoKo",
    previewImageUrl: "/coko/coko_previewImage.png",
    detailUrl: "coko",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Zustand",
      "Tanstack Query",
      "Styled-Components",
    ],
    period: "2024.09 — 2025.03 · Frontend · 팀 프로젝트",
    tier: "featured",
    highlights: [
      "퀴즈 유형별 화면과 학습 중 이탈 확인 흐름 구현",
      "파트·섹션·문제 순서 관리 및 콘텐츠 운영 화면 구현",
    ],
  },
  {
    description:
      "위치 기반 관광지를 숏폼으로 탐색하는 서비스. 무한 슬라이드의 상태 복구와 네트워크 비용을 함께 개선했습니다.",
    githubLink: "https://github.com/P-pick/front",
    title: "P-Pick",
    previewImageUrl: "/p-pick/ppickFrame.png",
    detailUrl: "p-pick",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Zustand",
      "Tanstack Query",
      "Tailwind CSS",
    ],
    period: "2025.06 — 2025.08 · Frontend · 2인 팀",
    tier: "featured",
    highlights: [
      "초기 API 요청 10회 이상 → 3회로 축소",
      "초기 이미지 38개(13.5MB) → 약 8개(753KB)로 축소",
    ],
  },
  {
    description:
      "AI 페르소나와 실시간 사용자가 함께 대화하는 채팅 플랫폼을 Next.js와 NestJS로 구현했습니다.",
    githubLink: "https://github.com/rhehfl/doran-doran",
    title: "DoranDoran",
    previewImageUrl: "/doran-doran/doran_preview.png",
    detailUrl: "doran-doran",
    techStack: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "AWS",
      "Tanstack Query",
      "Tailwind CSS",
    ],
    period: "2025.09 — 2025.12 · Frontend · 팀 프로젝트",
  },
  {
    description: "개발 포트폴리오 웹사이트",
    githubLink: "https://github.com/rhehfl/dev-portfolio",
    title: "DevPortfolio",
    previewImageUrl: "/dev-portfolio/preview.png",
    detailUrl: "dev-portfolio",
    techStack: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "AWS",
      "Tanstack Query",
      "Tailwind CSS",
    ],
    period: "2025.12 ~",
  },
];
