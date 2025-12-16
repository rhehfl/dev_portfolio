'use client';

import { motion } from 'framer-motion';
import { useCallback, useRef } from 'react';

interface CarouselProps {
  children: React.ReactNode;
  axis: 'x' | 'y';
}
export default function Carousel({ axis, children }: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const getCurrentWidth = useCallback((node: HTMLDivElement) => {
    console.log(node?.offsetWidth);
  }, []);

  return (
    <figure className="overflow-hidden relative flex" ref={getCurrentWidth}>
      <motion.div className="">
        <div className="flex shrink-0">{children}</div>

        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </figure>
  );
}
