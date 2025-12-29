'use client';

import CapabilityCard from '@/components/hero/CapabilityCard';
import ProfileCard from '@/components/hero/ProfileCard';
import { motion } from 'framer-motion';
import { MessageSquareText } from 'lucide-react';
const CAPABILITIES = [
  {
    id: 'communication',
    variant: 'green',
    icon: <MessageSquareText />,
    title: '저는 이렇게 협업해요!',
    description:
      '모던 애자일 동아리에서 9개월간 협업을 통해 성공적인 서비스 런칭과 오픈 소스 기여를 통한 소통 경험',
  },
] as const;
const containerVars = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVars = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};
export default function HeroSection() {
  return (
    <section className="grid grid-cols-12 gap-6 auto-row">
      <ProfileCard />
      <section className="flex col-span-12 md:col-span-5  md:col-start-7 ">
        <motion.ul
          variants={containerVars}
          className="flex flex-col gap-5"
          initial="hidden"
          animate="visible"
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
