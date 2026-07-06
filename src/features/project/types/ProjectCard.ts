import { TechStackType } from '@/features/project/components/TechStack';

export type ProjectTier = 'featured' | 'sub' | 'mini';

export interface ProjectCard {
  title: string;
  description: string;
  previewImageUrl?: string;
  githubLink?: string;
  detailUrl?: string;
  techStack: TechStackType[];
  period: string;
  /** 홈 그리드 위계. 없으면 홈에 노출하지 않는다 (상세 페이지 라우팅은 유지). */
  tier?: ProjectTier;
  badge?: 'work';
  /** featured 카드의 성과 불릿 (2개 권장) */
  highlights?: string[];
}
