import { ExperienceItem } from "@/features/experience/types/experience";

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 0,
    type: "work",
    period: "2026.04 — 현재",
    title: "앤드와이즈",
    company: "운영서비스팀",
    role: "Frontend Developer",
    description: `
대학·기관 CMS 운영 서비스의 접근성 개선과 운영 화면 수정을 담당합니다.

- 지도 키보드 탐색 시 다음 콘텐츠로 이동할 수 있도록 건너뛰기 링크와 포커스 이동을 구현해 웹 접근성 심사에 대응
- 반복되는 CMS 운영 이슈를 수정하고, 운영자가 처리하는 화면과 흐름을 개선`,
  },
  {
    id: 1,
    type: "open-source",
    period: "2024.06 — 현재",
    title: "@modern-kit",
    company: "Open Source Lib",
    role: "Contributor",
    description: `
React 컴포넌트·훅·유틸리티를 제공하는 오픈 소스 라이브러리에 기여합니다.

- 브라우저 탐색 시 스크롤 위치를 복원하는 useScrollRestoration 훅 구현 및 엣지 케이스 테스트 작성
- 컴포넌트 생명주기에서 콜백의 중복 실행을 막는 useCallbackOnce 훅 구현
- Type Guard 유틸리티와 이슈 수정으로 라이브러리 안정화에 기여`,
    link: "/card/modern-kit",
  },
  {
    id: 2,
    type: "club",
    period: "2024.06 — 2025.02",
    title: "모던 애자일 (Modern Agile)",
    company: "인덕대학교 웹 개발 동아리",
    role: "Frontend Lead · Mentor",
    description: `
    팀 프로젝트의 프론트엔드 리드로서 구현 기준을 맞추고, 리뷰와 멘토링을 진행했습니다.
    
    - CoKo 프로젝트에서 기획부터 배포까지 참여하며 학습자·운영자 화면을 구현
    - 후배 기수의 코드 리뷰와 멘토링을 통해 팀의 개발 흐름을 지원
    - 동아리 오픈 소스 라이브러리 modern-kit에 지속적으로 기여`,
    link: "/card/modern-agile",
  },
];
