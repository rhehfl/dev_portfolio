'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Trophy, BadgeCheck } from 'lucide-react';
import type { CredentialItem } from '@/features/credential/types/CredentialItem';
interface CredentialItemProps extends CredentialItem {
  index: number;
}
const CONFIG = {
  education: {
    Icon: GraduationCap,
    iconColor: 'text-primary',
    dotStyle: 'bg-background border-primary',
  },
  award: {
    Icon: Trophy,
    iconColor: 'text-yellow-500',
    dotStyle: 'bg-yellow-400 border-yellow-400',
  },
  certificate: {
    Icon: BadgeCheck,
    iconColor: 'text-emerald-500',
    dotStyle: 'bg-emerald-500 border-emerald-500',
  },
} as const;

export default function CredentialItem({
  type,
  date,
  title,
  subtitle,
  index,
}: CredentialItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const { Icon, iconColor, dotStyle } = CONFIG[type] || CONFIG.education;

  return (
    <motion.div
      ref={ref}
      className="flex flex-col md:flex-row gap-4 md:gap-8 relative group pb-8 last:pb-0"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex-none md:basis-1/4 md:shrink-0 flex items-center md:items-start md:justify-end">
        <span className="text-sm font-semibold text-muted-foreground font-mono">
          {date}
        </span>
      </div>

      <div className="flex-1 relative pl-6 md:pl-8">
        <div className="mt-1">
          <div className="flex items-center gap-2 mb-1">
            <Icon className={`w-4 h-4 shrink-0 ${iconColor}`} />
            <h3 className="text-lg ml-2 md:text-xl font-bold">{title}</h3>
          </div>

          <p className="text-sm md:text-base text-muted-foreground pl-6 md:pl-0">
            {subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
