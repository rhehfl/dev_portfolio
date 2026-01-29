'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useScrollLock } from '@modern-kit/react';
import { X } from 'lucide-react';
import { Suspense } from 'react';

function PhotoModalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  useScrollLock();

  const encodedSrc = searchParams.get('src');

  const imageSrc = encodedSrc ? decodeURIComponent(encodedSrc) : null;

  if (!imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => router.back()}
      />

      <button
        className="fixed top-6 left-6 z-50 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 cursor-pointer"
        onClick={() => router.back()}
      >
        <X size={24} />
      </button>

      <figure className="relative w-[90vw] h-[85vh] pointer-events-none">
        <Image
          className="object-contain rounded-xl"
          src={imageSrc}
          alt="Zoomed Image"
          fill
          priority
          sizes="90vw"
        />
      </figure>
    </div>
  );
}

export default function ZoomImagePage() {
  return (
    <Suspense fallback={null}>
      <PhotoModalContent />
    </Suspense>
  );
}
