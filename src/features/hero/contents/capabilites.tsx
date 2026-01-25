import { MessageSquareCode, ShieldCheck, Container } from 'lucide-react';

export const CAPABILITIES = [
  {
    id: 'opensource',
    variant: 'blue',
    icon: <MessageSquareCode />,
    title: '소통하며 함께 성장합니다.',
    description: `동료들과 지식을 공유하고 발전하는 문화를 지향합니다.
팀 내 코드 리뷰 문화를 주도하여 단일 PR에 60개 이상의 코멘트를 주고받는 등 적극적으로 소통합니다.`,
  },
  {
    id: 'standard',
    variant: 'green',
    icon: <ShieldCheck />,
    title: '개발 생산성을 높이는 환경을 구축합니다.',
    description: `Tanstack Query 키 관리를 위한 팩토리 패턴 도입으로 휴먼 에러 문제를 해결하고
직접 ESLint 플러그인을 제작하여 반복되는 실수를 시스템적으로 차단하는 등 개발 환경을 주도적으로 개선합니다.`,
  },
  {
    id: 'infrastructure',
    variant: 'purple',
    icon: <Container />,
    title: '서비스의 시작부터 배포까지 주도합니다.',
    description: `프론트엔드 영역에 국한되지 않고 서비스 전체의 흐름을 이해합니다.
Docker와 AWS를 활용해 직접 CI/CD 파이프라인을 구축하고, NestJS 기반의 백엔드 개발 경험을 통해 인프라와 서버 로직까지 기여할 수 있습니다.`,
  },
] as const;
