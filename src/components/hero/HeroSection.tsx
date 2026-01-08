'use client';

import CapabilityCard from '@/components/hero/CapabilityCard';
import ProfileCard from '@/components/hero/ProfileCard';
import { motion } from 'framer-motion';
import { GitFork, MonitorSmartphone, Server } from 'lucide-react';
const CAPABILITIES = [
  {
    id: 'opensource',
    variant: 'blue',
    icon: <GitFork />,
    title: '불편함을 해결하고 기여합니다',
    description:
      '클라이언트 개발 중 겪은 불편함을 해결하고 이를 오픈소스로 기여하며, 개발 생태계와 함께 성장하는 것을 즐깁니다.',
  },
  {
    id: 'standard',
    variant: 'green',
    icon: <MonitorSmartphone />,
    title: '웹 표준을 지향합니다',
    description:
      '시멘틱 태그, 반응형 웹, ES6 표준 등 기본 원칙을 준수하며 견고하고 유지보수하기 좋은 웹 환경을 만듭니다.',
  },
  {
    id: 'infrastructure',
    variant: 'purple',
    icon: <Server />,
    title: '넓은 시야로 소통합니다',
    description:
      'NestJS, AWS, CI/CD 구축 경험을 통해 백엔드 로직과 인프라를 이해하며 이를 바탕으로 원활한 협업을 추구합니다.',
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
      <div className="col-span-10 col-start-2">
        <h1 className="text-4xl font-bold">_Profile</h1>
      </div>
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
