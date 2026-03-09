'use client';

import { motion, Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { CommonViewProps } from '@/components/overlays/type';
import { ViewModeSelect } from '@/components/overlays/ViewmodeSelect';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useEscapeKey } from '@/hooks/useEscapeKey';

const modalVariants: Variants = {
  initial: (isSwitching: boolean) =>
    isSwitching ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export default function Modal({
  children,
  onClose,
  onChangeMode,
  layoutId,
  isViewTransition,
}: CommonViewProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const trapRef = useFocusTrap(true);
  useEscapeKey(onClose);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none">
      {/* 배경 오버레이 — 스크린 리더에서 숨김 */}
      <div
        className="absolute inset-0 bg-background opacity-80 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* motion.aside: Framer Motion layoutId용 — ref를 직접 쓰지 않음 */}
      <motion.aside
        layoutId={layoutId}
        layout="position"
        custom={isViewTransition}
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={prefersReducedMotion ? { duration: 0 } : undefined}
        className="
          relative h-full bg-card text-foreground shadow-2xl overflow-y-hidden
          flex flex-col border border-border
          w-full
          max-h-[85vh]
          md:max-w-lg
          lg:max-w-4xl
          rounded-xl
          md:rounded-2xl
          pointer-events-auto
        "
      >
        {/*
          포커스 트랩 컨테이너: motion.aside와 ref 충돌 없이
          role="dialog" + aria-modal + useFocusTrap을 내부 div에 연결
        */}
        <div
          ref={trapRef}
          role="dialog"
          aria-modal="true"
          aria-label="프로젝트 상세"
          className="flex flex-col h-full overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted">
            <ViewModeSelect value="modal" onChange={onChangeMode} />
            <button
              onClick={onClose}
              aria-label="모달 닫기"
              className="p-2 rounded-2xl transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
