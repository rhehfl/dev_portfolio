'use client';

import { CommonViewProps, ViewMode } from '@/components/overlays/type';
import { ViewModeSelect } from '@/components/overlays/ViewmodeSelect';
import { motion, Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useEscapeKey } from '@/hooks/useEscapeKey';

const fullScreenVariants: Variants = {
  initial: (isSwitching: boolean) =>
    isSwitching ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.2 },
  },
};

export default function FullScreen({
  layoutId,
  children,
  onClose,
  onChangeMode,
  isViewTransition,
}: CommonViewProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const trapRef = useFocusTrap(true);
  useEscapeKey(onClose);

  const handleToggle = (targetMode: ViewMode) => {
    onChangeMode(targetMode);
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none bg-background">
      {/* motion.aside: Framer Motion layoutId용 — ref를 직접 쓰지 않음 */}
      <motion.aside
        layoutId={layoutId}
        custom={isViewTransition}
        variants={fullScreenVariants}
        layout="position"
        initial="initial"
        animate="animate"
        exit="exit"
        transition={prefersReducedMotion ? { duration: 0 } : undefined}
        className="
          relative w-full h-full bg-card text-foreground shadow-2xl overflow-y-hidden
          flex flex-col border border-border
          pointer-events-auto
        "
      >
        {/* 포커스 트랩 컨테이너 */}
        <div
          ref={trapRef}
          role="dialog"
          aria-modal="true"
          aria-label="프로젝트 상세 (전체화면)"
          className="flex flex-col h-full overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted shrink-0">
            <ViewModeSelect
              value="fullscreen"
              onChange={(viewMode) => {
                handleToggle(viewMode);
              }}
            />
            <button
              onClick={onClose}
              className="p-2 rounded-full transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="전체화면 닫기"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="overflow-y-auto flex-1 p-4 bg-background">
            {children}
          </div>
        </div>
      </motion.aside>
    </div>
  );
}
