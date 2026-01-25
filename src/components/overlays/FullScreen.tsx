'use client';

import { CommonViewProps, ViewMode } from '@/components/overlays/type';
import { ViewModeSelect } from '@/components/overlays/ViewmodeSelect';
import { motion, Variants } from 'framer-motion';
import { X } from 'lucide-react';

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
  const handleToggle = (targetMode: ViewMode) => {
    onChangeMode(targetMode);
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none bg-white">
      <motion.aside
        layoutId={layoutId}
        custom={isViewTransition}
        variants={fullScreenVariants}
        layout="position"
        initial="initial"
        animate="animate"
        exit="exit"
        className="
          relative w-full h-full bg-white shadow-2xl overflow-y-hidden
          flex flex-col
          pointer-events-auto
        "
      >
        <div className="flex items-center justify-between p-4 border-b shrink-0">
          <ViewModeSelect
            value="fullscreen"
            onChange={(viewMode) => {
              handleToggle(viewMode);
            }}
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4">{children}</div>
      </motion.aside>
    </div>
  );
}
