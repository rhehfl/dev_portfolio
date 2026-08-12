"use client";

import { Github, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const RESUME_URL =
  "https://app.notion.com/p/3ad78b12a47f812ab52bdd876304949b?pvs=204";

export default function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-5xl pt-10 md:pt-20" id="intro">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.45 }}
        className="border-y border-foreground py-8 md:py-12"
      >
        <div className="flex flex-col items-start gap-6">
          <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
            GU DOYOON / PORTFOLIO 2026
          </p>
          <h1 className="text-4xl font-bold leading-[1.12] tracking-tight md:text-6xl">
            안녕하세요,
            <br />
            구도윤입니다.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            React와 TypeScript로 웹 서비스를 만들고 있습니다. 사용자가 편하게 쓸
            수 있는 화면과, 팀이 함께 관리하기 쉬운 구조를 고민합니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-foreground px-4 py-2.5 text-sm font-bold text-background transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              이력서 보기
            </a>
            <a
              href="https://github.com/rhehfl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-foreground bg-card px-4 py-2.5 text-sm font-bold transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
