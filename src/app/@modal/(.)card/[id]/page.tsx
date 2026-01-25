'use client';

import { useScrollLock } from '@modern-kit/react';
import { useParams, useRouter } from 'next/navigation';
import CardRenderer from '@/components/common/CardRenderer';
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
      <CardRenderer id={id} />
    </OverlayContainer>
  );
}
