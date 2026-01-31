import React from 'react';
import MarkDownWrapper from '@/components/common/MarkDownWrapper';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCircle2, TrendingUp, Wrench } from 'lucide-react';
import Image from 'next/image';
import PhotoDetailLink from '@/components/common/PhotoDetailLink';

interface HeaderProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  hasMetrics?: boolean;
}

const Header = ({ children, icon, hasMetrics }: HeaderProps) => {
  const DefaultIcon = hasMetrics ? (
    <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
  ) : (
    <Wrench className="w-5 h-5 text-slate-500" />
  );

  return (
    <CardHeader className="pb-6 border-b border-border/40 bg-slate-50/30 dark:bg-slate-900/10">
      <CardTitle className="text-xl sm:text-2xl font-extrabold flex items-center gap-3 tracking-tight">
        <span className="shrink-0">{icon || DefaultIcon}</span>
        <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          {children}
        </span>
      </CardTitle>
    </CardHeader>
  );
};

interface SectionProps {
  title: string;
  dotColor?: string;
  children: React.ReactNode;
  className?: string;
}

const Section = ({
  title,
  dotColor = 'bg-slate-400',
  children,
  className,
}: SectionProps) => {
  return (
    <div className={cn('space-y-3', className)}>
      <h5 className="font-bold text-base sm:text-lg flex items-center gap-2.5 text-foreground/90 leading-none">
        <span
          className={cn('w-1.5 h-4 rounded-full shrink-0 shadow-sm', dotColor)}
        />
        {title}
      </h5>
      <div className="pl-4 flex flex-col gap-3 text-sm sm:text-base leading-relaxed text-muted-foreground/90 break-keep">
        {children}
      </div>
    </div>
  );
};

interface FigureProps extends React.ComponentProps<typeof Image> {
  src: string;
  caption?: string;
}

const Figure = ({
  src,
  alt,
  caption,
  className,
  width = 400,
  height = 200,
  ...props
}: FigureProps) => (
  <figure className="flex flex-col overflow-hidden my-6 rounded-xl border border-border/60 bg-muted/20 shadow-sm">
    <div className="flex  py-6 px-4 bg-white dark:bg-slate-950/50">
      <PhotoDetailLink
        photoId={encodeURIComponent(src)}
        className="cursor-zoom-in transition-transform hover:scale-[1.01]"
      >
        <Image
          src={src}
          alt={alt || 'reference image'}
          width={width}
          height={height}
          className="rounded-md object-contain shadow-md"
          {...props}
        />
      </PhotoDetailLink>
    </div>
    {caption && (
      <figcaption className="p-4 text-xs sm:text-sm text-muted-foreground bg-slate-50/80 dark:bg-slate-900/50 border-t border-border/40">
        <MarkDownWrapper>{caption}</MarkDownWrapper>
      </figcaption>
    )}
  </figure>
);

const Metrics = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-50/40 dark:bg-blue-900/10 rounded-xl p-5 border border-blue-100/50 dark:border-blue-900/30 my-2 shadow-inner">
    <h5 className="font-bold text-sm text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
      <TrendingUp className="w-4 h-4" /> 주요 성과 지표
    </h5>
    <div className="grid gap-3">{children}</div>
  </div>
);

interface MetricItemProps {
  name: string;
  before: string | number;
  after: string | number;
  rate?: string;
}

const MetricItem = ({ name, before, after, rate }: MetricItemProps) => (
  <div className="flex items-center justify-between gap-4 bg-background/60 backdrop-blur-sm p-3 rounded-lg border border-border/40 shadow-sm transition-all hover:border-blue-200 dark:hover:border-blue-800">
    <span className="font-semibold text-slate-600 dark:text-slate-400 text-xs sm:text-sm flex-shrink-0">
      {name}
    </span>
    <div className="flex items-center gap-3 flex-1 justify-end min-w-0">
      <span className="text-slate-400 line-through decoration-slate-300 decoration-1 text-xs sm:text-sm truncate opacity-70">
        {before}
      </span>
      <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
      <span className="font-bold text-blue-600 dark:text-blue-400 text-sm sm:text-base whitespace-nowrap">
        {after}
      </span>
      {rate && (
        <Badge
          variant="secondary"
          className="ml-1 px-1.5 py-0 border-blue-100 text-blue-700 bg-blue-100/50 dark:bg-blue-900/30 dark:text-blue-300 font-bold shrink-0"
        >
          {rate}
        </Badge>
      )}
    </div>
  </div>
);

interface ResultProps {
  children: React.ReactNode;
  isHighlighted?: boolean;
}

const Result = ({ children, isHighlighted = false }: ResultProps) => {
  if (isHighlighted) {
    return (
      <div className="bg-emerald-50/40 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-900/30 text-emerald-900 dark:text-emerald-100 shadow-sm mt-4">
        <h5 className="font-bold text-base mb-3 flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="w-5 h-5" />
          최종 성과 및 회고
        </h5>
        <div className="leading-relaxed break-keep text-sm sm:text-[15px] font-medium opacity-90">
          {children}
        </div>
      </div>
    );
  }

  return (
    <Section title="결과 요약" dotColor="bg-emerald-500" className="mt-6">
      {children}
    </Section>
  );
};

interface RootProps {
  children: React.ReactNode;
  className?: string;
}

const Code = ({
  children,
  language = 'tsx',
}: {
  children: string;
  language?: string;
}) => {
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-border/40 shadow-sm flex">
      <MarkDownWrapper>{`\`\`\`${language}\n${children}\n\`\`\``}</MarkDownWrapper>
    </div>
  );
};

function CaseStudyRoot({ children, className }: RootProps) {
  return (
    <Card
      className={cn(
        'h-full border border-border/50 shadow-lg shadow-slate-200/40 dark:shadow-none overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-border/80',
        className,
      )}
    >
      {children}
    </Card>
  );
}

const Markdown = ({ children }: { children: string }) => (
  <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed">
    <MarkDownWrapper>{children}</MarkDownWrapper>
  </div>
);

function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CardContent className="space-y-8 py-8 px-5 sm:px-8">
      {children}
    </CardContent>
  );
}

const CaseStudy = Object.assign(CaseStudyRoot, {
  Header,
  Body: ContentWrapper,
  Section,
  Figure,
  Metrics,
  MetricItem,
  Result,
  Code,
  Markdown,
});

export default CaseStudy;
