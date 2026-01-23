'use client'; // 클라이언트 컴포넌트 선언

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ViewCounter({ id }: { id: string }) {
  useEffect(() => {
    const increment = async () => {
      await supabase.rpc('increment_view_count', { post_id: id });
    };

    increment();
  }, [id]);

  return null; // 화면에는 아무것도 그리지 않음 (기능만 수행)
}
