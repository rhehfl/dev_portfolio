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
}: ProjectCardType) {
  return (
    // article 태그를 motion.article로 변경하여 애니메이션 속성을 적용합니다.
    <motion.article
      initial={{ opacity: 0, y: 20 }} // 초기 상태: 투명하고 20px 아래에 위치
      whileInView={{ opacity: 1, y: 0 }} // 뷰포트에 들어오면: 불투명해지고 원래 위치로 이동
      viewport={{ once: true, margin: '-50px' }} // 한 번만 실행되며, 뷰포트 하단 -50px 지점에서 트리거
      transition={{ duration: 0.5, ease: 'easeOut' }} // 부드러운 등장을 위한 트랜지션 설정
      whileHover={{
        scale: 1.02, // 호버 시 1.02배 확대
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // 호버 시 부드러운 그림자 효과 (shadow-2xl 대체)
        transition: { duration: 0.2 }, // 호버 효과 트랜지션 시간
      }}
      className="h-full"
    >
      {/* Card 컴포넌트의 기존 CSS hover 및 transition 클래스를 제거합니다. */}
      <Card className="group h-full border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <p className="text-sm text-muted-foreground">기간</p>
          <div className="relative w-full overflow-hidden">
            <TechStack
              stacks={[
                'React',
                'TypeScript',
                'Tanstack Query',
                'Zustand',
                'Styled-Components',
              ]}
              className="whitespace-nowrap"
            />
            <div className="absolute top-0 right-0 w-5 h-full bg-linear-to-l from-white to-transparent"></div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3">
          <Link
            href={`/card/${detailUrl}`}
            className="flex h-full flex-col rounded-lg overflow-hidden"
          >
            {/* 이미지 컨테이너에도 호버 시 약간의 효과를 줄 수 있습니다. */}
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
          </Link>
        </CardContent>

        <CardFooter className="flex justify-end pb-4 pr-4">
          <motion.a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 5 }} // 깃허브 아이콘 호버 시 살짝 커지고 회전하는 효과
            whileTap={{ scale: 0.95 }} // 클릭 시 살짝 작아지는 효과
            className="rounded-full p-2 bg-secondary/50 hover:bg-secondary transition-colors text-foreground/80"
          >
            <Github className="w-5 h-5" />
          </motion.a>
        </CardFooter>
      </Card>
    </motion.article>
  );
}
