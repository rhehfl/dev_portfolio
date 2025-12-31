'use client';

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { GraduationCap, Trophy } from 'lucide-react';

interface EducationAwardItemProps {
  type: 'education' | 'award';
  date: string;
  title: string;
  subtitle: string;
  index: number;
  isLast?: boolean;
}

export default function EducationAwardItem({
  type,
  date,
  title,
  subtitle,
  index,
}: EducationAwardItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  // 타입에 따른 아이콘 및 색상 설정
  const isAward = type === 'award';
  const Icon = isAward ? Trophy : GraduationCap;
  const iconColor = isAward ? 'text-yellow-500' : 'text-primary';
  const dotColor = isAward
    ? 'bg-yellow-400 border-yellow-400'
    : 'bg-background border-primary';

  return (
    <motion.div
      ref={ref}
      className="flex flex-col md:flex-row gap-4 md:gap-8 relative group pb-8 last:pb-0"
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex-none md:basis-1/4 md:shrink-0 flex items-center md:items-start md:justify-end pt-0.5">
        <span className="text-sm font-medium text-muted-foreground/80 font-mono">
          {date}
        </span>
      </div>

      <div className="flex-1 flex pl-6 md:pl-8">
        <div
          className={` top-[6px] w-[7px] h-[7px] rounded-full z-10 border-2 ${dotColor} box-content`}
        />

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${iconColor}`} />
            <h3 className="text-base md:text-lg font-bold text-foreground leading-none">
              {title}
            </h3>
          </div>

          <p className="text-sm text-muted-foreground pl-6 md:pl-0 font-light">
            {subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
