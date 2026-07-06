'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AspectRatio } from '@modern-kit/react';
import TechStack from '@/features/project/components/TechStack';
import { ProjectCard as ProjectCardType } from '@/features/project/types/ProjectCard';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

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
    tier = 'mini',
    badge,
    highlights,
  } = project;
  const prefersReducedMotion = usePrefersReducedMotion();

  const isFeatured = tier === 'featured';
  const isInteractive = Boolean(detailUrl || githubLink);

  const cardBody = (
    <div className="flex h-full flex-col gap-3 p-6">
      <div className="flex items-center gap-2">
        <h3 className={cn('font-bold', isFeatured ? 'text-2xl' : 'text-lg')}>
          {title}
        </h3>
        {badge === 'work' && <WorkBadge />}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {isFeatured && highlights && (
        <ul className="flex flex-col gap-1.5" aria-label="주요 성과">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm font-medium">
              <span className="mt-0.5 text-primary" aria-hidden="true">
                ✦
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto flex flex-col gap-3">
        <p className="text-xs text-muted-foreground">{period}</p>
        <TechStack stacks={techStack} />
      </div>
      {isFeatured && previewImageUrl && (
        <div className="mt-2">
          <AspectRatio ratio={16 / 9} className="relative w-full">
            <Image
              src={previewImageUrl}
              alt={`${title} 프로젝트 미리보기`}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              priority={false}
              className="rounded-lg border-2 border-foreground object-cover"
            />
          </AspectRatio>
        </div>
      )}
    </div>
  );

  const cardFrame = cn(
    'h-full rounded-2xl border-2 border-foreground bg-card transition-transform',
    isFeatured && 'shadow-hard-pink',
    tier === 'sub' && 'shadow-hard-teal',
    tier === 'mini' && 'shadow-hard',
  );

  const motionProps = {
    initial: prefersReducedMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.5, ease: 'easeOut' as const },
    whileHover: isInteractive && !prefersReducedMotion ? { y: -4 } : undefined,
  };

  const wrapperClass = cn(
    'h-full',
    isFeatured ? 'md:col-span-2' : 'md:col-span-1',
  );

  const interactiveClass =
    'flex h-full flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

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
