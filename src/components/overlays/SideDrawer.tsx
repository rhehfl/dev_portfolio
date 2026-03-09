'use client';

import { motion, Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { CommonViewProps } from '@/components/overlays/type';
import { ViewModeSelect } from '@/components/overlays/ViewmodeSelect';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useEscapeKey } from '@/hooks/useEscapeKey';

const sideDrawerVariants: Variants = {
  initial: (isSwitching: boolean) =>
    isSwitching
      ? { opacity: 1 }
      : { x: '70%', opacity: 1, duration: 0.5, ease: [0.32, 0.72, 0, 1] },

  animate: (isSwitching: boolean) =>
    isSwitching
      ? { opacity: 1 }
      : {
          x: '0%',
          opacity: 1,
          transition: {
            type: 'spring',
            damping: 30,
            stiffness: 300,
            mass: 0.8,
          },
        },

  exit: {
    x: '100%',
    opacity: 1,
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
  },
};

export default function SideDrawer({
  children,
  onClose,
  layoutId,
  onChangeMode,
  isViewTransition,
}: CommonViewProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const trapRef = useFocusTrap(true);
  useEscapeKey(onClose);

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-center pointer-events-none">
      {/* 배경 오버레이 — 스크린 리더에서 숨김 */}
      <div
        className="absolute inset-0 bg-background opacity-80 pointer-events-auto backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* motion.aside: Framer Motion layoutId용 — ref를 직접 쓰지 않음 */}
      <motion.aside
        layoutId={layoutId}
        custom={isViewTransition}
        variants={sideDrawerVariants}
        initial="initial"
        animate="animate"
        layout="position"
        exit="exit"
        transition={prefersReducedMotion ? { duration: 0 } : undefined}
        className="
          relative h-full bg-card text-foreground overflow-y-hidden
          flex flex-col border border-border
          w-full
          md:max-w-lg
          lg:max-w-4xl
          rounded-l-2xl
          pointer-events-auto
        "
      >
        {/* 포커스 트랩 컨테이너 */}
        <div
          ref={trapRef}
          role="dialog"
          aria-modal="true"
          aria-label="프로젝트 상세"
          className="flex flex-col h-full overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted">
            <ViewModeSelect value="drawer" onChange={onChangeMode} />
            <button
              onClick={onClose}
              aria-label="사이드 패널 닫기"
              className="p-2 rounded-full transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="overflow-y-scroll h-full bg-background">{children}</div>
        </div>
      </motion.aside>
    </div>
  );
}
