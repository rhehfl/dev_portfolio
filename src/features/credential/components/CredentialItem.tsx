import { GraduationCap, Trophy, BadgeCheck, Presentation, ExternalLink } from 'lucide-react';
import type { CredentialItem } from '@/features/credential/types/CredentialItem';

const ICONS = {
  education: GraduationCap,
  certificate: BadgeCheck,
  award: Trophy,
  talk: Presentation,
} as const;

export default function CredentialItem({
  type,
  date,
  title,
  subtitle,
  link,
}: CredentialItem) {
  const Icon = ICONS[type] ?? BadgeCheck;

  const heading = link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-bold hover:underline decoration-primary decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {title}
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  ) : (
    <span className="font-bold">{title}</span>
  );

  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground/70" aria-hidden="true" />
      <div className="flex flex-col">
        <div className="flex flex-wrap items-baseline gap-x-2">
          {heading}
          <span className="text-xs font-mono text-muted-foreground">{date}</span>
        </div>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </li>
  );
}
