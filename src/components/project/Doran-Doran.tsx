import ImprovementCard from '@/components/project/card/ImprovementCard';
import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';
import ProjectTroubleShooting, {
  TroubleShootingItem,
} from '@/components/project/detail/ProjectTroubleShooting';

export const IMPROVEMENT_DATA = [
  {
    title: 'Redis 도입을 통한 세션 및 실시간 데이터 조회 성능 최적화',
    problem:
      '채팅방 목록 진입 시, 각 방의 "최근 메시지"와 "안 읽은 메시지 수", "현재 접속자" 정보를 RDB에서 매번 조인(Join) 연산으로 가져오면서 DB 부하가 가중되고 응답 속도가 저하되었습니다.',
    solution: [
      '빈번하게 변경되고 조회가 일어나는 `Active User` 상태와 `Session` 정보를 **Redis(In-memory DB)**로 이관했습니다.',
      'NestJS의 `CacheModule`과 Redis를 연동하여, 단순 조회성 데이터는 DB를 거치지 않고 메모리상에서 즉각 반환되도록 구조를 변경했습니다.',
    ],
    result:
      '채팅방 리스트 조회 Latency를 평균 200ms대에서 10ms 미만으로 약 95% 단축시켰으며, RDB의 I/O 부하를 크게 절감했습니다.',
  },
  {
    title: 'Suspense와 Skeleton UI를 활용한 CLS(Cumulative Layout Shift) 개선',
    problem:
      '기존 `useEffect` 기반 데이터 페칭 시, 프로필 → 채팅방 목록 → 알림 순으로 데이터가 로드될 때마다 레이아웃이 덜컥거리는(Layout Shift) 현상이 발생하여 사용자 경험이 저해되었습니다.',
    solution: [
      'Next.js 14의 **Streaming SSR**과 React **Suspense**를 적극 도입하여, 데이터 로딩 상태를 선언적으로 처리했습니다.',
      '각 컴포넌트(`SuspenseChatRoomList`, `SuspenseProfile`)가 로딩되는 동안 실제 레이아웃과 동일한 크기의 **Skeleton UI**를 미리 배치하여 시각적 안정성을 확보했습니다.',
    ],
    result:
      '초기 로딩 시 레이아웃 이동(CLS) 점수를 0에 가깝게 개선하고, 사용자에게 "앱이 멈추지 않고 동작 중"이라는 인식을 명확히 전달했습니다.',
  },
];

