import CaseStudy from '@/features/project/components/CaseStudy';
import { Cpu, Server, Lock } from 'lucide-react';

export const DORAN_TROUBLESHOOTING = [
  {
    title: 'Gemini 응답 지연 시각화',
    contents: (
      <CaseStudy.Body>
        <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
          <CaseStudy.Markdown>
            {`생성형 AI의 특성상 긴 답변을 생성할 때 수 초 이상의 **지연 시간**가 발생했습니다.
            HTTP 요청-응답 방식으로는 AI가 답변을 완료할 때까지 사용자가 하염없이 기다려야 했고, 이는 **대화의 몰입감을 해치는 치명적인 UX 저하**로 이어졌습니다.`}
          </CaseStudy.Markdown>
        </CaseStudy.Section>

        <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
          <CaseStudy.Markdown>
            {`**Gemini SDK의 스트림 기능**과 **Socket.io**를 결합한 파이프라인을 구축하여 해결했습니다.
            1. 백엔드에서 Gemini의 \`sendMessageStream\`을 호출하여 청크 단위로 데이터를 수신합니다.
            2. 수신된 텍스트 조각을 즉시 Socket.io의 \`ai-stream\` 이벤트로 클라이언트에 전달합니다.
            3. 클라이언트는 \`ai-stream\` 이벤트를 구독하여 실시간으로 답변이 타이핑되는 듯한 효과를 구현했습니다.`}
          </CaseStudy.Markdown>
          <CaseStudy.Code>
            {`// gemini.service.ts (Backend)
for await (const chunk of stream) {
  if (chunk) {
    // 청크 단위로 즉시 클라이언트에 전송
    emitter.emit('ai-stream', { text: chunk.text });
  }
}
emitter.emit('ai-stream-done', { fullText });`}
          </CaseStudy.Code>
        </CaseStudy.Section>

        <CaseStudy.Result isHighlighted>
          AI 응답 대기 체감 시간을 0초로 단축하고 대화의 실시간성 확보
        </CaseStudy.Result>
      </CaseStudy.Body>
    ),
  },
  {
    title: 'WebSocket 연결 시 쿠키 기반 인증 핸드셰이크',
    contents: (
      <CaseStudy.Body>
        <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
          <CaseStudy.Markdown>
            {`HTTP API와 달리 WebSocket 연결은 표준 헤더 인증 방식이 모호했습니다.
            단순히 소켓 연결 후 토큰을 보내는 방식은 **보안상 취약**할 수 있고, 연결 시점에 즉시 유저를 특정하여 채팅방 접근 권한을 제어해야 했습니다.`}
          </CaseStudy.Markdown>
        </CaseStudy.Section>

        <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
          <CaseStudy.Markdown>
            {`Socket.io의 **Handshake 과정**을 인터셉트하여 인증 로직을 구현했습니다.
            1. 클라이언트가 소켓 연결 시도 시 브라우저의 쿠키를 헤더에 포함시켜 전송합니다.
            2. Gateway의 \`handleConnection\` 단계에서 쿠키를 파싱하고 세션을 검증합니다.
            3. 검증된 유저 정보를 소켓 인스턴스의 \`data\` 속성에 주입하여, 이후 발생하는 모든 이벤트에서 별도 인증 없이 유저를 식별하도록 최적화했습니다.`}
          </CaseStudy.Markdown>
          <CaseStudy.Code>
            {`// chat.gateway.ts
async handleConnection(@ConnectedSocket() socket: Socket) {
  const cookieHeader = socket.handshake.headers.cookie;
  try {
    // 핸드셰이크 단계에서 인증 및 유저 특정
    const user = await this.getCurrentUser(cookieHeader);
    socket.data.user = user; 
    // ... 채팅방 권한 확인 로직 ...
  } catch (error) {
    socket.disconnect(); // 인증 실패 시 즉시 연결 종료
  }
}`}
          </CaseStudy.Code>
        </CaseStudy.Section>

        <CaseStudy.Result>
          표준 HTTP 인증과 동일한 수준의 보안성을 WebSocket에서도 유지
        </CaseStudy.Result>
      </CaseStudy.Body>
    ),
  },
  {
    title: 'React Suspense 런타임 에러 방지를 위한 커스텀 ESLint 플러그인 개발',
    contents: (
      <CaseStudy.Body>
        <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
          <CaseStudy.Markdown>
            {`React Suspense 도입 후 비동기 로직이 있는 컴포넌트에 **Suspense 래퍼를 누락**하여 발생하는 런타임 에러가 빈번했습니다.
            컴포넌트 깊이가 깊어질수록 육안으로 계층 구조를 파악하기 어려워져 휴먼 에러로 인한 서비스 장애가 발생했습니다.`}
          </CaseStudy.Markdown>
        </CaseStudy.Section>

        <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
          <CaseStudy.Markdown>
            {`정적 분석으로는 어떤 타이밍에 \`Promise\` 를 \`throw\` 하는지 알기 어려워 Eslint 커스텀 룰을 제작하여 네이밍 컨벤션을 강제하는 전략을 선택했습니다.
            만약 \`useSuspenseQuery\` 같은 훅을 내부에서 사용한다면 그 커스텀 훅과 컴포넌트의 이름도 반드시 \`Suspense\`로 시작해야 한다는 컨벤션을 강제합니다.
            `}
          </CaseStudy.Markdown>
          <CaseStudy.Code>
            {`
// ❌ Error (빨간 줄)
// 메시지: "이 훅은 내부에서 Suspense를 유발합니다. 이름을 바꾸세요!"
function useUser() {
  return useSuspenseQuery(...);
}

// ✅ Pass
function useSuspenseUser() {
  return useSuspenseQuery(...);
}`}
          </CaseStudy.Code>
        </CaseStudy.Section>

        <CaseStudy.Result>
          휴먼 에러를 정적 분석 도구로 100% 사전에 차단하여 런타임 안정성 확보
        </CaseStudy.Result>
      </CaseStudy.Body>
    ),
  },
];

