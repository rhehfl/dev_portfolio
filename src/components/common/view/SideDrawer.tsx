'use client';

import { useState } from 'react'; // useState 추가
import { motion, Variants } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import { CommonViewProps, ViewMode } from '@/components/common/view/type';
import { ViewModeSelect } from '@/components/common/view/ViewmodeSelect';

export default function SideDrawer({
  children,
  onClose,
  layoutId,
  onChangeMode,
  isSwitching,
}: CommonViewProps) {
  const [isMorphing, setIsMorphing] = useState(false);

  const handleToggle = (targetMode: ViewMode) => {
    setIsMorphing(true);
    onChangeMode(targetMode);
  };

  const wrapperVariants: Variants = {
    initial: {
      x: isSwitching ? '0%' : '100%',
    },
    animate: {
      x: '0%',
      opacity: 1,
      transition: { type: 'tween', duration: 0.8 },
    },
    exit: {
      x: '100%',
      transition: { duration: isMorphing ? 0 : 0.5 },
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
      <div className="absolute inset-0 pointer-events-auto" onClick={onClose} />

      <motion.div
        variants={wrapperVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pointer-events-auto h-full w-full flex justify-end"
      >
        <motion.aside
          layoutId={layoutId}
          className="
                flex flex-col
                relative h-full bg-white shadow-2xl overflow-y-hidden
                w-full md:w-lg lg:w-4xl        
                rounded-none md:rounded-l-2xl    
            "
        >
          <div className="flex items-center justify-between p-4 border-b">
            <ViewModeSelect
              value="drawer"
              onChange={(viewMode) => {
                handleToggle(viewMode);
              }}
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-2xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="overflow-y-scroll h-full scroll-smooth">
            {children}
          </div>
        </motion.aside>
      </motion.div>
    </div>
  );
}
