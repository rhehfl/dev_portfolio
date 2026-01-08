'use client';

import DetailOverlay from '@/components/common/view/DetailOverlay';
import { ViewMode } from '@/components/common/view/type';
import Coko from '@/components/project/Coko';
import PPick from '@/components/project/P-Pick';
import {
  useScrollLock,
  useSessionStorage,
  useUnmount,
} from '@modern-kit/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const cardDetailMap = {
  coko: <Coko />,
  'p-pick': <PPick />,
} as const;

export default function CardDetailPage() {
  const { state, setState } = useSessionStorage<ViewMode>({
    key: 'overlay-view-mode',
    initialValue: 'drawer',
  });
  const [mode, setMode] = useState<ViewMode>(state);

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
      setSessionStorage={setState}
    >
      {content}
    </DetailOverlay>
  );
}
