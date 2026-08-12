"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AspectRatio } from "@modern-kit/react";
import TechStack from "@/features/project/components/TechStack";
import { ProjectCard as ProjectCardType } from "@/features/project/types/ProjectCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

function WorkBadge() {
  return (
    <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-bold text-foreground">
      실무
    </span>
  );
}

export default function ProjectCard(project: ProjectCardType) {
  const {
    title,
    description,
    detailUrl,
    githubLink,
    previewImageUrl,
    techStack,
    period,
    badge,
    highlights,
  } = project;
  const prefersReducedMotion = usePrefersReducedMotion();

  const cardBody = (
    <div className="grid h-full gap-5 p-4 sm:p-5 md:grid-cols-[56px_minmax(0,1fr)_280px] md:gap-7">
      <p className="font-mono text-xs font-bold tracking-[0.16em] text-muted-foreground">
        {String(["CoKo", "P-Pick", "DoranDoran"].indexOf(title) + 1).padStart(
          2,
          "0",
        )}
      </p>
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          {badge === "work" && <WorkBadge />}
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        {highlights && (
          <ul className="flex flex-col gap-1.5" aria-label="주요 성과">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm font-medium text-foreground"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-col gap-3 pt-2">
          <p className="text-xs text-muted-foreground">{period}</p>
          <TechStack stacks={techStack} />
        </div>
      </div>
      {previewImageUrl && (
        <div className="order-first border border-border bg-secondary p-2 md:order-none">
          <AspectRatio ratio={16 / 9} className="relative w-full">
            <Image
              src={previewImageUrl}
              alt={`${title} 프로젝트 미리보기`}
              fill
              sizes="(max-width: 768px) 100vw, 260px"
              priority={false}
              className="object-cover"
            />
          </AspectRatio>
        </div>
      )}
    </div>
  );

  const cardFrame = cn(
    "h-full border-y border-border bg-card transition-colors hover:border-foreground",
  );

  const motionProps = {
    initial: prefersReducedMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.5, ease: "easeOut" as const },
    whileHover: undefined,
  };

  const wrapperClass = "h-full";

  const interactiveClass =
    "flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <motion.article
      {...motionProps}
      className={wrapperClass}
      aria-label={`${title} 프로젝트`}
    >
      {detailUrl ? (
        <Link
          href={`/card/${detailUrl}`}
          className={cn(interactiveClass, cardFrame)}
          aria-label={`${title} 상세 보기`}
        >
          {cardBody}
        </Link>
      ) : githubLink ? (
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(interactiveClass, cardFrame)}
          aria-label={`${title} GitHub 저장소 (새 탭)`}
        >
          {cardBody}
        </a>
      ) : (
        <div className={cardFrame}>{cardBody}</div>
      )}
    </motion.article>
  );
}