export const DORAN_PERFORMANCE = [
  {
    title: 'Monorepo 구조 도입을 통한 개발 효율성 증대',
    contents: (
      <CaseStudy.Body>
        <CaseStudy.Section title="도입 배경" dotColor="bg-red-400">
          프론트엔드와 백엔드가 `User`, `Message` 등 동일한 타입 정의를 중복해서
          관리하다 보니, 스키마 변경 시 양쪽을 모두 수정해야 하는 비효율이
          발생했습니다.
        </CaseStudy.Section>

        <CaseStudy.Section title="해결 방안" dotColor="bg-blue-400">
          <CaseStudy.Markdown>
            {`**Yarn Workspace**를 활용한 모노레포 환경을 구축했습니다.
`}
          </CaseStudy.Markdown>
        </CaseStudy.Section>

        <CaseStudy.Result>
          코드 중복 제거 및 풀스택 개발 생산성 향상
        </CaseStudy.Result>
      </CaseStudy.Body>
    ),
  },
];

export const DORAN_INTRO = {
  overview: `도란도란은 사용자가 다양한 AI 페르소나와 실시간으로 소통할 수 있는 대화형 웹 서비스입니다.
  Next.js 와 NestJS 기반으로 구축되었으며, Socket.io와 Gemini API를 결합하여 끊김 없는 대화 경험을 제공하는 데 초점을 맞췄습니다.`,
  features: [
    {
      title: '다양한 페르소나와의 실시간 채팅',
      description:
        '단순한 챗봇이 아닌, 각기 다른 성격과 프롬프트를 가진 AI 페르소나와 대화방을 생성하고 Socket.io를 통해 지연 없는 실시간 소통을 즐길 수 있습니다.',
      mediaSrc: '/doran-doran/doran1.png',
      isVideo: false,
    },
    {
      title: '채팅방 및 이력 관리',
      description:
        '언제든지 이전 채팅방에 다시 접속하여 끊겼던 대화를 이어갈 수 있습니다.',
      mediaSrc: '/doran-doran/doran4.png',
      isVideo: false,
    },
    {
      title: '소셜 로그인 및 익명 접속',
      description:
        'Google, GitHub 등 소셜 로그인을 지원하며, 로그인하지 않은 사용자도 익명 세션을 통해 서비스를 체험할 수 있도록 접근성을 높였습니다.',
      mediaSrc: '/doran-doran/doran2.png',
      isVideo: false,
    },
  ],
};

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
