'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

export type CardVariant = 'blue' | 'green' | 'purple' | 'gray';
const styles = {
  blue: {
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    insetShadow: 'inset-shadow-blue-200',
  },
  green: {
    bg: 'bg-green-50',
    iconColor: 'text-green-600',
    insetShadow: 'inset-shadow-green-500',
  },
  purple: {
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    insetShadow: 'inset-shadow-purple-500',
  },
  gray: {
    bg: 'bg-gray-50',
    iconColor: 'text-gray-600',
    insetShadow: 'inset-shadow-gray-500',
  },
} as const;

const overlayVariants = {
  rest: { x: '100%' },
  hover: {
    x: 70,
    transition: { type: 'spring', stiffness: 350, damping: 30, duration: 0.3 },
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
      className="group overflow-hidden relative h-full p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="flex mb-6 items-center gap-5">
        <div
          className={`w-14 h-14 rounded-xl ${currentStyle.bg} ${currentStyle.iconColor} flex items-center justify-center `}
        >
          <div className="w-6 h-6">{icon}</div>
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>

      <p className="text-gray-600 leading-relaxed text-[15px] break-keep">
        {description}
      </p>
      <motion.div
        className={`inset-shadow-sm group-hover:shadow-2xl absolute inset-0 ${currentStyle.bg} z-10 p-8 rounded-l-2xl flex flex-col justify-center ${currentStyle.insetShadow}`}
        variants={overlayVariants}
      >
        <Link
          className="w-full h-full cursor-pointer flex items-center gap-2 font-bold ${currentStyle.iconColor}"
          href={`/card/${id}`}
        >
          <ArrowLeft className="w-5 h-5" /> 자세히 보기
        </Link>
      </motion.div>
    </motion.article>
  );
}
