'use client';

import { AnimatePresence } from 'framer-motion';
import Modal from '@/components/overlays/Modal';
import SideDrawer from '@/components/overlays/SideDrawer';
import { usePrevious } from '@modern-kit/react';
import { ViewMode } from '@/components/overlays/type';
import FullScreen from '@/components/overlays/FullScreen';

interface OverlayContainerProps {
  mode: ViewMode;
  children: React.ReactNode;
  onChangeMode: (mode: ViewMode) => void;
  onExitComplete: () => void;
}

const LAYOUT_ID = 'overlay-container';
export default function OverlayContainer({
  children,
  mode,
  onChangeMode,
  onExitComplete,
}: OverlayContainerProps) {
  const prevMode = usePrevious(mode);
  const isViewTransition = prevMode !== 'hidden' && prevMode !== mode;
  const onClose = () => {
    onChangeMode('hidden');
  };

  const commonProps = {
    layoutId: LAYOUT_ID,
    isViewTransition,
    onChangeMode,
    onClose,
  };

  return (
    <AnimatePresence
      mode="sync"
      onExitComplete={() => {
        if (mode === 'hidden') {
          onExitComplete?.();
        }
      }}
    >
      {mode === 'drawer' && (
        <SideDrawer {...commonProps}>{children}</SideDrawer>
      )}
      {mode === 'modal' && <Modal {...commonProps}>{children}</Modal>}
      {mode === 'fullscreen' && (
        <FullScreen {...commonProps}>{children}</FullScreen>
      )}
    </AnimatePresence>
  );
}
