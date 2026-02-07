import TechStack, {
  TechStackType,
} from '@/features/project/components/TechStack';

interface ProjectHeaderProps {
  title: string;
  description: string;
  techStack: TechStackType[];
  period?: string;
  teamSize?: string;
  role?: string;
}

export default function ProjectHeader({
  title,
  description,
  techStack,
  period,
  teamSize,
  role,
}: ProjectHeaderProps) {
  return (
    <div className="mb-8 scroll-mt-24 sm:scroll-mt-28">
      <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
        <TechStack stacks={techStack} />
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
        {title}
      </h2>

      <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed break-keep">
        {description}
      </p>

      {(period || teamSize || role) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:text-base text-muted-foreground border-b border-border pb-6 sm:pb-8">
          {period && (
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span>📅</span> {period}
            </span>
          )}
          {teamSize && (
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span>👥</span> {teamSize}
            </span>
          )}
          {role && (
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span>🛠</span> {role}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
