'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import TechStack from '@/features/project/components/TechStack';
import { ProjectCard as ProjectCardType } from '@/features/project/types/ProjectCard';
import Link from 'next/link';
import { AspectRatio } from '@modern-kit/react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function ProjectCard({
  title,
  description,
  detailUrl,
  previewImageUrl,
  techStack,
  period,
}: ProjectCardType) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={
        prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }
      }
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              scale: 1.02,
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
              transition: { duration: 0.2 },
            }
      }
      className="h-full rounded-2xl border border-border bg-card shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
      aria-label={`${title} 프로젝트`}
    >
      <Link
        href={`/card/${detailUrl}`}
        className="flex h-full flex-col rounded-lg overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`${title} 상세 보기`}
      >
        <Card className="group h-full border-none shadow-md bg-card backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <div className="flex gap-3">
              <p className="text-sm text-muted-foreground">기간:</p>
              <p className="text-sm text-muted-foreground">{period}</p>
            </div>
            <div className="relative w-full overflow-hidden">
              <TechStack stacks={techStack} className="whitespace-nowrap" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-3">
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { opacity: 0.9 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
              className="w-full h-full relative"
            >
              <AspectRatio ratio={16 / 9} className="w-full relative">
                <Image
                  src={previewImageUrl}
                  alt={`${title} 프로젝트 미리보기`}
                  fill
                  priority={false}
                  className="rounded-lg object-cover"
                />
              </AspectRatio>
            </motion.div>
          </CardContent>
        </Card>
      </Link>
    </motion.article>
  );
}
