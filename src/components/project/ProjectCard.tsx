import Carousel from '@/components/common/Carousel';
import TechStack from '@/components/project/card/TechStack';
import { ProjectCard as ProjectCardType } from '@/types/ProjectCard';
import { Github } from 'lucide-react';
import Link from 'next/link';

export default function ProjectCard({
  githubLink,
  title,
  description,
  link,
}: ProjectCardType) {
  return (
    <article className="flex flex-col rounded-2xl border border-gray-800 h-90 cursor-pointer hover:shadow-2xl hover:scale-105 duration-300">
      <Link href={`card/${link}`}>
        <div className="w-full flex flex-col h-full justify-center items-center">
          <div className="flex items-center justify-center w-full h-40 p-3 m-3">
            <Carousel images={['/window.svg']} size={'200px'} />
          </div>
          <div className="px-4 pb-4 w-full flex flex-1 items-start flex-col rounded-b-2xl border-t border-t-gray-800">
            <h3 className="text-center font-bold text-lg">{title}</h3>

            <p className="text-center text-sm">기간</p>
            <div className="relative w-full overflow-hidden ">
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
              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-white to-transparent dark:from-gray-900" />
            </div>
            <p className="text-center text-sm">{description}</p>

            <div className="flex justify-end w-full">
              <a href={githubLink}>
                <Github />
              </a>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
