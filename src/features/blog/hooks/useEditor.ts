import {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  useEffect,
} from 'react';
import { uploadImage } from '@/features/blog/utils/uploadImage';
import { supabase } from '@/lib/supabase';

interface PostData {
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
}

export const useEditor = (postId?: string) => {
  const [post, setPost] = useState<PostData>({
    title: '',
    content: '',
    tags: [],
    thumbnail: '',
  });
  const [tagInput, setTagInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(!!postId);

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', postId)
          .single();

        if (data) {
          setPost({
            title: data.title,
            content: data.content,
            tags: data.tags || [],
            thumbnail: data.thumbnail || '',
          });
        }
        setIsLoading(false);
      };
      fetchPost();
    }
  }, [postId]);

  // 2. 저장/업데이트 통합 핸들러
  const handleSubmit = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert('권한이 없습니다.');

    const postPayload = {
      ...post,
    };

    try {
      let error;
      if (postId) {
        // 수정 모드
        ({ error } = await supabase
          .from('posts')
          .update(postPayload)
          .eq('id', postId));
      } else {
        // 새 글 작성 모드
        ({ error } = await supabase.from('posts').insert([postPayload]));
      }

      if (error) throw error;
      alert(postId ? '수정되었습니다!' : '출간되었습니다!');
    } catch (err: any) {
      alert(err.message);
    }
  };
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
    isLoading,
  };
};
