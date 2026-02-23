import { ProjectDetailData } from '@/features/project/types/projectDetail';
import { Cpu, Server, Lock } from 'lucide-react';

export const dorandoranPerformanceData: ProjectDetailData[] = [
  {
    id: 'monorepo-integration',
    header: 'Monorepo 구조 도입을 통한 개발 효율성 증대',
    sections: [
      {
        title: '도입 배경',
        dotColor: 'bg-red-400',
        contents: [
          {
            type: 'text',
            value:
              '프론트엔드와 백엔드가 `User`, `Message` 등 동일한 타입 정의를 중복해서 관리하다 보니, 스키마 변경 시 양쪽을 모두 수정해야 하는 비효율이 발생했습니다.',
          },
        ],
      },
      {
        title: '해결 방안',
        dotColor: 'bg-blue-400',
        contents: [
          {
            type: 'text',
            value: '**Yarn Workspace**를 활용한 모노레포 환경을 구축했습니다.',
          },
        ],
      },
    ],
    result: '코드 중복 제거 및 풀스택 개발 생산성 향상',
  },
  {
    id: 'redis-chat-caching',
    header: 'Redis 캐싱을 통한 채팅 내역 조회 성능 3.7배 향상',
    sections: [
      {
        title: '문제 상황',
        dotColor: 'bg-red-400',
        contents: [
          {
            type: 'text',
            value:
              '채팅방 진입 시마다 DB에서 전체 대화 내역을 매번 조회하다 보니, 트래픽이 몰릴 경우 **DB 부하가 급증**하고 응답 속도가 평균 **5.7ms**까지 지연되는 병목이 발생했습니다.',
          },
        ],
      },
      {
        title: '해결 과정',
        dotColor: 'bg-blue-400',
        contents: [
          {
            type: 'text',
            value:
              '인메모리 DB인 **Redis**를 활용한 **Look-aside** 캐싱 전략을 도입했습니다.\n\n1. 채팅 내역 조회 시 Redis 캐시를 먼저 확인하고(Cache Hit), 없을 경우에만 DB를 조회(Cache Miss)합니다.\n2. 새로운 메시지가 전송되면 Write-through 방식으로 캐시와 DB를 동기화하여 데이터 일관성을 유지했습니다.',
          },
          {
            type: 'code',
            language: 'typescript',
            value: `// chat.service.ts (Backend)
async getChatHistory(roomId: string) {
  // 1. 캐시 조회 (메모리 I/O)
  const cached = await this.redis.get(\`chat:\${roomId}\`);
  if (cached) return JSON.parse(cached);

  // 2. DB 조회 (Disk I/O)
  const history = await this.chatRepo.find({ where: { roomId } });

  // 3. 캐싱 (TTL 설정으로 메모리 관리)
  await this.redis.set(\`chat:\${roomId}\`, JSON.stringify(history), 'EX', 3600);
  return history;
}`,
          },
        ],
      },
      {
        title: '성과 지표',
        dotColor: 'bg-green-400',
        contents: [
          {
            type: 'metrics',
            items: [
              {
                name: '조회 응답 속도',
                before: '5.7ms',
                after: '1.5ms',
                rate: '3.7배 단축',
              },
            ],
          },
        ],
      },
    ],
    result:
      '반복적인 읽기 작업의 DB 부하를 제거하고 사용자 경험(Latency) 대폭 개선',
  },
];

