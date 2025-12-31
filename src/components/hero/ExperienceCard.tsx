// components/common/ExperienceCard.tsx
import ZoomableImage from '@/components/common/ZoomableImage';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils'; // shadcn의 유틸리티 (class 합칠 때 사용)
import { ReactNode } from 'react';

interface ExperienceCardProps {
  // 1. 이미지 관련
  imgSrc: string;
  imgAlt: string;

  // 2. 카드 헤더 정보
  subTitle: string; // 예: Next.js 블로그 프로젝트
  period?: string; // 예: 2024.01 (선택사항)
  icon: ReactNode; // 아이콘 컴포넌트
  iconClassName?: string; // 아이콘 색상 등 커스텀 (예: text-red-500)

  // 3. 우측 메인 컨텐츠
  badge: string; // 뱃지 텍스트 (예: Performance)
  badgeClassName?: string; // 뱃지 색상 (예: bg-red-100 text-red-700)
  title: string; // 큰 제목
  description: ReactNode; // 설명 본문

  // 4. 하단 회색 박스 (핵심 성과/요약)
  children: ReactNode;
}

export default function ExperienceCard({
  imgSrc,
  imgAlt,
  subTitle,
  icon,
  iconClassName = 'text-blue-600', // 기본값
  badge,
  badgeClassName = 'bg-blue-100 text-blue-700', // 기본값
  title,
  description,
  children,
}: ExperienceCardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start py-8 first:pt-0 last:pb-0">
      {/* 좌측: 시각 자료 (2칸) */}
      <div className="lg:col-span-2">
        <Card className="overflow-hidden border-none shadow-lg">
          <ZoomableImage
            src={imgSrc}
            alt={imgAlt}
            width={600}
            height={400}
            className="w-full h-auto object-cover transition-transform hover:scale-105 duration-500"
          />
          <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className={cn('w-4 h-4', iconClassName)}>{icon}</span>
              <span className="text-sm font-bold text-gray-700">
                {subTitle}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* 우측: 스토리 (3칸) */}
      <div className="lg:col-span-3 space-y-4">
        <div className="space-y-2">
          <Badge
            className={cn('hover:bg-opacity-80 px-3 py-1', badgeClassName)}
          >
            {badge}
          </Badge>
          <h3 className="text-2xl font-bold break-keep">{title}</h3>
        </div>

        <div className="text-gray-600 leading-relaxed text-base">
          {description}
        </div>

        {/* 구체적인 성과/사례 박스 */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 space-y-3 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
