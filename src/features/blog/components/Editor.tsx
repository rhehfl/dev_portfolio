'use client';

import TextareaAutosize from 'react-textarea-autosize';
import MarkDownWrapper from '@/components/common/MarkDownWrapper';
import { useEditor } from '@/features/blog/hooks/useEditor';
import { useDeferredValue } from 'react';
interface EditorUIProps {
  postId?: string;
}
export default function Editor({ postId }: EditorUIProps) {
  const {
    post,
    tagInput,
    setTagInput,
    textareaRef,
    handleTitleChange,
    handleContentChange,
    handleTagKeyDown,
    removeTag,
    handlePaste,
    handleSubmit,
  } = useEditor(postId);
  const deferredContent = useDeferredValue(post.content);

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground">
      <div className="p-8 pb-4">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="w-full text-4xl font-bold outline-none border-none bg-transparent placeholder:text-muted-foreground"
          value={post.title}
          onChange={handleTitleChange}
        />
        <div className="h-1.5 w-16 bg-primary mt-4 mb-2" />
      </div>

      <div className="px-8 pb-4 flex flex-wrap gap-2 items-center">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            onClick={() => removeTag(index)}
            className="bg-muted text-primary px-4 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {tag}
          </span>
        ))}
        <input
          type="text"
          placeholder="태그를 입력하세요"
          className="flex-1 min-w-[150px] text-lg outline-none border-none bg-transparent placeholder:text-muted-foreground"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
        />
      </div>

      <div className="flex flex-1 min-h-0">
        <div className="flex-1 p-8 overflow-auto border-r border-border">
          <TextareaAutosize
            ref={textareaRef}
            placeholder="본문을 입력하세요"
            className="w-full h-full resize-none overflow-hidden outline-none bg-transparent text-lg leading-relaxed text-foreground"
            value={post.content}
            onChange={handleContentChange}
            onPaste={handlePaste}
          />
        </div>
        <div className="flex-1 p-8 overflow-y-auto bg-muted prose prose-slate dark:prose-invert max-w-none">
          {post.title && (
            <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
          )}
          <MarkDownWrapper>{deferredContent}</MarkDownWrapper>
        </div>
      </div>

      <footer className="h-16 px-8 flex items-center justify-between shadow-[0_-1px_10px_rgba(15,23,42,0.1)] bg-card">
        <button className="text-muted-foreground hover:text-foreground font-medium transition">
          ← 나가기
        </button>
        <button
          onClick={handleSubmit}
          className="bg-primary text-primary-foreground px-5 py-2 rounded font-bold transition hover:brightness-110"
        >
          출간하기
        </button>
      </footer>
    </div>
  );
}
