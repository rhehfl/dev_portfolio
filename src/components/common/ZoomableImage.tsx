'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// Next.js Image에 Motion 기능 입히기
const MotionImage = motion.create(Image);

// 타입 정의: MotionImage의 props에서 layoutId만 제외 (우리가 직접 제어하므로)
type ImageOptions = Omit<React.ComponentProps<typeof MotionImage>, 'layoutId'>;

const containerVariants: Variants = {
  offscreen: { opacity: 0, scale: 0.95 }, // 등장 전 살짝 작게
  onscreen: { opacity: 1, scale: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function ZoomableImage({
  src,
  alt,
  className,
  ...props
}: ImageOptions) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ✅ 클릭 시 실행될 함수 (URL에 ?zoom=이미지주소 추가)
  const handleZoom = () => {
    // 1. 현재 쿼리 파라미터 복사
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    // 2. zoom 파라미터 추가 (이미지 src 저장)
    if (src) {
      current.set('zoom', src as string);
    }

    // 3. 페이지 이동 없이 URL만 업데이트 (scroll: false 필수!)
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  };

  return (
    <MotionImage
      src={src}
      alt={alt || 'image'}
      className={`rounded-md cursor-zoom-in ${className || ''}`}
      variants={containerVariants}
      initial="offscreen"
      animate="onscreen"
      exit="exit"
      layoutId={src as string}
      onClick={handleZoom}
      {...props}
    />
  );
}
