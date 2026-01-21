'use client';

import { Slot } from '@radix-ui/react-slot';
import { preload } from 'react-dom';
import { ReactNode, useEffect, useRef } from 'react';
import { getImageProps, ImageProps, StaticImageData } from 'next/image';

type ImageSource = string | StaticImageData;
export const CASE_STUDY_THUMB_WIDTH = 640;
export const CASE_STUDY_THUMB_HEIGHT = 360;
interface PreloadHoverProps {
  images: ImageSource | ImageSource[];
  children: ReactNode;
  delay?: number;
}

export const getOptimizedUrl = ({
  src,
  width = CASE_STUDY_THUMB_WIDTH,
  height = CASE_STUDY_THUMB_HEIGHT,
  alt = '',
  ...args
}: ImageProps) => {
  const { props } = getImageProps({ src, width, height, alt, ...args });

  return props.src;
};

export default function PreloadHover({
  images,
  children,
  delay = 200,
}: PreloadHoverProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    console.log(123);
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const sources = Array.isArray(images) ? images : [images];

      sources.forEach((src) => {
        // src가 객체일 수 있으므로 alt에는 src를 넣지 않고 빈 문자열 전달
        const optimizedSrc = getOptimizedUrl({ src, alt: '' });
        preload(optimizedSrc, { as: 'image' });
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
