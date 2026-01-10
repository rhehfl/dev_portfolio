'use client';

import DetailOverlay from '@/components/common/view/DetailOverlay';
import { ViewMode } from '@/components/common/view/type';
import Coko from '@/components/project/Coko';
import DoranDoran from '@/components/project/Doran-Doran';
import PPick from '@/components/project/P-Pick';
import { useScrollLock, useSessionStorage } from '@modern-kit/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const cardDetailMap = {
  coko: <Coko />,
  'p-pick': <PPick />,
  'doran-doran': <DoranDoran />,
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

  const handleSetMode = (newMode: ViewMode) => {
    setMode(newMode);
    if (newMode !== 'hidden') {
      setState(newMode);
    }
  };

  useScrollLock();
  if (!content) {
    return null;
  }

  return (
    <DetailOverlay
      mode={mode}
      onChangeMode={handleSetMode}
      onExitComplete={() => router.back()}
    >
      {content}
    </DetailOverlay>
  );
}
