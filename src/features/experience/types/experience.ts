export type ExperienceType =
  | 'work'
  | 'education'
  | 'award'
  | 'club'
  | 'study'
  | 'study-casual'
  | 'open-source';

export interface ExperienceItem {
  id: number | string;
  type: ExperienceType;
  period: string;
  title: string;
  company?: string;
  role: string;
  description: string;
  link?: string;
  index: number;
}