export const TROUBLESHOOTING_DATA: TroubleShootingItem[] = [
  {
    title: 'JWT 만료 시 Suspense Query와 에러 바운더리 충돌 해결',
    problem: {
      src: '/doran/jwt_issue.png', // 예시 이미지 경로
      alt: 'Suspense와 JWT 401 에러 충돌',
      type: 'image',
      desc: '액세스 토큰 만료(401) 시 Suspense가 이를 에러로 간주하여, 토큰 재발급 로직이 돌기도 전에 Error Boundary가 먼저 트리거되는 현상 발생',
    },
    recognition:
      'React Query의 `useSuspenseQuery`는 Promise가 reject되면 즉시 throw하는 특성이 있음. 일반적인 Axios Interceptor 방식으로는 Suspense가 던지는 에러를 잡기 전에 UI가 깨져버리는 문제가 있음을 파악.',
    process: [
      'Axios Interceptor 레벨이 아닌, **QueryClient의 전역 `onError` 핸들러**와 커스텀 훅(`useSuspenseAuth`)을 조합하여 해결책을 모색함.',
      '401 에러 발생 시, Error Boundary로 에러를 전파하기 전 **Promise를 잠시 Pending 상태로 유지**시키고, 백그라운드에서 토큰 재발급(Refresh)을 시도하도록 로직을 수정함.',
      '재발급 성공 시 실패했던 요청을 투명하게 재시도(Retry)하여 사용자가 로그아웃 경험 없이 서비스를 지속할 수 있게 함.',
    ],
    result: [
      '토큰 만료 시에도 화면 깜빡임이나 에러 화면 없이 매끄러운 인증 연장 경험(Silent Refresh) 구현 성공',
    ],
  },
  {
    title: 'Socket.io 이벤트와 React 상태 동기화 이슈 (중복 렌더링)',
    problem:
      '채팅 전송 시 `Optimistic Update`(낙관적 업데이트)로 화면에 미리 띄운 메시지와, 이후 소켓을 통해 브로드캐스트된 메시지가 겹쳐서 일시적으로 동일한 메시지가 두 번 보이는 현상 발생',
    recognition: [
      '내가 보낸 메시지는 클라이언트 상태(Local)와 서버 소켓 이벤트(Server) 두 경로로 들어오기 때문에 발생하는 문제임을 확인.',
      '서버가 메시지에 부여하는 `ID`가 생성되기 전(낙관적 상태)과 후의 식별자가 달라서 리스트 key가 꼬이는 문제.',
    ],
    process: [
      '메시지 전송 시 임시 ID(temp-id)를 생성하여 낙관적 업데이트를 수행하고, 서버 응답(ack)이나 소켓 이벤트가 올 때 **임시 ID를 실제 DB ID로 교체**하는 매핑 로직을 `useChat` 훅 내부에 구현.',
      '소켓 이벤트 수신 시, 전송자가 "나"인 경우 리스트에 추가하지 않고 기존 낙관적 메시지의 상태(전송 중 -> 전송 완료)만 업데이트하도록 필터링 로직 추가.',
    ],
    result: [
      '실시간 채팅의 반응 속도는 유지하면서, 메시지 중복 및 순서 꼬임 현상을 완벽하게 해결.',
    ],
    codeSnippet: `
\`\`\`typescript
// useChat.ts (간소화된 예시)

// 1. 낙관적 업데이트: 임시 ID로 화면에 즉시 표시
const sendMsg = (text) => {
  const tempId = Date.now().toString();
  setMessages(prev => [...prev, { id: tempId, text, status: 'sending' }]);
  
  socket.emit('message', { text }, (response) => {
    // 2. 서버 Ack 수신 시: 임시 ID -> 실제 ID 교체
    setMessages(prev => prev.map(msg => 
      msg.id === tempId ? { ...msg, id: response.id, status: 'sent' } : msg
    ));
  });
};

// 3. 소켓 수신 시: 내가 보낸 메시지는 무시하거나 상태 동기화만 수행
useSocket('message', (newMsg) => {
  if (newMsg.senderId === myUserId) return; // 이미 낙관적 업데이트로 처리됨
  setMessages(prev => [...prev, newMsg]);
});
\`\`\`
`,
  },
  {
    title: '선언적인 관심사 분리: UI 컴포넌트와 비즈니스 로직(Custom Hooks)',
    problem: [
      '초기 개발 시 컴포넌트 안에 `socket.on`, `fetch`, `useEffect`가 뒤섞여 있어, 채팅 로직 수정 시 UI 코드까지 건드려야 하는 높은 결합도 문제 발생.',
    ],
    recognition: [
      '채팅방 컴포넌트는 "메시지를 어떻게 보여줄지"만 담당하고, "메시지를 어떻게 주고받는지"는 몰라도 되어야 한다고 판단.',
    ],
    process: [
      '소켓 연결, 메시지 수신, 상태 관리를 **`useChat`**, **`useChatHistory`** 등의 커스텀 훅으로 분리하여 캡슐화.',
      'UI 컴포넌트는 훅이 반환하는 `messages`, `sendMessage` 인터페이스만 의존하도록 리팩토링.',
    ],
    result: [
      '비즈니스 로직을 변경(예: REST API -> GraphQL 전환 등)하더라도 UI 컴포넌트는 수정할 필요가 없는 **유지보수 용이한 구조** 확보.',
    ],
  },
];

export default function DoranDoran() {
  return (
    <div className="p-5 h-full">
      <div className="lg:p-10">
        <ProjectHeader
          id="doran-doran"
          title="DoranDoran (도란도란)"
          description="AI 페르소나 및 실시간 사용자와 소통하는 힐링 채팅 플랫폼"
          techStack={[
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'Tanstack Query',
            'NestJS',
          ]}
          period="2024.10 - 2025.02 (진행 중)"
          role="풀스택(Front-end 주도), 소켓/인증 아키텍처 설계"
          teamSize="4명"
        />
        <ProjectLinks github="https://github.com/rhehfl/doran-doran" />

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-indigo-500 pl-3">
          트러블 슈팅
        </h3>
        <section className="flex flex-col gap-8">
          {TROUBLESHOOTING_DATA.map((item, index) => (
            <ProjectTroubleShooting key={index} {...item} />
          ))}
        </section>

        <h3 className="text-2xl my-5 font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-indigo-500 pl-3">
          성능 및 UX 개선
        </h3>
        <section className="flex flex-col gap-8">
          {IMPROVEMENT_DATA.map((item, index) => (
            <ImprovementCard key={index} {...item} />
          ))}
        </section>
      </div>
    </div>
  );
}
