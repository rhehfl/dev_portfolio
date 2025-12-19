import Carousel from '@/components/common/Carousel';
import { ProjectCard as ProjectCardType } from '@/types/ProjectCard';
import { Github } from 'lucide-react';

export default function ProjectCard({
  githubLink,
  title,
  description,
}: ProjectCardType) {
  return (
    <article className="flex flex-col rounded-2xl border border-gray-800 h-90 cursor-pointer hover:shadow-2xl hover:scale-105 duration-300">
      <div className="w-full flex flex-col h-full justify-center items-center">
        <div className="flex items-center justify-center w-full h-50 p-3 m-3">
          <Carousel images={['/window.svg']} size={'200px'} />
        </div>
        <div className="px-4 pb-4 w-full flex flex-1 items-start flex-col rounded-b-2xl border-t border-t-gray-800">
          <h3 className="text-center font-bold text-lg">{title}</h3>
          <p className="text-center text-sm">{description}</p>
          <p className="text-center text-sm">기간</p>
          <div className="flex ">
            <a href={githubLink}>
              <Github />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
