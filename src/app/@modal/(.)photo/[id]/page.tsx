'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useScrollLock } from '@modern-kit/react';
import { X } from 'lucide-react';

export default function ZoomImagePage() {
  const params = useParams();
  const router = useRouter();
  useScrollLock();

  // params 처리 로직 수정
  const idParam = params?.id;
  const imagePath = Array.isArray(idParam) ? idParam.join('/') : idParam;
  const decodedPath = imagePath ? decodeURIComponent(imagePath as string) : '';

  if (!decodedPath) return null; // 경로 없으면 렌더링 안 함

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => router.back()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <button
        className="fixed top-10 left-10 hover:bg-gray-600  cursor-pointer rounded-full p-2 duration-100"
        onClick={() => router.back()}
      >
        <X className=" text-white" />
      </button>
      <figure className="relative w-[90vw] h-[85vh] ">
        <Image
          className="object-contain rounded-xl"
          src={`${decodedPath}`}
          alt="Zoomed Image"
          fill
          priority
          sizes="90vw"
        />
      </figure>
    </motion.div>
  );
}
