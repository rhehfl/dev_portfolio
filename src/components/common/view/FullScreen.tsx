import { ViewMode } from '@/components/common/view/type';
import { ViewModeSelect } from '@/components/common/view/ViewmodeSelect';
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
  isSwitching, // 이 prop은 현재 사용되지 않지만 인터페이스 유지를 위해 남겨둡니다.
  children,
  onClose,
  onChangeMode,
}: FullScreenProps) {
  const [isMorphing, setIsMorphing] = useState(false);

  const handleToggle = (targetMode: ViewMode) => {
    setIsMorphing(true);
    onChangeMode(targetMode);
  };

  // 전체 화면이므로 스케일 애니메이션보다는 심플한 페이드 인/아웃이 더 자연스러울 수 있습니다.
  // 필요에 따라 scale 속성을 제거해도 좋습니다.
  const modalVariants: Variants = {
    initial: { opacity: 0, scale: 0.98 }, // 스케일을 약간만 줄여서 시작
    animate: { opacity: 1, scale: 1 },
    exit: {
      opacity: isMorphing ? 1 : 0,
      // 다른 모드로 전환될 때는 layoutId가 처리하므로 스케일을 유지하고,
      // 닫힐 때만 스케일을 줄이며 사라집니다.
      scale: isMorphing ? 1 : 0.98,
      transition: {
        duration: isMorphing ? 0.8 : 0.2,
      },
    },
  };

  return (
    // 중앙 정렬(flex items-center justify-center) 제거
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/*
        전체 화면이 흰색으로 꽉 차기 때문에 뒤의 배경 오버레이(bg-black/20)는 필요 없습니다.
        제거하여 DOM을 단순화합니다.
      */}

      <motion.aside
        layoutId={layoutId}
        layout
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        // 클래스 대폭 수정: 너비/높이 제한 및 둥근 모서리 제거
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
        {/* 헤더를 제외한 나머지 영역이 스크롤 되도록 flex-1 추가 */}
        <div className="overflow-y-auto flex-1 p-4">{children}</div>
      </motion.aside>
    </div>
  );
}