export const dorandoranTroubleshootingData: ProjectDetailData[] = [
  {
    id: 'gemini-streaming-ux',
    header: 'Gemini 응답 지연 시각화',
    sections: [
      {
        title: '문제 상황',
        dotColor: 'bg-red-400',
        contents: [
          {
            type: 'text',
            value:
              '생성형 AI의 특성상 긴 답변을 생성할 때 수 초 이상의 **지연 시간**가 발생했습니다. HTTP 요청-응답 방식으로는 AI가 답변을 완료할 때까지 사용자가 기다려야 했고, 이는 **대화의 몰입감을 해치는 치명적인 UX 저하**로 이어졌습니다.',
          },
        ],
      },
      {
        title: '해결 과정',
        dotColor: 'bg-blue-400',
        contents: [
          {
            type: 'text',
            value:
              '**Gemini SDK의 스트림 기능**과 **Socket.io**를 결합한 파이프라인을 구축하여 해결했습니다.\n\n1. 백엔드에서 Gemini의 `sendMessageStream`을 호출하여 청크 단위로 데이터를 수신합니다.\n2. 수신된 텍스트 조각을 즉시 Socket.io의 `ai-stream` 이벤트로 클라이언트에 전달합니다.\n3. 클라이언트는 `ai-stream` 이벤트를 구독하여 실시간으로 답변이 타이핑되는 듯한 효과를 구현했습니다.',
          },
          {
            type: 'code',
            language: 'typescript',
            value: `for await (const chunk of stream) {
  if (chunk) {
    emitter.emit('ai-stream', { text: chunk.text });
  }
}
emitter.emit('ai-stream-done', { fullText });`,
          },
        ],
      },
    ],
    result: 'AI 응답 대기 체감 시간을 단축하고 대화의 실시간성 확보',
  },
  {
    id: 'websocket-cookie-handshake',
    header: 'WebSocket 연결 시 쿠키 기반 인증 핸드셰이크',
    sections: [
      {
        title: '문제 상황',
        dotColor: 'bg-red-400',
        contents: [
          {
            type: 'text',
            value:
              'HTTP API와 달리 WebSocket 연결은 표준 헤더 인증 방식이 모호했습니다. 단순히 소켓 연결 후 토큰을 보내는 방식은 **보안상 취약**할 수 있고, 연결 시점에 즉시 유저를 특정하여 채팅방 접근 권한을 제어해야 했습니다.',
          },
        ],
      },
      {
        title: '해결 과정',
        dotColor: 'bg-blue-400',
        contents: [
          {
            type: 'text',
            value:
              'Socket.io의 **Handshake 과정**을 인터셉트하여 인증 로직을 구현했습니다.\n\n1. 클라이언트가 소켓 연결 시도 시 브라우저의 쿠키를 헤더에 포함시켜 전송합니다.\n2. Gateway의 `handleConnection` 단계에서 쿠키를 파싱하고 세션을 검증합니다.\n3. 검증된 유저 정보를 소켓 인스턴스의 `data` 속성에 주입하여, 이후 발생하는 모든 이벤트에서 별도 인증 없이 유저를 식별하도록 최적화했습니다.',
          },
          {
            type: 'code',
            language: 'typescript',
            value: `async handleConnection(@ConnectedSocket() socket: Socket) {
  const cookieHeader = socket.handshake.headers.cookie;
  try {
    const user = await this.getCurrentUser(cookieHeader);
    socket.data.user = user;
  } catch (error) {
    socket.disconnect();
  }
}`,
          },
        ],
      },
    ],
    result: '표준 HTTP 인증과 동일한 수준의 보안성을 WebSocket에서도 유지',
  },
  {
    id: 'suspense-eslint-rule',
    header:
      'React Suspense 런타임 에러 방지를 위한 커스텀 ESLint 플러그인 개발',
    link: '/blog/7ea1b76d-2dbe-44e4-b3b1-719d6b46e64b',
    sections: [
      {
        title: '문제 상황',
        dotColor: 'bg-red-400',
        contents: [
          {
            type: 'text',
            value:
              'React Suspense 도입 후 비동기 로직이 있는 컴포넌트에 **Suspense 래퍼를 누락**하여 발생하는 런타임 에러가 빈번했습니다. 컴포넌트 깊이가 깊어질수록 육안으로 계층 구조를 파악하기 어려워져 휴먼 에러로 인한 서비스 장애가 발생했습니다.',
          },
        ],
      },
      {
        title: '해결 과정',
        dotColor: 'bg-blue-400',
        contents: [
          {
            type: 'text',
            value:
              '정적 분석으로는 어떤 타이밍에 `Promise`를 `throw`하는지 알기 어려워 Eslint 커스텀 룰을 제작하여 네이밍 컨벤션을 강제하는 전략을 선택했습니다. 만약 `useSuspenseQuery` 같은 훅을 내부에서 사용한다면 그 커스텀 훅과 컴포넌트의 이름도 반드시 `Suspense`로 시작해야 한다는 컨벤션을 강제합니다.',
          },
          {
            type: 'code',
            language: 'typescript',
            value: `// ❌ Error
function useUser() {
  return useSuspenseQuery(...);
}

// ✅ Pass
function useSuspenseUser() {
  return useSuspenseQuery(...);
}`,
          },
        ],
      },
    ],
    result: '휴먼 에러를 정적 분석 도구로 사전에 차단하여 런타임 안정성 확보',
  },
];

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
