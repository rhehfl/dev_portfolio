import { GitFork, MonitorSmartphone, Server } from 'lucide-react';

export const CAPABILITIES = [
  {
    id: 'opensource',
    variant: 'blue',
    icon: <GitFork />,
    title: '소통하며 함께 성장합니다.',
    description: `동료들과 지식을 공유하고 함께 발전하는것을 좋아합니다.
    팀 내부에 적극적인 코드 리뷰 문화를 도입하여 단일 기능에 60개 이상의 코멘트를 주고받는 치열한 코드 리뷰로 코드 품질을 높였습니다.
    또한 오픈소스 프로젝트에 기여하며 다양한 개발자들과 협업한 경험이 있습니다.`,
  },
  {
    id: 'standard',
    variant: 'green',
    icon: <MonitorSmartphone />,
    title: '웹 표준을 지향합니다',
    description:
      '시멘틱 태그, 반응형 웹, ES6 표준 등 기본 원칙을 준수하며 견고하고 유지보수하기 좋은 웹 환경을 만듭니다.',
  },
  {
    id: 'infrastructure',
    variant: 'purple',
    icon: <Server />,
    title: '넓은 시야로 소통합니다',
    description:
      'NestJS, AWS, CI/CD 구축 경험을 통해 백엔드 로직과 인프라를 이해하며 이를 바탕으로 원활한 협업을 추구합니다.',
  },
] as const;
