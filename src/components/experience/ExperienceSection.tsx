'use client';

import ExperienceItem from '@/components/experience/ExperienceItem';
import { motion } from 'framer-motion';

const experiences = [
  {
    id: 1,
    type: 'open-source',
    period: 'Constant',
    title: '@modern-kit',
    company: 'Open Source Lib',
    role: 'Contributor (⭐️ 150+)',
    description:
      'React 개발에 유용한 컴포넌트, 커스텀 훅, 유틸 함수를 제공하는 오픈 소스 라이브러리입니다. 클라이언트 개발 생산성을 높이는 아이디어를 제안하고 꾸준히 코드를 기여하고 있습니다.',
    link: 'https://github.com/modern-agile-team/modern-kit',
  },
  {
    id: 2,
    type: 'club',
    period: '2024.06 - 2025.02',
    title: '모던 애자일 (Modern Agile)',
    company: '인덕대학교 웹 개발 동아리',
    role: 'Member / Mentor',
    description:
      '프론트엔드, 백엔드, 디자인 팀으로 나누어 협업 프로젝트를 진행했습니다. 후배 기수 코드 리뷰 및 멘토링을 담당했으며, CS 지식을 공유하는 테크톡을 주도했습니다.',
    link: 'https://github.com/modern-agile-team',
  },
  {
    id: 3,
    type: 'study',
    period: '2025.08 - Current',
    title: '모던 자바스크립트 Deep-Dive',
    company: 'Book Study',
    role: 'Member',
    description:
      '매주 수요일, "모던 자바스크립트 Deep-Dive" 책을 기반으로 JS의 핵심 동작 원리를 심도 있게 토론하고 학습 내용을 공유하는 스터디를 진행 중입니다.',
  },
  {
    id: 4,
    type: 'study-casual',
    period: '2024.09 - Current',
    title: '모각코 (모여서 각자 코딩)',
    company: 'Dev Study',
    role: 'Member',
    description:
      '매주 일요일 정기적으로 모여 각자의 부족한 부분을 보충하고, 코딩 관련 지식을 자유롭게 교류하는 소규모 스터디 활동입니다.',
  },
] as const;
export default function ExperienceSection() {
  return (
    <section className="grid grid-cols-12 gap-6 auto-rows mb-24">
      <header className="col-span-10 col-start-2 mt-30 mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold"
        >
          __경험 및 활동
        </motion.h2>
      </header>

      <div className="col-span-12 md:col-span-10 md:col-start-2 flex flex-col ">
        {experiences.map((item, index) => (
          <ExperienceItem key={item.id} {...item} index={index} />
        ))}
      </div>
    </section>
  );
}
