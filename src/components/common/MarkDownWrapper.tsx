'use client';

import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import { memo } from 'react';

interface MarkDownWrapperProps {
  children?: string | null;
}

export default memo(function MarkDownWrapper({
  children,
}: MarkDownWrapperProps) {
  return (
    <div className="markdown-body dark:markdown-body-dark !bg-transparent !text-foreground w-full">
      <ReactMarkdown
        remarkPlugins={[remarkBreaks, remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          pre({ node, className, children, ...props }) {
            return <pre className="!p-0 !m-0 !bg-transparent">{children}</pre>;
          },
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            if (!match) {
              return (
                <code
                  className="bg-muted px-1.5 py-0.5 rounded text-destructive"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <SyntaxHighlighter
                PreTag="div"
                language={match[1]}
                style={vscDarkPlus}
                wrapLines={true}
                lineProps={{
                  style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' },
                }}
                customStyle={{
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  background: '#1e1e1e',
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          },
        }}
      >
        {children || ''}
      </ReactMarkdown>
    </div>
  );
});
