import { ViewMode } from '@/components/common/view/type';
import { ViewModeSelect } from '@/components/common/view/ViewmodeSelect';
import { useIntroStore } from '@/store/useIntroStore';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { useState } from 'react';

interface FullScreenProps {
  layoutId: string;
  isSwitching: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onChangeMode: (mode: ViewMode) => void;
}

export default function FullScreen({
  layoutId,
  children,
  onClose,
  onChangeMode,
}: FullScreenProps) {
  const [isMorphing, setIsMorphing] = useState(false);
  const { hasPlayed } = useIntroStore();

  const handleToggle = (targetMode: ViewMode) => {
    setIsMorphing(true);
    onChangeMode(targetMode);
  };

  const modalVariants: Variants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: {
      opacity: isMorphing ? 1 : 0,

      scale: isMorphing ? 1 : 0.98,
      transition: {
        duration: isMorphing ? 0.8 : 0.2,
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <motion.aside
        layoutId={layoutId}
        layout
        variants={modalVariants}
        initial={hasPlayed ? false : 'initial'}
        animate="animate"
        exit="exit"
        className="
                relative w-full h-full bg-white shadow-2xl overflow-y-hidden
                flex flex-col
                pointer-events-auto
            "
      >
        <motion.div className="flex items-center justify-between p-4 border-b shrink-0">
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
        </motion.div>
        <div className="overflow-y-auto flex-1 p-4">{children}</div>
      </motion.aside>
    </div>
  );
}
