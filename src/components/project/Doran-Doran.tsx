import React from 'react';
import { CaseStudy } from '@/components/project/card/CaseStudy'; // 새로 만든 컴파운드 컴포넌트
import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';

export default function DoranDoran() {
  return (
    <div className="p-5 h-full">
      <div className="lg:p-10">
        <ProjectHeader
          id="doran-doran"
          title="Doran-Doran"
          description="AI 페르소나 및 실시간 사용자와 소통하는 채팅 플랫폼"
          techStack={[
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'Tanstack Query',
            'NestJS',
          ]}
          period="2024.10 - 2025.12"
          role="풀스택"
          teamSize="개인 프로젝트"
        />
        <ProjectLinks github="https://github.com/rhehfl/doran-doran" />

        {/* =================================================================
          SECTION 1. 트러블 슈팅
          : 복잡한 데이터(이미지, 코드 등)가 섞여 있어 컴파운드 패턴이 빛을 발함
          =================================================================
        */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-indigo-500 pl-3">
          트러블 슈팅
        </h3>
        <section className="flex flex-col gap-8">
          {/* Case 1: 이미지와 텍스트가 섞인 경우 */}
          <CaseStudy>
            <CaseStudy.Header>
              JWT 만료 시 Suspense Query와 에러 바운더리 충돌 해결
            </CaseStudy.Header>
            <CaseStudy.Body>
              <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
                {/* 이미지를 데이터 객체가 아니라 직관적인 컴포넌트로 배치 */}
                <CaseStudy.Figure
                  src="/doran/jwt_issue.png"
                  alt="Suspense와 JWT 401 에러 충돌"
                  caption="액세스 토큰 만료(401) 시 Suspense가 이를 에러로 간주하여, 토큰 재발급 로직이 돌기도 전에 Error Boundary가 먼저 트리거되는 현상 발생"
                />
              </CaseStudy.Section>

              <CaseStudy.Section title="원인 파악" dotColor="bg-orange-400">
                <CaseStudy.Markdown>
                  React Query의 `useSuspenseQuery`는 Promise가 reject되면 즉시
                  throw하는 특성이 있음. 일반적인 Axios Interceptor 방식으로는
                  Suspense가 던지는 에러를 잡기 전에 UI가 깨져버리는 문제가
                  있음을 파악.
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
                <CaseStudy.Markdown>
                  - Axios Interceptor 레벨이 아닌, **QueryClient의 전역
                  `onError` 핸들러**와 커스텀 훅(`useSuspenseAuth`)을 조합하여
                  해결책을 모색함. - 401 에러 발생 시, Error Boundary로 에러를
                  전파하기 전 **Promise를 잠시 Pending 상태로 유지**시키고,
                  백그라운드에서 토큰 재발급(Refresh)을 시도하도록 로직을
                  수정함. - 재발급 성공 시 실패했던 요청을 투명하게
                  재시도(Retry)하여 사용자가 로그아웃 경험 없이 서비스를 지속할
                  수 있게 함.
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              <CaseStudy.Result isHighlighted>
                토큰 만료 시에도 화면 깜빡임이나 에러 화면 없이 매끄러운 인증
                연장 경험(Silent Refresh) 구현 성공
              </CaseStudy.Result>
            </CaseStudy.Body>
          </CaseStudy>

          {/* Case 2: 코드 스니펫이 포함된 경우 */}
          <CaseStudy>
            <CaseStudy.Header>
              Socket.io 이벤트와 React 상태 동기화 이슈 (중복 렌더링)
            </CaseStudy.Header>
            <CaseStudy.Body>
              <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
                <CaseStudy.Markdown>
                  채팅 전송 시 `Optimistic Update`(낙관적 업데이트)로 화면에
                  미리 띄운 메시지와, 이후 소켓을 통해 브로드캐스트된 메시지가
                  겹쳐서 일시적으로 동일한 메시지가 두 번 보이는 현상 발생
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
                <CaseStudy.Markdown>
                  메시지 전송 시 임시 ID(temp-id)를 생성하여 낙관적 업데이트를
                  수행하고, 서버 응답(ack)이나 소켓 이벤트가 올 때 **임시 ID를
                  실제 DB ID로 교체**하는 매핑 로직을 `useChat` 훅 내부에 구현.
                </CaseStudy.Markdown>

                {/* 코드 블록도 그냥 마크다운 래퍼나 pre 태그로 넣으면 됨 */}
                <div className="mt-3">
                  <CaseStudy.Markdown>
                    {`\`\`\`typescript
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
\`\`\``}
                  </CaseStudy.Markdown>
                </div>
              </CaseStudy.Section>

              <CaseStudy.Result>
                실시간 채팅의 반응 속도는 유지하면서, 메시지 중복 및 순서 꼬임
                현상을 완벽하게 해결.
              </CaseStudy.Result>
            </CaseStudy.Body>
          </CaseStudy>

          {/* Case 3: 일반적인 텍스트 구조 */}
          <CaseStudy>
            <CaseStudy.Header>
              선언적인 관심사 분리: UI 컴포넌트와 비즈니스 로직(Custom Hooks)
            </CaseStudy.Header>
            <CaseStudy.Body>
              <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
                <CaseStudy.Markdown>
                  초기 개발 시 컴포넌트 안에 `socket.on`, `fetch`, `useEffect`가
                  뒤섞여 있어, 채팅 로직 수정 시 UI 코드까지 건드려야 하는 높은
                  결합도 문제 발생.
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
                <CaseStudy.Markdown>
                  - 소켓 연결, 메시지 수신, 상태 관리를 **`useChat`**,
                  **`useChatHistory`** 등의 커스텀 훅으로 분리하여 캡슐화. - UI
                  컴포넌트는 훅이 반환하는 `messages`, `sendMessage`
                  인터페이스만 의존하도록 리팩토링.
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              <CaseStudy.Result>
                비즈니스 로직을 변경(예: REST API - GraphQL 전환 등)하더라도 UI
                컴포넌트는 수정할 필요가 없는 **유지보수 용이한 구조** 확보.
              </CaseStudy.Result>
            </CaseStudy.Body>
          </CaseStudy>
        </section>

        {/* =================================================================
          SECTION 2. 성능 및 UX 개선
          =================================================================
        */}
        <h3 className="text-2xl my-5 font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-indigo-500 pl-3">
          성능 및 UX 개선
        </h3>
        <section className="flex flex-col gap-8">
          <CaseStudy>
            <CaseStudy.Header>
              Redis 도입을 통한 채팅 데이터 조회 성능 최적화
            </CaseStudy.Header>
            <CaseStudy.Body>
              <CaseStudy.Section title="기존 문제" dotColor="bg-red-400">
                채팅방 목록 진입 시 각 방의 채팅 정보를 RDB에서 가져오면서 DB
                부하가 가중되고 응답 속도가 저하되었습니다.
              </CaseStudy.Section>

              <CaseStudy.Section title="해결 방안" dotColor="bg-blue-400">
                <CaseStudy.Markdown>
                  - 빈번하게 변경되고 조회가 일어나는 `Active User` 상태와
                  `Session` 정보를 **Redis(In-memory DB)**로 이관했습니다. -
                  NestJS의 `CacheModule`과 Redis를 연동하여, 단순 조회성
                  데이터는 DB를 거치지 않고 메모리상에서 즉각 반환되도록 구조를
                  변경했습니다.
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              {/* result가 빈 문자열이었으므로 렌더링하지 않음 (훨씬 깔끔함) */}
            </CaseStudy.Body>
          </CaseStudy>
        </section>
      </div>
    </div>
  );
}
