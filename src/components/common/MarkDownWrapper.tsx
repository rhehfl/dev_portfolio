'use client';

import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm'; // ✅ 추가: 테이블, 체크리스트, 취소선 지원
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css/github-markdown.css';

interface MarkDownWrapperProps {
  children?: string | null;
}

export default function MarkDownWrapper({ children }: MarkDownWrapperProps) {
  return (
    <div className="markdown-body" style={{ backgroundColor: 'transparent' }}>
      <ReactMarkdown
        remarkPlugins={[remarkBreaks, remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
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

          img: (image) => {
            return (
              <img
                src={image.src}
                alt={image.alt}
                style={{ maxWidth: '100%' }}
              />
            );
          },
        }}
      >
        {children || ''}
      </ReactMarkdown>
    </div>
  );
}
