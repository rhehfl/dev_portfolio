'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

const MotionImage = motion.create(Image);
type ImageOptions = Omit<React.ComponentProps<typeof MotionImage>, 'layoutId'>;

const containerVariants: Variants = {
  offscreen: {
    opacity: 0,
    x: 0,
    y: 0,
  },
  onscreen: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export default function ZoomableImage({ ...props }: ImageOptions) {
  return (
    <Link
      href={`/photo/${encodeURIComponent(props.src as string)}`}
      scroll={false}
    >
      <MotionImage
        className="rounded-md cursor-pointer"
        variants={containerVariants}
        initial="offscreen"
        animate="onscreen"
        exit="exit"
        layoutId={`image-${props.src}`}
        {...props}
      />
    </Link>
  );
}
