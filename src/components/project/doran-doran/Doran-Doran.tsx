import React from 'react';
import { CaseStudy } from '@/components/project/card/CaseStudy';
import ProjectHeader from '@/components/project/detail/ProjectHeader';
import ProjectLinks from '@/components/project/detail/ProjectLinks';

export default function DoranDoran() {
  return (
    <div className="p-5 h-full">
      <div className="lg:p-10">
        <ProjectHeader
          title="Doran-Doran"
          description="Google Gemini 기반 AI 페르소나 및 실시간 사용자 채팅 플랫폼"
          techStack={[
            'Next.js',
            'TypeScript',
            'NestJS',
            'Tanstack Query',
            'Tailwind CSS',
          ]}
          period="2024.10 - 2025.12"
          role="풀스택 (1인 개발)"
          teamSize="개인 프로젝트"
        />
        <ProjectLinks github="https://github.com/rhehfl/doran-doran" />

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-indigo-500 pl-3">
          핵심 기술 구현
        </h3>
        <section className="flex flex-col gap-8">
          <CaseStudy>
            <CaseStudy.Header>
              WebSocket을 활용한 LLM 응답 실시간 스트리밍
            </CaseStudy.Header>
            <CaseStudy.Body>
              <CaseStudy.Section title="구현 배경" dotColor="bg-blue-400">
                <CaseStudy.Markdown>
                  일반적인 HTTP 요청-응답 방식은 AI 생성이 완료될 때까지
                  사용자가 오래 대기해야 하는 단점이 있었습니다. 타자 치듯
                  글자가 나타나는 타이핑 효과를 통해 사용자 경험을 개선하고자
                  했습니다.
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              <CaseStudy.Section title="기술적 해결" dotColor="bg-indigo-400">
                <CaseStudy.Markdown>
                  - 백엔드 `GeminiService`에서 `generateStreamContent`를 통해 AI
                  응답을 청크단위로 수신 `Socket.io`의 `ai-stream` 이벤트를 통해
                  클라이언트로 실시간 전송.
                </CaseStudy.Markdown>
                <div className="mt-4">
                  <CaseStudy.Markdown>
                    {`\`\`\`typescript
// Backend: Chunk 단위 방출 (gemini.service.ts)
for await (const chunk of stream) {
  if (chunk) {
    fullResponseText += chunk.text;
    emitter.emit('ai-stream', { text: chunk.text }); // 실시간 전송
  }
}
emitter.emit('ai-stream-done', { fullText: fullResponseText });
\`\`\``}
                  </CaseStudy.Markdown>
                </div>
              </CaseStudy.Section>

              <CaseStudy.Result isHighlighted>
                AI의 긴 응답 체감 대기시간을 단축하고 대화의 몰입감을
                극대화했습니다.
              </CaseStudy.Result>
            </CaseStudy.Body>
          </CaseStudy>

          {/* Case 2: Redis 캐싱 */}
          <CaseStudy>
            <CaseStudy.Header>
              Redis 기반의 하이브리드 캐싱 전략
            </CaseStudy.Header>
            <CaseStudy.Body>
              <CaseStudy.Section title="문제 상황" dotColor="bg-red-400">
                <CaseStudy.Markdown>
                  채팅방 진입 시마다 RDBMS(PostgreSQL)에서 전체 대화 내역을
                  조회하면서 I/O 부하가 우려되었습니다.
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              <CaseStudy.Section title="해결 과정" dotColor="bg-blue-400">
                <CaseStudy.Markdown>
                  채팅 내역 조회 시 Redis List를 먼저 확인하고, `Cache Miss`
                  발생 시에만 DB를 조회 후 Redis에 적재, 메시지 전송 시 DB
                  저장과 동시에 Redis `rPush`를 수행하여 실시간 데이터의
                  최신성을 메모리상에서 유지하도록 설계했습니다.
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              <CaseStudy.Result>
                자주 조회되는 최근 100건의 메시지를 In-memory에서 서빙하여 채팅
                로딩 속도를 개선했습니다.
              </CaseStudy.Result>
            </CaseStudy.Body>
          </CaseStudy>
        </section>

        <h3 className="text-2xl my-5 font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-indigo-500 pl-3">
          트러블 슈팅
        </h3>
        <section className="flex flex-col gap-8">
          <CaseStudy>
            <CaseStudy.Header>
              분산 저장소 환경에서의 데이터 정합성 문제 해결
            </CaseStudy.Header>
            <CaseStudy.Body>
              <CaseStudy.Section
                title="문제 상황 (Ghost Message)"
                dotColor="bg-red-400"
              >
                <CaseStudy.Figure
                  src="/doran/consistency_issue.png" // 이미지가 없다면 이 부분 제거
                  alt="DB 실패 시 Redis에만 남는 현상"
                  caption="DB 저장은 실패했으나 예외 처리 미흡으로 Redis에는 메시지가 저장되어, 새로고침 전까지만 메시지가 보이는 '유령 메시지' 현상 발견"
                />
                <CaseStudy.Markdown>
                  초기 구현 시 `try-catch` 블록에서 DB 저장이 실패해도 Redis
                  캐시에 데이터를 푸시하는 코드가 실행되었습니다. 이로 인해
                  **"사용자 눈에는 보이지만 실제 DB에는 없는"** 데이터 불일치
                  문제가 발생했습니다.
                </CaseStudy.Markdown>
              </CaseStudy.Section>

              <CaseStudy.Section title="해결 및 개선" dotColor="bg-orange-400">
                <CaseStudy.Markdown>
                  DB 저장이 성공한 이후에만 Redis에 푸시하도록 로직 순서를
                  엄격하게 제어했습니다.
                </CaseStudy.Markdown>
                <div className="mt-4">
                  <CaseStudy.Markdown>
                    {`\`\`\`typescript
// 개선된 로직 (Pseudo code)
try {
  // 1. DB 저장 (Source of Truth)
  await this.messageRepository.save(newChatMessage);
  
  // 2. DB 성공 시에만 캐시 업데이트
  await this.redisClient.rPush(key, JSON.stringify(message));
} catch (error) {
  // 3. 실패 시 클라이언트에 에러 전파 및 캐시 갱신 중단
  this.server.emit('save-error', { ... });
  console.error('DB Write Failed'); 
}
\`\`\``}
                  </CaseStudy.Markdown>
                </div>
              </CaseStudy.Section>
            </CaseStudy.Body>
          </CaseStudy>
        </section>
      </div>
    </div>
  );
}
