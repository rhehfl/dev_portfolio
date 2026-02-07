// src/features/project/components/ProjectNavigation.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectCardData } from '@/features/project/contents/common/projectCardData';
export type ProjectDetailUrl =
  | 'coko'
  | 'p-pick'
  | 'doran-doran'
  | 'dev-portfolio';
interface ProjectNavigationProps {
  currentDetailUrl: ProjectDetailUrl;
}

export function ProjectNavigation({
  currentDetailUrl,
}: ProjectNavigationProps) {
  const currentIndex = ProjectCardData.findIndex(
    (p) => p.detailUrl === currentDetailUrl,
  );
  const dataLength = ProjectCardData.length;

  const prevIndex = (currentIndex - 1 + dataLength) % dataLength;
  const nextIndex = (currentIndex + 1) % dataLength;

  const prevProject = ProjectCardData[prevIndex];
  const nextProject = ProjectCardData[nextIndex];

  return (
    <footer className="flex flex-col sm:flex-row justify-between mt-16 pt-8 border-t gap-12 border-border">
      <Link
        href={`/card/${prevProject.detailUrl}`}
        className="flex-1 cursor-pointer"
        replace
      >
        <Button
          variant="ghost"
          className="w-full h-auto py-4 flex flex-col items-start gap-1 group hover:bg-muted"
        >
          <span className="flex items-center text-xs text-muted-foreground">
            <ChevronLeft className="w-3 h-3 mr-1 group-hover:-translate-x-1 transition-transform" />
            이전 프로젝트
          </span>
          <span className="text-base font-bold">{prevProject.title}</span>
        </Button>
      </Link>

      <Link
        href={`/card/${nextProject.detailUrl}`}
        className="flex-1 text-right cursor-pointer"
        replace
      >
        <Button
          variant="ghost"
          className="w-full h-auto py-4 flex flex-col items-end gap-1 group hover:bg-muted"
        >
          <span className="flex items-center text-xs text-muted-foreground">
            다음 프로젝트
            <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="text-base font-bold">{nextProject.title}</span>
        </Button>
      </Link>
    </footer>
  );
}
