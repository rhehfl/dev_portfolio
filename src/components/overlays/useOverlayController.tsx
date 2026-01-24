'use client';

import { useState } from 'react';
import { useSessionStorage } from '@modern-kit/react';
import { ViewMode } from '@/components/overlays/type';

const STORAGE_KEY = 'overlay-view-mode';
const INIT_MODE = 'fullscreen';

export const useOverlayController = () => {
  const { state: savedMode, setState: setSavedMode } =
    useSessionStorage<ViewMode>({
      key: STORAGE_KEY,
      initialValue: INIT_MODE,
    });
  const [mode, setMode] = useState<ViewMode>(savedMode);

  const handleSetMode = (newMode: ViewMode) => {
    setMode(newMode);
    if (newMode !== 'hidden') {
      setSavedMode(newMode);
    }
  };

  return { mode, handleSetMode };
};
