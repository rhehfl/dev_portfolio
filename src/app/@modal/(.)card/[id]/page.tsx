'use client';

import { ViewMode } from '@/components/overlays/type';
import { useScrollLock, useSessionStorage } from '@modern-kit/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import ProjectRenderer from '@/features/project/components/ProjectRenderer';
import OverlayContainer from '@/components/overlays/OverlayContainer';

export default function CardDetailPage() {
  const { state, setState } = useSessionStorage<ViewMode>({
    key: 'overlay-view-mode',
    initialValue: 'drawer',
  });
  const [mode, setMode] = useState<ViewMode>(state);

  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const handleSetMode = (newMode: ViewMode) => {
    setMode(newMode);
    if (newMode !== 'hidden') {
      setState(newMode);
    }
  };
  useScrollLock();

  return (
    <OverlayContainer
      mode={mode}
      onChangeMode={handleSetMode}
      onExitComplete={() => router.back()}
    >
      <ProjectRenderer id={id} />
    </OverlayContainer>
  );
}
