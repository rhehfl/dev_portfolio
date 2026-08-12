import { useInView, motion } from "framer-motion";
import { Briefcase, Github, Users, ExternalLink } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import type { ExperienceItem } from "@/features/experience/types/experience";

const getIcon = (type: string) => {
  switch (type) {
    case "work":
      return <Briefcase className="w-4 h-4" />;
    case "club":
      return <Users className="w-4 h-4" />;
    case "open-source":
      return <Github className="w-4 h-4" />;
    default:
      return <Briefcase className="w-4 h-4" />;
  }
};

interface ExperienceItemProps extends ExperienceItem {
  index: number;
}
export default function ExperienceItem({
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
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className="grid gap-4 border-t border-border py-7 first:border-t-0 first:pt-0 md:grid-cols-[180px_1fr] md:gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-start gap-3 md:block">
        <span className="text-xs font-semibold tracking-wide text-muted-foreground whitespace-nowrap">
          {period}
        </span>
        <span className="text-xs font-semibold text-primary md:mt-2 md:block">
          {role}
        </span>
      </div>

      <div className="relative">
        <div className="mb-3 flex items-center gap-2 text-muted-foreground">
          {getIcon(type)}
          <span className="text-sm">{company}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold tracking-tight md:text-2xl">
            {title}
          </h3>
          {link && (
            <Link
              href={link}
              rel="noopener noreferrer"
              className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
              aria-label={`${title} 자세히 보기`}
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          )}
        </div>
        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground md:text-base">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
