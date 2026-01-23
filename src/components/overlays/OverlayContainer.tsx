'use client';

import { AnimatePresence } from 'framer-motion';
import Modal from '@/components/overlays/Modal';
import SideDrawer from '@/components/overlays/SideDrawer';
import { usePrevious } from '@modern-kit/react';
import { ViewMode } from '@/components/common/view/type';
import FullScreen from '@/components/overlays/FullScreen';
import { useEffect } from 'react';
import { useIntroStore } from '@/store/useIntroStore';

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
  const isSwitching = prevMode !== 'hidden' && prevMode !== mode;
  const { setHasPlayed } = useIntroStore();
  const onClose = () => {
    onChangeMode('hidden');
    setHasPlayed(false);
  };

  useEffect(() => {
    setHasPlayed(true);
  }, []);

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
