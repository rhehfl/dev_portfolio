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
import { useRouter } from 'next/navigation';

interface PostData {
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
  is_published: boolean;
}

export const useEditor = (postId?: string) => {
  const [post, setPost] = useState<PostData>({
    title: '',
    content: '',
    tags: [],
    thumbnail: '',
    is_published: true,
  });
  const [tagInput, setTagInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(!!postId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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
            is_published: data.is_published ?? true,
          });
        }
        setIsLoading(false);
      };
      fetchPost();
    }
  }, [postId]);

  // 2. 저장/업데이트 통합 핸들러
  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        alert('권한이 없습니다.');
        return;
      }

      const postPayload = {
        ...post,
      };

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
      router.push('/blog');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPost((prev) => ({ ...prev, content: e.target.value }));
  };

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

  const togglePublished = () => {
    setPost((prev) => ({ ...prev, is_published: !prev.is_published }));
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
    togglePublished,
    isLoading,
    isSubmitting,
  };
};
