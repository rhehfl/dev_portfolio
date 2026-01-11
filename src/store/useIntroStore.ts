import { create } from 'zustand';

interface IntroState {
  hasPlayed: boolean;
  setHasPlayed: () => void;
}

export const useIntroStore = create<IntroState>((set) => ({
  hasPlayed: false,
  setHasPlayed: () => set({ hasPlayed: true }),
}));
