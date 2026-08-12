"use client";

import Image from "next/image";
import { Github, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STACKS = ["React", "TypeScript", "TanStack Query", "Next.js"];

const RESUME_URL =
  "https://app.notion.com/p/3ad78b12a47f812ab52bdd876304949b?pvs=204";

export default function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const fadeUp = {
    initial: prefersReducedMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="mx-auto grid max-w-5xl grid-cols-12 gap-6 pt-10 md:pt-20"
      id="intro"
    >
      <motion.div
        {...fadeUp}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
        className="col-span-12 flex flex-col items-start gap-6 md:col-span-8"
      >
        <p className="text-sm font-semibold tracking-[0.16em] text-primary">
          FRONTEND ENGINEER · GU DOYOON
        </p>

        <h1 className="text-4xl font-bold leading-[1.18] tracking-tight md:text-6xl">
          사용자가 느끼는 <span className="text-primary">마찰</span>을<br />
          제품의 흐름으로 해결합니다.
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          React와 TypeScript로 데이터·상태·성능의 복잡도를 다룹니다. 사용자
          화면의 끊김을 줄이고, 팀이 반복해서 겪는 운영 문제를 더 단순한
          인터페이스로 바꿉니다.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            이력서 보기
          </a>
          <a
            href="https://github.com/rhehfl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-bold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.5, delay: 0.15 }
        }
        className="col-span-12 flex justify-start md:col-span-3 md:col-start-10 md:justify-end"
      >
        {/* TODO(사용자 에셋): 캐주얼 사진 수급 시 교체 — 현재는 증명사진 플레이스홀더 */}
        <Image
          src="/profile_image.jpg"
          alt="프론트엔드 개발자 구도윤 프로필 사진"
          width={156}
          height={192}
          priority
          className="rounded-2xl border border-border object-cover shadow-hard"
        />
      </motion.figure>
    </section>
  );
}
