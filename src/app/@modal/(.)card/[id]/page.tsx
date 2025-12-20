'use client';

import DetailOverlay from '@/components/common/view/DetailOverlay';
import { ViewMode } from '@/components/common/view/type';
import Communication from '@/components/hero/Communication';
import Coko from '@/components/project/Coko';
import { useScrollLock } from '@modern-kit/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const cardDetailMap = {
  communication: <Communication />,
  coko: <Coko />,
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
