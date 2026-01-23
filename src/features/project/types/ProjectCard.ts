import { TechStackType } from '@/features/project/components/TechStack';

export interface ProjectCard {
  title: string;
  description: string;
  previewImageUrl: string;
  githubLink: string;
  detailUrl: string;
  techStack: TechStackType[];
  period: string;
}
