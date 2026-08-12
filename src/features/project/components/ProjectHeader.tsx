import TechStack, {
  TechStackType,
} from "@/features/project/components/TechStack";

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
    <div className="mb-8 scroll-mt-24 border-b border-border pb-8 sm:mb-10 sm:scroll-mt-28">
      <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
        <TechStack stacks={techStack} />
      </div>

      <h2 className="mb-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>

      <p className="mb-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg break-keep">
        {description}
      </p>

      {(period || teamSize || role) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground sm:text-base">
          {period && (
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              {period}
            </span>
          )}
          {teamSize && (
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              {teamSize}
            </span>
          )}
          {role && (
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              {role}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
