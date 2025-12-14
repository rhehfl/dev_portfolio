'use client';

import CapabilityCard from '@/components/hero/CapabilityCard';
import ProfileCard from '@/components/hero/ProfileCard';
import { motion } from 'framer-motion';
import { BookOpen, MessageSquareText, Zap } from 'lucide-react';
const CAPABILITIES = [
  {
    id: 'deep-dive',
    variant: 'blue',
    icon: <BookOpen />,
    title: 'Deep Dive',
    description:
      '왜? 라는 질문의 답을 공식 문서에서 찾습니다. 원인 모를 이슈를 끝까지 파고들어 팀이 납득할 수 있는 해결책을 제시합니다.',
  },
  {
    id: 'communication',
    variant: 'green',
    icon: <MessageSquareText />,
    title: 'Communication',
    description:
      '코드 품질을 위한 치열한 리뷰와 오픈소스 기여를 즐깁니다. 혼자 성장하는 것이 아니라 팀과 생태계에 기여하는 문화를 지향합니다.',
  },
  {
    id: 'dx',
    variant: 'purple',
    icon: <Zap />,
    title: 'DX (Developer Experience)',
    description:
      '개발 효율이 곧 서비스 품질입니다. 배포 자동화와 아키텍처 개선을 통해 동료들이 비즈니스 로직에만 집중할 수 있는 환경을 만듭니다.',
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
      <section className="flex col-span-12 md:col-span-4 lg:col-span-5 md:col-start-7 lg:col-start-7">
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
