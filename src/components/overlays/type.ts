export type ViewMode = 'hidden' | 'drawer' | 'modal' | 'fullscreen';

export interface CommonViewProps {
  layoutId: string;
  isViewTransition: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onChangeMode: (mode: ViewMode) => void;
}
