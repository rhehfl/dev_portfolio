import { Cpu, Server, Lock } from 'lucide-react';

export const DORAN_CONTRIBUTIONS = [
  {
    title: '풀 스택 개발',
    tag: 'System Design',
    icon: <Server className="w-5 h-5 text-blue-500" />,
    points: [
      'Next.js(Front)와 NestJS(Back)를 하나의 레포지토리로 통합하고 공통 타입 패키지(Common)를 설계하여 개발 생산성 확보',
      'TypeORM과 PostgreSQL을 사용하여 유저, 채팅방, 메시지, 페르소나 간의 관계형 데이터베이스 스키마 설계 및 마이그레이션 관리',
    ],
  },
  {
    title: 'webSocket 게이트웨이 개발',
    tag: 'Core Tech',
    icon: <Cpu className="w-5 h-5 text-purple-500" />,
    points: [
      'Room 기능을 활용하여 다중 채팅방을 지원하는 확장성 있는 웹소켓 게이트웨이 개발',
      'Google Gemini API의 스트리밍 응답을 Socket.io와 결합하여 실시간 AI 답변 제공 구축',
    ],
  },
  {
    title: '보안 및 인증',
    tag: 'Security',
    icon: <Lock className="w-5 h-5 text-green-500" />,
    points: [
      'WS 핸드셰이크 시점의 쿠키 파싱 및 세션 검증 로직을 직접 구현하여 비인가 사용자의 소켓 연결 차단',
      'Passport.js를 활용하여 Google 소셜 로그인 및 JWT 기반의 인증 시스템 구축',
    ],
  },
];
