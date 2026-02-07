import { MessageSquareCode, Layers, Zap } from 'lucide-react';

export const CAPABILITIES = [
  {
    id: 'opensource',
    variant: 'blue',
    icon: <MessageSquareCode />,
    title: '소통하며 함께 성장합니다.',
    description: `동료들과 지식을 공유하고 발전하는 문화를 지향합니다.
팀 내 코드 리뷰 문화를 주도하여 단일 PR에 60개 이상의 코멘트를 주고받으며, 노션, 피그마등을 활용하여 효과적으로 협업하고 소통합니다.`,
  },
  {
    id: 'productivity',
    variant: 'green',
    icon: <Zap />,
    title: '개발 생산성을 높이는 환경을 구축합니다.',
    description: `React Suspense 런타임 에러를 예방하는 ESLint 플러그인을 직접 개발·배포하여 디버깅 비용을 줄였습니다.
Query Key Factory 패턴으로 휴먼 에러를 제거하고, 어드민 페이지 개발로 팀의 운영 요청 대응 시간을 단축했습니다.`,
  },
  {
    id: 'performance',
    variant: 'purple',
    icon: <Layers />,
    title: '성능과 사용자 경험을 함께 고민합니다.',
    description: `번들 사이즈 85% 감소(2MB→300KB), 이미지 요청 85% 최적화 등 측정 가능한 성과를 만들어냅니다.
Skeleton UI와 낙관적 업데이트로 체감 대기시간을 제거하고, 도메인 기반 아키텍처로 유지보수성을 확보합니다.`,
  },
] as const;
