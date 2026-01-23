'use client';

import { motion, Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { CommonViewProps, ViewMode } from '@/components/overlays/type';
import { ViewModeSelect } from '@/components/overlays/ViewmodeSelect';

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
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none">
      <div
        className="absolute inset-0 bg-black/20 pointer-events-auto"
        onClick={onClose}
      />
      <motion.aside
        layoutId={layoutId}
        layout
        custom={isViewTransition}
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="
                relative h-full bg-white shadow-2xl overflow-y-hidden
                flex flex-col
                w-full        
                max-h-[85vh]
                md:max-w-lg 
                lg:max-w-4xl        
                rounded-xl       
                md:rounded-2xl
                pointer-events-auto    
            "
      >
        <div className="flex items-center justify-between p-4 border-b">
          <ViewModeSelect value="modal" onChange={onChangeMode} />

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-2xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-scroll h-full">{children}</div>
      </motion.aside>
    </div>
  );
}
