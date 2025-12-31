'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Trophy } from 'lucide-react';

// 1. 데이터 정의 (설명 제거, 핵심 정보만)
const historyData = [
  {
    id: 1,
    type: 'education',
    date: '2019.03 - 2024.02',
    title: '인덕대학교',
    subtitle: '컴퓨터소프트웨어학과 졸업 (4.0/4.5)',
  },
  {
    id: 2,
    type: 'award',
    date: '2023.11',
    title: '캡스톤 디자인 경진대회',
    subtitle: '대상 (인덕대학교 산학협력단)',
  },
  {
    id: 3,
    type: 'award',
    date: '2023.06',
    title: '지역 문제 해결 해커톤',
    subtitle: '우수상 (OO시 청년센터)',
  },
  {
    id: 4,
    type: 'education',
    date: '2016.03 - 2019.02',
    title: 'OO 고등학교',
    subtitle: '이과 졸업',
  },
];

export default function EducationAwardSection() {
  return (
    <section className="grid grid-cols-12 gap-6 auto-rows mb-24">
      {/* 헤더 */}
      <header className="col-span-10 col-start-2 mt-20 mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold tracking-tight"
        >
          __수상 및 학력
        </motion.h2>
      </header>

      {/* 리스트 컨테이너 (gap 제거) */}
      <div className="col-span-12 md:col-span-10 md:col-start-2 flex flex-col">
        {historyData.map((item, index) => (
          <SimpleItem
            key={item.id}
            item={item}
            index={index}
            isLast={index === historyData.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

// 2. 심플 아이템 컴포넌트
function SimpleItem({
  item,
  index,
  isLast,
}: {
  item: any;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  // 아이콘 선택
  const Icon = item.type === 'education' ? GraduationCap : Trophy;
  const isAward = item.type === 'award';

  return (
    <motion.div
      ref={ref}
      // pb-8로 줄여서 더 컴팩트하게
      className="flex flex-col md:flex-row gap-4 md:gap-8 relative group pb-8 last:pb-0"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* [좌측] 날짜 영역 */}
      <div className="flex-none md:basis-1/4 md:shrink-0 flex items-center md:items-start md:justify-end">
        <span className="text-sm font-semibold text-muted-foreground font-mono">
          {item.date}
        </span>
      </div>

      {/* [우측] 내용 영역 */}
      <div className="flex-1 relative pl-6 md:pl-8">
        {/* 연결 선 (Line) */}
        {!isLast && (
          <div className="absolute left-0 md:left-0 top-2 bottom-[-6px] w-[2px] bg-border md:-ml-[1px]" />
        )}

        {/* 점 (Dot) - 아이콘에 따라 색상/모양 다르게 주면 예쁨 */}
        <div
          className={`absolute left-[-4px] md:left-[-8px] top-1.5 md:top-1 w-[8px] h-[8px] md:w-[16px] md:h-[16px] rounded-full z-10 border-2 md:border-4 ring-4 ring-background ${
            isAward
              ? 'bg-yellow-400 border-yellow-400'
              : 'bg-background border-primary'
          }`}
        />

        {/* 카드 형태 제거하고 텍스트만 깔끔하게 배치 */}
        <div className="-mt-1">
          <div className="flex items-center gap-2 mb-1">
            {/* 모바일/데스크탑 모두 아이콘 작게 표시 */}
            <Icon
              className={`w-4 h-4 ${
                isAward ? 'text-yellow-500' : 'text-primary'
              }`}
            />
            <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
          </div>

          <p className="text-sm md:text-base text-muted-foreground pl-6 md:pl-0">
            {item.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
