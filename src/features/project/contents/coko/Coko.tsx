"use client";

import Image from "next/image";
import ProjectDetailRenderer from "@/features/project/components/ProjectDetailRenderer";
import ProjectHeader from "@/features/project/components/ProjectHeader";
import ProjectLinks from "@/features/project/components/ProjectLinks";
import { ProjectNavigation } from "@/features/project/components/ProjectNavigation";
import {
  cokoPerformanceData,
  cokoTroubleshootingData,
} from "@/features/project/contents/coko/data";

const CONTRIBUTIONS = [
  {
    label: "01 / FOUNDATION",
    title: "초기 화면 구조와 개발 기준 정리",
    description:
      "프로젝트 초기에 폴더 구조, 공통 레이아웃, 그리드 시스템과 TanStack Query 세팅을 제안하고 구현했습니다.",
  },
  {
    label: "02 / LEARNING FLOW",
    title: "퀴즈 화면과 학습 흐름 구현",
    description:
      "여러 유형의 퀴즈 UI와 진행 상태를 다루며, 학습 중 새로고침이나 이동으로 데이터가 사라지는 상황을 보완했습니다.",
  },
  {
    label: "03 / OPERATIONS",
    title: "콘텐츠 운영을 위한 어드민 화면 구축",
    description:
      "문제 목록과 등록 화면을 만들고, 운영자가 콘텐츠를 직접 관리할 수 있는 CRUD 흐름을 구현했습니다.",
  },
];

export default function Coko() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 lg:py-14">
      <ProjectHeader
        title="CoKo"
        description="JavaScript를 게임처럼 배우는 퀴즈 기반 교육 서비스"
        techStack={[
          "React",
          "TypeScript",
          "Vite",
          "Zustand",
          "Tanstack Query",
          "Styled-Components",
        ]}
        period="2024.09 — 2025.03"
        role="프론트엔드 팀장 · 어드민 페이지 개발"
        teamSize="6명"
      />
      <ProjectLinks github="https://github.com/modern-agile-team/8term-coko-Front" />

      <figure className="border border-border bg-secondary p-2 sm:p-3">
        <div className="relative aspect-[16/9] overflow-hidden bg-card">
          <Image
            src="/coko/coko_previewImage.png"
            alt="CoKo 서비스 화면"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
        <figcaption className="px-1 pb-1 pt-3 text-xs text-muted-foreground">
          CoKo / quiz-based JavaScript learning service
        </figcaption>
      </figure>

      <section className="mt-14">
        <div className="mb-5 flex items-end justify-between border-b border-foreground pb-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              CONTRIBUTION LOG
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight">
              내가 맡은 일
            </h3>
          </div>
          <p className="hidden text-sm text-muted-foreground sm:block">
            구조 · 학습 흐름 · 운영 화면
          </p>
        </div>
        <div className="grid border-l border-t border-border md:grid-cols-3">
          {CONTRIBUTIONS.map((contribution) => (
            <article
              key={contribution.label}
              className="border-b border-r border-border p-5"
            >
              <p className="text-xs font-semibold tracking-[0.14em] text-primary">
                {contribution.label}
              </p>
              <h4 className="mt-5 text-lg font-bold tracking-tight">
                {contribution.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {contribution.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-5 border-b border-foreground pb-3">
          <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
            DECISION RECORD
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight">
            구현하며 확인한 문제
          </h3>
        </div>
        <div className="flex flex-col gap-6">
          {cokoTroubleshootingData.slice(0, 2).map((data) => (
            <ProjectDetailRenderer key={data.id} data={data} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-5 border-b border-foreground pb-3">
          <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
            PERFORMANCE RECORD
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight">
            초기 로딩 개선
          </h3>
        </div>
        <div className="flex flex-col gap-6">
          {cokoPerformanceData.map((data) => (
            <ProjectDetailRenderer key={data.id} data={data} />
          ))}
        </div>
      </section>
      <ProjectNavigation currentDetailUrl="coko" />
    </div>
  );
}
