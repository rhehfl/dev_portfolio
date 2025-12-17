'use client';

import { AnimatePresence } from 'framer-motion';
import Modal from '@/components/common/view/Modal';
import SideDrawer from '@/components/common/view/SideDrawer';
import { usePrevious } from '@modern-kit/react';
import { ViewMode } from '@/components/common/view/type';

interface DetailOverlayProps {
  mode: ViewMode;
  children: React.ReactNode;
  onChangeMode: (mode: ViewMode) => void;
  onExitComplete: () => void;
}

export default function DetailOverlay({
  children,
  mode,
  onChangeMode,
  onExitComplete,
}: DetailOverlayProps) {
  const prevMode = usePrevious(mode);
  console.log(prevMode);
  const isSwitching = prevMode !== 'hidden' && prevMode !== mode;

  const onClose = () => {
    onChangeMode('hidden');
  };
  return (
    <>
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
            layoutId="overlay-container"
            isSwitching={isSwitching}
            onChangeMode={onChangeMode}
            onClose={onClose}
          >
            {children}
          </SideDrawer>
        )}
        {mode === 'modal' && (
          <Modal
            layoutId="overlay-container"
            isSwitching={isSwitching}
            onChangeMode={onChangeMode}
            onClose={onClose}
          >
            {children}
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
