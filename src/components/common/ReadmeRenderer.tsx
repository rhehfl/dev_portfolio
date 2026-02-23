'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// CSS import
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
    /* 1. dark:prose-invert를 통해 Tailwind의 타이포그래피 다크모드 지원
       2. markdown-body와 dark:markdown-body-dark로 깃허브 테마 적용
    */
    <div
      className={`readme-container w-full min-w-0 !bg-transparent ${className || ''}`}
    >
      <div className="markdown-body dark:markdown-body-dark">
        <ReactMarkdown
          remarkPlugins={[remarkBreaks, remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter
                  PreTag="div"
                  language={match[1]}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    background: '#ff0000',
                  }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code
                  className="bg-gray-200 dark:bg-gray-800 rounded px-1"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            a: ({ node, ...props }) => (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              />
            ),
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-4">
                <table
                  {...props}
                  className=" w-full border-collapse border border-gray-300"
                />
              </div>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
