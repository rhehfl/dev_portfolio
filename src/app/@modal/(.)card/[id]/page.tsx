'use client';

import DetailOverlay from '@/components/common/view/DetailOverlay';
import { ViewMode } from '@/components/common/view/type';
import Coko from '@/components/project/Coko';
import PPick from '@/components/project/P-Pick';
import { useScrollLock } from '@modern-kit/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const cardDetailMap = {
  coko: <Coko />,
  'p-pick': <PPick />,
} as const;

export default function CardDetailPage() {
  const [mode, setMode] = useState<ViewMode>('drawer');
  const params = useParams();
  const id = params.id as keyof typeof cardDetailMap;
  const router = useRouter();
  const content = cardDetailMap[id];
  useScrollLock();
  if (!content) {
    return null;
  }

  return (
    <DetailOverlay
      mode={mode}
      onChangeMode={setMode}
      onExitComplete={() => router.back()}
    >
      {content}
    </DetailOverlay>
  );
}
