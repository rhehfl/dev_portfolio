import { supabase } from '@/lib/supabase';

export const uploadImage = async (file: File) => {
  const fileName = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from('doyoon-blog')
    .upload(`public/${fileName}`, file);

  if (error) {
    console.error('업로드 실패:', error);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from('doyoon-blog').getPublicUrl(data.path);

  return publicUrl;
};
