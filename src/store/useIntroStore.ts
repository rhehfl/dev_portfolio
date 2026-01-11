import { create } from 'zustand';

interface IntroState {
  hasPlayed: boolean;
  setHasPlayed: (hasPlayed: boolean) => void;
}

export const useIntroStore = create<IntroState>((set) => ({
  hasPlayed: false,
  setHasPlayed: (hasPlayed: boolean) => set({ hasPlayed }),
}));
