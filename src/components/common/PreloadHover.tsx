'use client';

import { Slot } from '@radix-ui/react-slot';
import { preload } from 'react-dom';
import { ReactNode, useEffect, useRef } from 'react';

interface PreloadHoverProps {
  images: string | string[];
  children: ReactNode;
  delay?: number;
}

export default function PreloadHover({
  images,
  children,
  delay = 200,
}: PreloadHoverProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const urls = Array.isArray(images) ? images : [images];
      urls.forEach((url) => {
        preload(url, { as: 'image' });
      });
      timerRef.current = null;
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Slot onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
    </Slot>
  );
}
