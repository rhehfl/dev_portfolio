'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// GitHub 스타일 기본 CSS 불러오기
import 'github-markdown-css/github-markdown.css';

interface ReadmeRendererProps {
  content: string;
  className?: string;
}

export default function ReadmeRenderer({
  content,
  className,
}: ReadmeRendererProps) {
  return (
    <div className={`readme-container w-full min-w-0 ${className || ''}`}>
      {/* ✅ 스타일 격리 (Scoped Style)
        이 컴포넌트 내부의 .markdown-body에만 적용되는 강력한 스타일입니다.
        globals.css를 수정할 필요 없이 이 컴포넌트만 가져다 쓰면 해결됩니다.
      */}
      <style jsx global>{`
        /* 배경 투명화 및 기본 폰트 설정 */
        .readme-container .markdown-body {
          background-color: transparent !important;
          font-family:
            -apple-system, BlinkMacSystemFont, system-ui, 'Segoe UI', Helvetica,
            Arial, sans-serif !important;
          box-sizing: border-box;
          min-width: 0;
        }

        /* 🚨 테이블 레이아웃 강제 교정 (핵심) */
        .readme-container .markdown-body table {
          display: table !important; /* block으로 변하는 것 방지 */
          width: 100% !important;
          table-layout: auto !important; /* 내용물에 맞춰 칸 조절 */
          border-collapse: collapse !important;
          margin: 1rem 0 !important;
        }

        /* 테이블 셀 설정 */
        .readme-container .markdown-body td,
        .readme-container .markdown-body th {
          padding: 8px !important;
          border: 1px solid #d0d7de !important;
          vertical-align: middle !important;
          text-align: center !important; /* 이미지/텍스트 중앙 정렬 */
        }

        /* 🚨 이미지 설정 (가로 배치 허용) */
        .readme-container .markdown-body img {
          border-style: none !important;
          display: inline-block !important; /* block 아님! 옆으로 나란히 */
          max-width: 100% !important;
          height: auto !important;
          margin: 0 !important; /* 불필요한 마진 제거 */
          vertical-align: middle !important;
        }

        /* 링크 설정 */
        .readme-container .markdown-body a {
          color: inherit !important;
          text-decoration: none !important;
          display: inline-block !important;
        }

        /* 다크모드 대응 */
        @media (prefers-color-scheme: dark) {
          .readme-container .markdown-body td,
          .readme-container .markdown-body th {
            border-color: #30363d !important;
          }
        }
      `}</style>

      <div className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkBreaks, remarkGfm]}
          rehypePlugins={[rehypeRaw]} // HTML 태그(table, div 등) 파싱 필수
          components={{
            // 코드 하이라이팅
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              if (!match) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
              return (
                <SyntaxHighlighter
                  PreTag="div"
                  language={match[1]}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                  }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            },
            // 링크 새 창 열기
            a: ({ node, ...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
