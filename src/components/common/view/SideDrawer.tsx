'use client';

import { motion, Transition, Variants } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
const drawerVariants: Variants = {
  initial: {
    x: '100%',
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 25, stiffness: 200 },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const transition: Transition = {
  layout: {
    duration: 0.7,
  },
  y: {
    duration: 0.1,
  },
};

interface SideDrawerProps {
  children: React.ReactNode;
  onClose: () => void;
  onToggleMode: () => void;
}

export default function SideDrawer({
  children,
  onClose,
  onToggleMode,
}: SideDrawerProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0" onClick={onClose} />
      <motion.aside
        transition={transition}
        layoutId="overlay-container"
        variants={drawerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="
                relative h-full bg-white shadow-2xl overflow-y-hidden
                w-full        
                md:max-w-lg 
                lg:max-w-4xl        
                rounded-none       
                md:rounded-l-2xl    
            "
      >
        <motion.div
          layoutId="header"
          className="flex items-center justify-between p-4 border-b"
        >
          <button
            onClick={onToggleMode}
            className="flex items-center gap-2 text-sm text-gray-500 hover:bg-gray-100 p-2 rounded-lg"
          >
            <Maximize2 className="w-4 h-4" />
            중앙 보기
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
