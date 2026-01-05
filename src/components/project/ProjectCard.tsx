'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import Image from 'next/image';
import TechStack from '@/components/project/card/TechStack';
import { ProjectCard as ProjectCardType } from '@/types/ProjectCard';
import { Github } from 'lucide-react';
import Link from 'next/link';
import { AspectRatio } from '@modern-kit/react';
import { motion } from 'framer-motion';

export default function ProjectCard({
  githubLink,
  title,
  description,
  detailUrl,
  previewImageUrl,
  thechStack,
  period,
}: ProjectCardType) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transition: { duration: 0.2 },
      }}
      className="h-full rounded-2xl shadow-lg hover:shadow-2xl  from-white/50 to-white/30 dark:from-black/50 dark:to-black/30 border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
    >
      <Link
        href={`/card/${detailUrl}`}
        className="flex h-full flex-col rounded-lg overflow-hidden"
      >
        <Card className="group h-full border-none shadow-md bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <div className="flex gap-3">
              <p className="text-sm text-muted-foreground">기간:</p>
              <p className="text-sm text-muted-foreground">{period}</p>
            </div>
            <div className="relative w-full overflow-hidden">
              <TechStack stacks={thechStack} className="whitespace-nowrap" />

              <div className="absolute top-0 right-0 w-5 h-full bg-linear-to-l from-white to-transparent"></div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-3">
            <motion.div
              whileHover={{ opacity: 0.9 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full relative"
            >
              <AspectRatio ratio={16 / 9} className="w-full relative">
                <Image
                  src={previewImageUrl}
                  alt={title}
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
