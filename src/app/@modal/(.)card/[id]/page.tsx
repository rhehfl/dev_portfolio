'use client';

import { useScrollLock } from '@modern-kit/react';
import { useParams, useRouter } from 'next/navigation';
import ProjectRenderer from '@/features/project/components/ProjectRenderer';
import OverlayContainer from '@/components/overlays/OverlayContainer';
import { useOverlayController } from '@/components/overlays/useOverlayController';

export default function CardDetailPage() {
  const { mode, handleSetMode } = useOverlayController();

  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

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
