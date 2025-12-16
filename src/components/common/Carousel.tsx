'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
interface CarouselProps {
  images: string[];
  size: string;
}
export default function Carousel({ images, size }: CarouselProps) {
  const duplicatedSlides = [...images, ...images];

  return (
    <figure className="overflow-hidden relative flex w-full">
      <motion.div
        className="flex"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 15,
        }}
      >
        {duplicatedSlides.map((slide, index) => (
          <div key={index} className=" px-2" style={{ width: `${size}` }}>
            <div className="flex-shrink-0 relative h-48 w-full overflow-hidden rounded-xl">
              <Image
                src={slide}
                alt={`Slide ${index}`}
                fill
                className="object-cover"
                sizes={size}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </figure>
  );
}
