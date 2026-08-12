"use client";

import ProjectDetailRenderer from "@/features/project/components/ProjectDetailRenderer";
import ProjectHeader from "@/features/project/components/ProjectHeader";
import ProjectLinks from "@/features/project/components/ProjectLinks";
import { ProjectNavigation } from "@/features/project/components/ProjectNavigation";
import {
  PPICK_CONTRIBUTIONS,
  projectPerformanceData,
} from "@/features/project/contents/p-pick/data";

export default function PPick() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-8 lg:py-14">
      <div>
        <ProjectHeader
          title="P-Pick"
          description="한국관광공사 Open API를 활용해 주변 여행지를 숏폼으로 탐색하는 서비스. 복잡한 슬라이드 상태와 초기 네트워크 비용을 함께 개선했습니다."
          techStack={[
            "React",
            "TypeScript",
            "Vite",
            "Zustand",
            "Tanstack Query",
            "Tailwind CSS",
          ]}
          period="2025.06 — 2025.08"
          role="프론트엔드 개발"
          teamSize="2명"
        />
        <ProjectLinks github="https://github.com/P-pick/front" />
        <section className="mb-12 border-y border-border py-7">
          <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-primary">
            MY CONTRIBUTION
          </p>
          <ul className="grid gap-3 text-sm leading-relaxed text-muted-foreground sm:grid-cols-3">
            {PPICK_CONTRIBUTIONS.map((contribution) => (
              <li key={contribution} className="border-l-2 border-accent pl-3">
                {contribution}
              </li>
            ))}
          </ul>
        </section>
        <h3 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
          기술적 의사결정
        </h3>
        <section className="flex flex-col gap-6">
          {projectPerformanceData.map((data) => (
            <ProjectDetailRenderer key={data.id} data={data} />
          ))}
        </section>
        <ProjectNavigation currentDetailUrl="p-pick" />
      </div>
    </div>
  );
}
