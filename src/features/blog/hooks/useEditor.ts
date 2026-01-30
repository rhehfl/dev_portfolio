import {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from 'react';
import { uploadImage } from '@/features/blog/utils/uploadImage';
import { supabase } from '@/lib/supabase';

interface PostData {
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
}

export const useEditor = () => {
  const [post, setPost] = useState<PostData>({
    title: '',
    content: '',
    tags: [],
    thumbnail: '',
  });
  const [tagInput, setTagInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 기본 입력 핸들러
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPost((prev) => ({ ...prev, content: e.target.value }));
  };

  // 태그 로직
  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmedTag = tagInput.trim().replace(/,/g, '');
      if (trimmedTag && !post.tags.includes(trimmedTag)) {
        setPost((prev) => ({ ...prev, tags: [...prev.tags, trimmedTag] }));
      }
      setTagInput('');
    } else if (e.key === 'Backspace' && !tagInput && post.tags.length > 0) {
      removeTag(post.tags.length - 1);
    }
  };

  const removeTag = (indexToRemove: number) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove),
    }));
  };

  // 이미지 붙여넣기 로직
  const handlePaste = async (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        e.preventDefault();
        const file = items[i].getAsFile();
        if (!file || !textareaRef.current) continue;

        const { selectionStart, selectionEnd } = textareaRef.current;
        const before = post.content.substring(0, selectionStart);
        const after = post.content.substring(selectionEnd);
        const loadingText = `\n![업로드 중...]()\n`;

        setPost((prev) => ({ ...prev, content: before + loadingText + after }));

        const url = await uploadImage(file);
        if (url) {
          setPost((prev) => {
            const newContent = prev.content.replace(
              loadingText,
              `\n![image](${url})\n`,
            );

            const newThumbnail = prev.thumbnail || url;

            return {
              ...prev,
              content: newContent,
              thumbnail: newThumbnail,
            };
          });
        } else {
          alert('이미지 업로드에 실패했습니다.');
          setPost((prev) => ({
            ...prev,
            content: prev.content.replace(loadingText, ''),
          }));
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (!post.title || !post.content) {
      alert('제목과 내용을 모두 입력해주세요!');
      return;
    }

    try {
      const { error } = await supabase.from('posts').insert([
        {
          title: post.title,
          content: post.content,
          tags: post.tags,
          is_published: true,
          thumbnail: post.thumbnail,
        },
      ]);
      if (error) throw error;
      alert('글이 성공적으로 출간되었습니다!');
    } catch (error: any) {
      console.error('출간 에러:', error.message);
      alert('출간 중 오류가 발생했습니다.');
    }
  };

  return {
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
  };
};
