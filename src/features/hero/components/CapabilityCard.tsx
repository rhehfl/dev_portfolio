'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export type CardVariant = 'blue' | 'green' | 'purple' | 'gray';
const styles = {
  blue: {
    iconWrapper: 'bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300',
  },
  green: {
    iconWrapper:
      'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300',
  },
  purple: {
    iconWrapper:
      'bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300',
  },
  gray: {
    iconWrapper: 'bg-muted text-muted-foreground',
  },
} as const;

interface CapabilityCardProps {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  variant?: CardVariant;
}

export default function CapabilityCard({
  id,
  title,
  description,
  icon,
  variant = 'gray',
}: CapabilityCardProps) {
  const currentStyle = styles[variant];

  return (
    <motion.article
      whileHover="hover"
      initial="rest"
      animate="rest"
      whileTap="hover"
      className="group overflow-hidden relative h-full p-8 flex flex-col border border-border rounded-2xl bg-card shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex mb-6 items-center gap-5">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${currentStyle.iconWrapper}`}
        >
          <div className="w-6 h-6">{icon}</div>
        </div>
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
      </div>

      <p className="text-muted-foreground leading-relaxed text-[15px] whitespace-pre-wrap">
        {description}
      </p>
    </motion.article>
  );
}
