'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const MotionImage = motion.create(Image);

interface ImageOptions extends Omit<
  React.ComponentProps<typeof MotionImage>,
  'layoutId'
> {}

export default function ZoomableImage({
  src,
  alt,
  className,
  ...props
}: ImageOptions) {
  const router = useRouter();
  const pathname = usePathname();

  const handleZoom = () => {
    const current = new URLSearchParams();

    if (src) {
      current.set('zoom', src as string);
    }

    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  };

  return (
    <MotionImage
      src={src}
      alt={alt || 'image'}
      className={`rounded-md cursor-zoom-in ${className || ''}`}
      initial="offscreen"
      animate="onscreen"
      exit="exit"
      layoutId={src as string}
      onClick={handleZoom}
      {...props}
    />
  );
}
