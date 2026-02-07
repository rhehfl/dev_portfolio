'use client';

import { motion, Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { CommonViewProps } from '@/components/overlays/type';
import { ViewModeSelect } from '@/components/overlays/ViewmodeSelect';

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
  return (
    <div className="fixed inset-0 z-50 flex justify-end items-center pointer-events-none">
      <div
        className="absolute inset-0 bg-background opacity-80 pointer-events-auto backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.aside
        layoutId={layoutId}
        custom={isViewTransition}
        variants={sideDrawerVariants}
        initial="initial"
        animate="animate"
        layout="position"
        exit="exit"
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
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted">
          <ViewModeSelect value="drawer" onChange={onChangeMode} />
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors hover:bg-muted"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-scroll h-full bg-background">{children}</div>
      </motion.aside>
    </div>
  );
}
