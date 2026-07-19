'use client';

import Image from 'next/image';
import { Github, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const STACKS = ['React', 'TypeScript', 'TanStack Query', 'Admin & CMS', 'Developer Experience'];

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
          운영의 복잡도를 제품으로 해결하는{' '}
          <span className="marker-teal">프론트엔드 개발자</span>
          입니다.
        </h1>

        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          React·TypeScript로 제품 품질을 높이고, 어드민과 운영 도구로 팀의
          반복 업무를 줄입니다. 성능 최적화부터 CMS 운영 자동화, 개발자 경험을
          개선하는 도구까지 문제의 끝을 구현합니다.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-hard-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            이력서 보기
          </a>
          <a
            href="https://github.com/rhehfl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-5 py-2.5 text-sm font-bold shadow-hard-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

        <ul
          className="grid w-full gap-2 text-sm font-medium text-foreground sm:grid-cols-3"
          aria-label="핵심 역량"
        >
          <li className="rounded-xl border border-border bg-card p-3">
            <span className="block text-xs text-muted-foreground">제품 품질</span>
            성능·상태·오류 대응
          </li>
          <li className="rounded-xl border border-border bg-card p-3">
            <span className="block text-xs text-muted-foreground">운영 효율</span>
            어드민·CMS·자동화
          </li>
          <li className="rounded-xl border border-border bg-card p-3">
            <span className="block text-xs text-muted-foreground">개발자 경험</span>
            도구·구조·테스트
          </li>
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
