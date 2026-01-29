'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface PhotoDetailLinkProps {
  photoId: string | number;
  children: ReactNode;
  className?: string;
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
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
