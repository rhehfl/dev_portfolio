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

export default function ProjectCard({
  githubLink,
  title,
  description,
  detailUrl,
  previewImageUrl,
}: ProjectCardType) {
  return (
    <article>
      <Card className="group h-full cursor-pointer transition hover:shadow-2xl hover:scale-[1.02]">
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
            className="flex h-full flex-col  rounded-lg"
          >
            <AspectRatio ratio={16 / 9} className="w-full relative">
              <Image
                src={previewImageUrl}
                alt={title}
                fill
                priority={false}
                className=" rounded-lg"
              />
            </AspectRatio>
          </Link>
        </CardContent>

        <CardFooter className="flex justify-end">
          <a href={githubLink} target="_blank" rel="noopener noreferrer">
            <Github />
          </a>
        </CardFooter>
      </Card>
    </article>
  );
}
