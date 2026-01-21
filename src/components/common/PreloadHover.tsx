'use client';

import { Slot } from '@radix-ui/react-slot';
import { ReactNode, useRef, useState } from 'react';
import { getImageProps, ImageProps, StaticImageData } from 'next/image';
import Image from 'next/image';
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

interface PreloadHoverProps {
  images: ImageSource | ImageSource[];
  children: ReactNode;
  delay?: number;
}

export default function PreloadHover({
  images,
  children,
  delay = 200,
}: PreloadHoverProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (shouldLoad) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setShouldLoad(true);
      timerRef.current = null;
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // 배열로 통일
  const imageSources = Array.isArray(images) ? images : [images];

  return (
    <>
      <Slot onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </Slot>

      {shouldLoad && (
        <div className="absolute top-0 left-0 -z-50 w-px h-px overflow-hidden opacity-0 pointer-events-none">
          {imageSources.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt="preload-hidden"
              width={CASE_STUDY_THUMB_WIDTH}
              height={CASE_STUDY_THUMB_HEIGHT}
              priority={true}
              sizes={`(max-width: 768px) 100vw, ${CASE_STUDY_THUMB_WIDTH}px`}
            />
          ))}
        </div>
      )}
    </>
  );
}
