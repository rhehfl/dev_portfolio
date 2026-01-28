'use client';

import { Slot } from '@radix-ui/react-slot';
import Image, { type ImageProps, type StaticImageData } from 'next/image';
import {
  type ReactNode,
  useRef,
  useState,
  useCallback,
  type ComponentProps,
  type Ref,
} from 'react';

export const CASE_STUDY_THUMB_WIDTH = 640;
export const CASE_STUDY_THUMB_HEIGHT = 360;

type ImageSource = string | StaticImageData;
interface PreloadHoverProps<T extends HTMLElement> extends ComponentProps<
  typeof Slot
> {
  images: ImageSource | ImageSource[];
  children: ReactNode;
  delay?: number;
  imageProps?: Partial<ImageProps>;
  ref?: Ref<T>;
}

export default function PreloadHover<T extends HTMLElement>({
  images,
  children,
  delay = 200,
  imageProps,
  onMouseEnter,
  onMouseLeave,
  ref,
  ...props
}: PreloadHoverProps<T>) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const imageSources = Array.isArray(images) ? images : [images];

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      onMouseEnter?.(e);

      if (shouldLoad) return;

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setShouldLoad(true);
        timerRef.current = null;
      }, delay);
    },
    [delay, shouldLoad, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      onMouseLeave?.(e);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    },
    [onMouseLeave],
  );

  return (
    <>
      <Slot
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </Slot>

      {shouldLoad && (
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-px h-px overflow-hidden opacity-0 pointer-events-none -z-50"
        >
          {imageSources.map((src, idx) => (
            <Image
              key={typeof src === 'string' ? src : idx}
              src={src}
              alt="preload-hidden"
              width={CASE_STUDY_THUMB_WIDTH}
              height={CASE_STUDY_THUMB_HEIGHT}
              priority={true}
              {...imageProps}
            />
          ))}
        </div>
      )}
    </>
  );
}
