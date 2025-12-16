'use client';

import DetailOverlay from '@/components/common/view/DetailOverlay';
import Communication from '@/components/hero/Communication';
import { useScrollLock } from '@modern-kit/react';
import { useParams } from 'next/navigation';

const cardDetailMap = {
  communication: <Communication />,
} as const;

export default function CardDetailPage() {
  const params = useParams();
  const id = params.id as keyof typeof cardDetailMap;
  const content = cardDetailMap[id];
  useScrollLock();
  if (!content) {
    return null;
  }

  return <DetailOverlay>{content}</DetailOverlay>;
}
