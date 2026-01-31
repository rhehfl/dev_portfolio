'use client';

import TextareaAutosize from 'react-textarea-autosize';
import MarkDownWrapper from '@/components/common/MarkDownWrapper';
import { useEditor } from '@/features/blog/hooks/useEditor';

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

  return (
    <div className="flex flex-col h-screen w-full bg-white text-gray-900">
      {/* 제목 영역 */}
      <div className="p-8 pb-4">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="w-full text-4xl font-bold outline-none border-none placeholder-gray-300"
          value={post.title}
          onChange={handleTitleChange}
        />
        <div className="h-1.5 w-16 bg-gray-800 mt-4 mb-2"></div>
      </div>

      <div className="px-8 pb-4 flex flex-wrap gap-2 items-center">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            onClick={() => removeTag(index)}
            className="bg-gray-100 text-teal-600 px-4 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            {tag}
          </span>
        ))}
        <input
          type="text"
          placeholder="태그를 입력하세요"
          className="flex-1 min-w-[150px] text-lg outline-none border-none placeholder-gray-300"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
        />
      </div>

      <div className="flex flex-1 min-h-0">
        <div className="flex-1 p-8 overflow-auto border-r border-gray-100">
          <TextareaAutosize
            ref={textareaRef}
            placeholder="본문을 입력하세요"
            className="w-full h-full resize-none overflow-hidden outline-none text-lg leading-relaxed text-gray-700"
            value={post.content}
            onChange={handleContentChange}
            onPaste={handlePaste}
          />
        </div>

        {/* 미리보기 */}
        <div className="flex-1 p-8 overflow-y-auto bg-gray-50 prose prose-slate max-w-none">
          {post.title && (
            <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
          )}
          <MarkDownWrapper>{post.content}</MarkDownWrapper>
        </div>
      </div>

      <footer className="h-16 px-8 flex items-center justify-between shadow-[0_-1px_10px_rgba(0,0,0,0.05)] bg-white">
        <button className="text-gray-600 hover:text-black font-medium transition">
          ← 나가기
        </button>
        <button
          onClick={handleSubmit}
          className="bg-[#12b886] text-white px-5 py-2 rounded font-bold hover:bg-[#20c997] transition"
        >
          출간하기
        </button>
      </footer>
    </div>
  );
}
