'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { CommonViewProps, ViewMode } from '@/components/common/view/type';

export default function Modal({
  children,
  onClose,
  onChangeMode,
  isSwitching,
  layoutId,
}: CommonViewProps) {
  const [isMorphing, setIsMorphing] = useState(false);

  const handleToggle = (targetMode: ViewMode) => {
    setIsMorphing(true);
    onChangeMode(targetMode);
  };

  const modalVariants: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: {
      opacity: isMorphing ? 1 : 0,
      scale: isMorphing ? 1 : 0.95,
      transition: {
        duration: isMorphing ? 0.8 : 0.2,
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none">
      <div
        className="absolute inset-0 bg-black/20 pointer-events-auto"
        onClick={onClose}
      />

      <motion.aside
        layoutId={layoutId}
        layout
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="
                relative h-full bg-white shadow-2xl overflow-y-hidden
                w-full        
                max-h-[85vh]
                md:max-w-lg 
                lg:max-w-4xl        
                rounded-xl       
                md:rounded-2xl
                pointer-events-auto    
            "
      >
        <motion.div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={() => handleToggle('drawer')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:bg-gray-100 p-2 rounded-lg"
          >
            <ArrowRight className="w-4 h-4" />
            사이드 보기
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-2xl"
          >
            <X className="w-6 h-6" />
          </button>
        </motion.div>
        {children}
      </motion.aside>
    </div>
  );
}
