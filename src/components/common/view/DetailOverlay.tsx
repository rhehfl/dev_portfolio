'use client';

import { AnimatePresence } from 'framer-motion';
import Modal from '@/components/common/view/Modal';
import SideDrawer from '@/components/common/view/SideDrawer';
import { usePrevious } from '@modern-kit/react';
import { ViewMode } from '@/components/common/view/type';
import FullScreen from '@/components/common/view/FullScreen';

interface DetailOverlayProps {
  mode: ViewMode;
  children: React.ReactNode;
  onChangeMode: (mode: ViewMode) => void;
  onExitComplete: () => void;
  setSessionStorage: (mode: ViewMode) => void;
}

const LAYOUT_ID = 'overlay-container';
export default function DetailOverlay({
  children,
  mode,
  onChangeMode,
  onExitComplete,
  setSessionStorage,
}: DetailOverlayProps) {
  const prevMode = usePrevious(mode);
  const isSwitching = prevMode !== 'hidden' && prevMode !== mode;

  const onClose = () => {
    setSessionStorage(mode);
    onChangeMode('hidden');
  };
  return (
    <AnimatePresence
      mode="popLayout"
      onExitComplete={() => {
        if (mode === 'hidden') {
          onExitComplete?.();
        }
      }}
    >
      {mode === 'drawer' && (
        <SideDrawer
          layoutId={LAYOUT_ID}
          isSwitching={isSwitching}
          onChangeMode={onChangeMode}
          onClose={onClose}
        >
          {children}
        </SideDrawer>
      )}
      {mode === 'modal' && (
        <Modal
          layoutId={LAYOUT_ID}
          isSwitching={isSwitching}
          onChangeMode={onChangeMode}
          onClose={onClose}
        >
          {children}
        </Modal>
      )}
      {mode === 'fullscreen' && (
        <FullScreen
          layoutId={LAYOUT_ID}
          isSwitching={isSwitching}
          onChangeMode={onChangeMode}
          onClose={onClose}
        >
          {children}
        </FullScreen>
      )}
    </AnimatePresence>
  );
}
