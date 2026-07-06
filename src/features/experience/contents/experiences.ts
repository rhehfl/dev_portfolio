import { ExperienceItem } from '@/features/experience/types/experience';

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 0,
    type: 'work',
    period: '2026.04 - 현재',
    title: '앤드와이즈',
    company: '운영서비스팀',
    role: 'CMS 운영 · 자동화',
    description: `
대학·기관 CMS 운영 서비스를 담당하며, 반복 운영 업무를 자동화하는 사내 도구를 만듭니다.

- n8n·Jira API 기반 사내 자동화 플랫폼(Hermes) 설계·구축 — 고객 인입을 LLM이 자동 트리아지해 Jira로 티켓팅
- 수만 건의 운영 이력을 근거 기반 지식 위키(MCP 서버)로 축적`,
  },
  {
    id: 1,
    type: 'open-source',
    period: '2024.06 - 현재',
    title: '@modern-kit',
    company: 'Open Source Lib',
    role: 'Contributor (⭐️ 150+)',
    description: `
클라이언트 개발에 있어 React 관련 유용한 컴포넌트와 커스텀 훅 및 유틸 함수, 타입을 제공하는 오픈 소스 라이브러리

- useScrollRestoration 훅 개발: 브라우저 탐색시 스크롤 위치를 정교하게 복원하는 로직 구현 (AI를 활용한 엣지 케이스 발굴 및 테스트 케이스 작성)
- useCallbackOnce 훅 구현: 컴포넌트 생명주기 내에서 콜백 함수가 중복 실행되지 않고 최초 1회만 실행됨을 보장하는 훅 개발
- 라이브러리 안정화: 각종 Type Guard 유틸 함수 추가 및 이슈 해결을 통한 기여`,
    link: '/card/modern-kit',
  },
  {
    id: 2,
    type: 'club',
    period: '2024.06 - 2025.02',
    title: '모던 애자일 (Modern Agile)',
    company: '인덕대학교 웹 개발 동아리',
    role: 'Member / Mentor',
    description: `
    인덕대학교의 대표적인 웹 개발 동아리로, 다양한 웹 프로젝트를 기획하고 개발하며 주기적인 테크톡을 통한 최신 웹 기술을 탐구하는 활동을 수행
    
    - 프론트엔드 팀장으로서 후배 기수 멘토링 및 프로젝트 관리 역할 수행
    - 동아리 내 오픈 소스 라이브러리 modern-kit에 기여하며 실무 경험 축적
    - 팀 프로젝트 'CoKo' 개발 참여: 기획부터 배포까지 전 과정에 참여하여 실전 개발 역량 강화`,
    link: '/card/modern-agile',
  },
  {
    id: 3,
    type: 'study',
    period: '2025.08 - 2025.12',
    title: '모던 자바스크립트 Deep-Dive',
    company: 'Book Study',
    role: 'Member',
    description: `모던 자바스크립트의 핵심 개념과 심화 주제를 다루는 도서 스터디
    - 클로저, 제네레이터 등 고급 자바스크립트 문법 학습`,
    link: 'https://github.com/rhehfl/Modern-JS-Deep-Dive/tree/main',
  },
];
