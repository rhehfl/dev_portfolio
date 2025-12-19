'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

const MotionImage = motion.create(Image);
type ImageOptions = Omit<React.ComponentProps<typeof MotionImage>, 'layoutId'>;

interface ZoomableImageProps extends ImageOptions {
  id?: string;
}

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

export default function ZoomableImage({ id, ...props }: ZoomableImageProps) {
  return (
    <motion.div>
      <Link
        href={`/photo/${encodeURIComponent(props.src as string)}`}
        scroll={false}
      >
        <MotionImage
          className="hover:scale-105 transition-transform duration-200 border-2 border-gray-200 rounded-md cursor-pointer"
          variants={containerVariants}
          initial="offscreen"
          animate="onscreen"
          exit="exit"
          layoutId={`image-${id}`}
          {...props}
        />
      </Link>
    </motion.div>
  );
}
