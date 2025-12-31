import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { useInView, motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Trophy,
  Users,
  BookOpen,
  Coffee,
  Github,
} from 'lucide-react'; // 필요한 아이콘 추가 import
import { useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const getIcon = (type: string) => {
  switch (type) {
    case 'work':
      return <Briefcase className="w-4 h-4" />;
    case 'education':
      return <GraduationCap className="w-4 h-4" />;
    case 'award':
      return <Trophy className="w-4 h-4" />;
    case 'club':
      return <Users className="w-4 h-4" />;
    case 'study':
      return <BookOpen className="w-4 h-4" />;
    case 'study-casual':
      return <Coffee className="w-4 h-4" />;
    case 'open-source':
      return <Github className="w-4 h-4" />;
    default:
      return <Briefcase className="w-4 h-4" />;
  }
};
export type ExperienceType =
  | 'work'
  | 'education'
  | 'award'
  | 'club'
  | 'study'
  | 'study-casual'
  | 'open-source';

export interface ExperienceItemProps {
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
export default function ExperienceItem({
  id,
  description,
  period,
  role,
  title,
  type,
  company,
  link,
  index,
}: ExperienceItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col md:flex-row gap-4 md:gap-8 relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex-none md:basis-1/4 md:shrink-0 flex flex-row md:flex-col items-center md:items-end md:text-right gap-2 justify-start md:justify-start">
        <span className="text-sm font-semibold text-primary font-mono whitespace-nowrap">
          {period}
        </span>
        <Badge
          variant="secondary"
          className="hidden md:flex w-fit mt-1 opacity-80"
        >
          {role}
        </Badge>
      </div>

      <div className="flex-1 relative pl-6 md:pl-8 border-l border-border md:border-l-2  py-4">
        <div className="absolute left-[-5px] md:left-[-9px] top-0 md:top-[6px] w-[9px] h-[9px] md:w-[16px] md:h-[16px] rounded-full bg-background border-2 md:border-4 border-primary z-10 transition-transform duration-300 group-hover:scale-110" />

        <Card className="border-none shadow-none bg-transparent hover:bg-card/40 transition-colors duration-300 -mt-2">
          <CardHeader className="p-0 mb-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 md:p-2 bg-secondary/50 rounded-md text-foreground/80">
                {getIcon(type)}
              </div>
              <Badge
                variant="outline"
                className="md:hidden opacity-80 scale-90 origin-left"
              >
                {role}
              </Badge>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <CardTitle className="text-lg md:text-2xl font-bold flex flex-wrap items-center gap-x-2">
                {title}
                {company && (
                  <span className="text-sm md:text-lg font-normal text-muted-foreground block md:inline">
                    @ {company}
                  </span>
                )}
              </CardTitle>

              {/* Link가 존재할 경우 버튼 표시 (이전 데이터 연동 고려) */}
              {link && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-fit h-8 px-2 text-muted-foreground hover:text-primary"
                  asChild
                >
                  <Link href={link} target="_blank" rel="noopener noreferrer">
                    <span className="text-xs mr-1">View Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <CardDescription className="text-sm md:text-base leading-relaxed text-foreground/80 whitespace-pre-line">
              {description}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
