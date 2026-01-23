'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useScrollLock } from '@modern-kit/react';

export default function ImageViewer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const zoomImage = searchParams.get('zoom');

  useScrollLock({ autoLock: !!zoomImage });

  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && zoomImage) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomImage]);

  return (
    <AnimatePresence>
      {zoomImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-sm"
          onClick={handleClose} // 배경 클릭 시 닫기
        >
          <button
            onClick={(e) => {
              e.stopPropagation(); // 🔥 [해결] 이벤트가 배경으로 전파되는 것을 막음!
              handleClose();
            }}
            className="absolute top-4 right-4 p-3 text-white/70 hover:text-white bg-black/20 rounded-full z-50 transition-colors"
          >
            <X size={32} />
          </button>

          <motion.div
            className="relative w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              layoutId={zoomImage}
              src={zoomImage}
              alt="Zoomed Detail"
              className="max-w-full max-h-full object-contain shadow-2xl rounded-lg select-none"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.7}
              onDragEnd={(e, { offset, velocity }) => {
                if (Math.abs(offset.y) > 100 || Math.abs(velocity.y) > 500) {
                  handleClose();
                }
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
