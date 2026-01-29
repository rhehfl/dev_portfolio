'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PhotoDetailLinkProps {
  photoId: string | number; // 사진 ID
  children: ReactNode; // img, Image, div 무엇이든 가능
  className?: string; // 링크(a태그) 자체에 줄 스타일
}

export default function PhotoDetailLink({
  photoId,
  children,
  className,
  ...props
}: PhotoDetailLinkProps) {
  return (
    <Link
      href={`/photo?src=${photoId}`}
      scroll={false}
      className={cn('cursor-zoom-in', className)}
      {...props}
    >
      {children}
    </Link>
  );
}
