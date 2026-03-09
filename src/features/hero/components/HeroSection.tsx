'use client';

import CapabilityCard from '@/features/hero/components/CapabilityCard';
import ProfileCard from '@/features/hero/components/ProfileCard';
import { CAPABILITIES } from '@/features/hero/contents/capabilites';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVars = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVars = {
    hidden: { y: prefersReducedMotion ? 0 : 20, opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.5 },
    },
  };

  return (
    <section className="grid grid-cols-12 gap-6 auto-row" id="intro">
      <div className="col-span-10 col-start-2">
        <h1 className="text-4xl font-bold text-foreground">_Profile</h1>
      </div>
      <ProfileCard />
      {/* aria-label로 하위 섹션 구분 */}
      <section
        className="flex col-span-12 md:col-span-5 md:col-start-7"
        aria-label="핵심 역량"
      >
        <motion.ul
          variants={containerVars}
          className="flex flex-col gap-5"
          initial="hidden"
          animate="visible"
          aria-label="역량 카드 목록"
        >
          {CAPABILITIES.map((capability) => (
            <motion.li key={capability.id} variants={itemVars}>
              <CapabilityCard {...capability} />
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </section>
  );
}
