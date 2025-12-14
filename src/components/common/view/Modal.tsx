'use client';

import { motion, Transition, Variants } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
const modalVariants: Variants = {
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
    opacity: 0,
  },
};

const transition: Transition = {
  layout: {
    duration: 0.5,
  },
};

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  onToggleMode: () => void;
}

export default function Modal({ children, onClose, onToggleMode }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <motion.aside
        layoutId="overlay-container"
        variants={modalVariants}
        transition={transition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="
                relative h-full bg-white shadow-2xl overflow-y-auto
                w-full        
                max-h-[85vh]
                md:max-w-lg 
                lg:max-w-4xl        
                rounded-xl       
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
