'use client';

import { useEffect, useRef } from 'react';

interface ImagePreloaderProps {
  images: string | string[];
  rootMargin?: string; // 감지 범위 (기본: 200px)
}

export default function ImagePreloader({
  images,
  rootMargin = '200px',
}: ImagePreloaderProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (isLoadedRef.current || !triggerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const list = Array.isArray(images) ? images : [images];
            list.forEach((src) => {
              const img = new Image();
              img.decoding = 'async';
              img.src = src;
            });

            isLoadedRef.current = true;
            observer.disconnect();
          }
        });
      },
      { rootMargin },
    );

    observer.observe(triggerRef.current);

    return () => observer.disconnect();
  }, [images, rootMargin]);

  return (
    <div
      ref={triggerRef}
      aria-hidden="true"
      style={{ width: 0, height: 0, pointerEvents: 'none' }}
    />
  );
}
