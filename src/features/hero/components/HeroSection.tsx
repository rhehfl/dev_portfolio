'use client';

import Image from 'next/image';
import { Github, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const STACKS = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'TanStack Query'];

const RESUME_URL = 'https://app.notion.com/p/1b278b12a47f80178755dcf3fa5c8922';

export default function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const fadeUp = {
    initial: prefersReducedMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="grid grid-cols-12 gap-6 pt-8 md:pt-16"
      id="intro"
    >
      <motion.div
        {...fadeUp}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
        className="col-span-12 flex flex-col items-start gap-6 md:col-span-6 md:col-start-2"
      >
        <span className="rounded-full border-2 border-foreground bg-card px-4 py-1.5 text-sm font-semibold shadow-hard-sm">
          👋 안녕하세요!
        </span>

        <h1 className="text-3xl font-bold leading-snug md:text-4xl">
          재미있게 배우고,{' '}
          <span className="marker-teal">단단하게 만드는</span>
          <br />
          프론트엔드 개발자 구도윤입니다.
        </h1>

        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          지금은 앤드와이즈에서 n8n·LLM 기반 운영 자동화 플랫폼을 만들고
          있습니다. 번들 사이즈 85% 감소처럼 측정 가능한 개선과, 팀의 개발
          생산성을 높이는 도구 만들기를 좋아합니다.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-hard-sm transition-transform hover:-translate-y-0.5"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            이력서 보기
          </a>
          <a
            href="https://github.com/rhehfl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-5 py-2.5 text-sm font-bold shadow-hard-sm transition-transform hover:-translate-y-0.5"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
        </div>

        <ul className="flex flex-wrap gap-2" aria-label="주요 기술 스택">
          {STACKS.map((stack) => (
            <li
              key={stack}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"
            >
              {stack}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.figure
        {...fadeUp}
        transition={
          prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.15 }
        }
        className="col-span-12 flex justify-center md:col-span-3 md:col-start-9 md:justify-end"
      >
        {/* TODO(사용자 에셋): 캐주얼 사진 수급 시 교체 — 현재는 증명사진 플레이스홀더 */}
        <Image
          src="/profile_image.jpg"
          alt="프론트엔드 개발자 구도윤 프로필 사진"
          width={172}
          height={212}
          priority
          className="rotate-[1.5deg] rounded-[20px] border-2 border-foreground object-cover shadow-hard-teal"
        />
      </motion.figure>
    </section>
  );
}
