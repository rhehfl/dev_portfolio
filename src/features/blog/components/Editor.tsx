'use client';

import TextareaAutosize from 'react-textarea-autosize';
import MarkDownWrapper from '@/components/common/MarkDownWrapper';
import { useEditor } from '@/features/blog/hooks/useEditor';
import { useDeferredValue } from 'react';
import { useRouter } from 'next/navigation';

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
    togglePublished,
    isSubmitting,
  } = useEditor(postId);
  const deferredContent = useDeferredValue(post.content);
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground">
      <div className="p-8 pb-4">
        {/* 제목 입력 — label + aria-label로 스크린 리더 지원 */}
        <label htmlFor="post-title" className="sr-only">
          글 제목
        </label>
        <input
          id="post-title"
          type="text"
          placeholder="제목을 입력하세요"
          className="w-full text-4xl font-bold outline-none border-none bg-transparent placeholder:text-muted-foreground"
          value={post.title}
          onChange={handleTitleChange}
          aria-required="true"
        />
        {/* 장식용 구분선 — 스크린 리더에서 숨김 */}
        <div className="h-1.5 w-16 bg-primary mt-4 mb-2" aria-hidden="true" />
      </div>

      <div
        className="px-8 pb-4 flex flex-wrap gap-2 items-center"
        role="group"
        aria-label="태그 목록"
      >
        {post.tags.map((tag, index) => (
          /* span → button으로 변경: 키보드 접근 가능 (WCAG 2.1.1) */
          <button
            key={index}
            type="button"
            onClick={() => removeTag(index)}
            aria-label={`태그 ${tag} 삭제`}
            className="bg-muted text-primary px-4 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {tag}
          </button>
        ))}
        <label htmlFor="tag-input" className="sr-only">
          태그 입력 (Enter 또는 쉼표로 추가)
        </label>
        <input
          id="tag-input"
          type="text"
          placeholder="태그를 입력하세요"
          className="flex-1 min-w-[150px] text-lg outline-none border-none bg-transparent placeholder:text-muted-foreground"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          aria-describedby="tag-hint"
        />
        <span id="tag-hint" className="sr-only">
          Enter 또는 쉼표(,)를 눌러 태그를 추가하세요. Backspace로 마지막 태그를 삭제할 수 있습니다.
        </span>
      </div>

      <div className="flex flex-1 min-h-0">
        <div className="flex-1 p-8 overflow-auto border-r border-border">
          {/* 본문 입력 — label + aria-label로 스크린 리더 지원 */}
          <label htmlFor="post-content" className="sr-only">
            글 본문 (마크다운 지원)
          </label>
          <TextareaAutosize
            id="post-content"
            ref={textareaRef}
            placeholder="본문을 입력하세요"
            className="w-full h-full resize-none overflow-hidden outline-none bg-transparent text-lg leading-relaxed text-foreground"
            value={post.content}
            onChange={handleContentChange}
            onPaste={handlePaste}
            aria-required="true"
          />
        </div>
        <div
          className="flex-1 p-8 overflow-y-auto bg-muted prose prose-slate dark:prose-invert max-w-none"
          aria-label="마크다운 미리보기"
          aria-live="polite"
        >
          {post.title && (
            <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
          )}
          <MarkDownWrapper>{deferredContent}</MarkDownWrapper>
        </div>
      </div>

      <footer className="h-16 px-8 flex items-center justify-between shadow-[0_-1px_10px_rgba(15,23,42,0.1)] bg-card">
        {/* 나가기 — 뒤로 가는 동작이므로 button + router.back() */}
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="에디터 나가기"
          className="text-muted-foreground hover:text-foreground font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          ← 나가기
        </button>
        <div className="flex items-center gap-3">
          {postId && (
            <button
              type="button"
              onClick={togglePublished}
              className={`px-4 py-2 rounded font-medium text-sm transition ${
                post.is_published
                  ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800'
                  : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800'
              }`}
            >
              {post.is_published ? '공개' : '비공개'}
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground px-5 py-2 rounded font-bold transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '저장 중...' : postId ? '저장하기' : '출간하기'}
          </button>
        </div>
      </footer>
    </div>
  );
}
