'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Trophy } from 'lucide-react';

const historyData = [
  {
    id: 1,
    type: 'education',
    date: '2021.03 - 현재',
    title: '인덕대학교',
    subtitle: '컴퓨터소프트웨어학과 재학 (학점 4.37/4.5)',
  },
  {
    id: 2,
    type: 'award',
    date: '2025.11',
    title: 'SW프로젝트 학술상',
    subtitle:
      '도란도란 프로젝트 설계/개발로 ACK 2025 논문을 발표하여 교내 SW프로젝트 학술상을 수상',
  },
  {
    id: 3,
    type: 'award',
    date: '2024.12',
    title: 'AWS 서비스 활용능력 경진대회 최우수상',
    subtitle:
      '교내 학과에서 주최한 AWS 서비스 활용능력 경진대회에서 최우수상을 수상함',
  },
  {
    id: 4,
    type: 'award',
    date: '2024.12',
    title: '인덕 도서관상 우수상',
    subtitle:
      '교내 도서관을 적극 활용한 학생에게 수여되는 인덕 도서관상을 수상함',
  },
];

export default function EducationAwardSection() {
  return (
    <section className="grid grid-cols-12 gap-6 auto-rows mb-24">
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

  const Icon = item.type === 'education' ? GraduationCap : Trophy;
  const isAward = item.type === 'award';

  return (
    <motion.div
      ref={ref}
      id="education"
      className="flex flex-col md:flex-row gap-4 md:gap-8 relative group pb-8 last:pb-0"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex-none md:basis-1/4 md:shrink-0 flex items-center md:items-start md:justify-end">
        <span className="text-sm font-semibold text-muted-foreground font-mono">
          {item.date}
        </span>
      </div>

      <div className="flex-1 relative pl-6 md:pl-8">
        <div
          className={`absolute left-[-4px] md:left-[-8px] top-1.5 md:top-1 w-[8px] h-[8px] md:w-[16px] md:h-[16px] rounded-full z-10 border-2 md:border-4 ring-4 ring-background ${
            isAward
              ? 'bg-yellow-400 border-yellow-400'
              : 'bg-background border-primary'
          }`}
        />
        <div className="-mt-1">
          <div className="flex items-center gap-2 mb-1">
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
