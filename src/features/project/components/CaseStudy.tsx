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
    <TrendingUp className="w-6 h-6 text-blue-500" />
  ) : (
    <Wrench className="w-5 h-5 text-gray-500" />
  );

  return (
    <CardHeader className="pb-4">
      <CardTitle className="text-xl font-bold flex items-center gap-2">
        {icon || DefaultIcon}
        {children}
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
  dotColor = 'bg-gray-400',
  children,
  className,
}: SectionProps) => {
  return (
    <div className={cn('text-muted-foreground', className)}>
      <h5 className="font-bold text-lg mb-2 flex items-center gap-2 text-foreground/80">
        <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColor)} />
        {title}
      </h5>
      <div className="flex flex-col gap-3 leading-relaxed">{children}</div>
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
  <figure className="flex flex-col overflow-hidden my-2 ">
    <div className="flex py-4 px-2">
      <PhotoDetailLink photoId={encodeURIComponent(src)}>
        <Image
          src={src}
          alt={alt || 'reference image'}
          width={width}
          height={height}
          {...props}
        />
      </PhotoDetailLink>
    </div>
    {caption && (
      <figcaption className="p-3 text-xs sm:text-sm text-muted-foreground border-t border-border/50 ">
        <MarkDownWrapper>{caption}</MarkDownWrapper>
      </figcaption>
    )}
  </figure>
);

const Metrics = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-secondary/30 rounded-lg p-4 border border-border/50">
    <h5 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
      📊 주요 성과 지표
    </h5>
    <div className="space-y-3">{children}</div>
  </div>
);

interface MetricItemProps {
  name: string;
  before: string | number;
  after: string | number;
  rate?: string;
}
const MetricItem = ({ name, before, after, rate }: MetricItemProps) => (
  <div className="flex items-center justify-between text-sm sm:text-base bg-background/50 p-2 rounded-md shadow-sm">
    <span className="font-semibold text-muted-foreground w-20 sm:w-40">
      {name}
    </span>
    <div className="flex items-center gap-2 flex-1 justify-end">
      <span className="text-muted-foreground line-through decoration-red-400 decoration-2 opacity-70">
        {before}
      </span>
      <ArrowRight className="w-4 h-4 text-muted-foreground/50" />
      <span className="font-bold text-blue-600 dark:text-blue-400">
        {after}
      </span>
      {rate && (
        <Badge
          variant="outline"
          className="ml-2 border-blue-200 text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 hidden sm:inline-flex"
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
      <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-100 dark:border-green-800/30 text-green-800 dark:text-green-200">
        <h5 className="font-bold text-sm mb-2 flex items-center gap-2 text-green-700 dark:text-green-400">
          <CheckCircle2 className="w-4 h-4" />
          최종 성과 및 회고
        </h5>
        <div className="leading-relaxed break-keep">{children}</div>
      </div>
    );
  }

  return (
    <Section title="결과 요약" dotColor="bg-green-400">
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
    <>
      <MarkDownWrapper>{`\`\`\`${language}
      ${children}
      `}</MarkDownWrapper>
    </>
  );
};

function CaseStudyRoot({ children, className }: RootProps) {
  return (
    <Card
      className={cn(
        'h-full border border-border/60 shadow-sm hover:shadow-md transition-all duration-300',
        className,
      )}
    >
      {children}
    </Card>
  );
}
const Markdown = ({ children }: { children: string }) => (
  <MarkDownWrapper>{children}</MarkDownWrapper>
);

function ContentWrapper({ children }: { children: React.ReactNode }) {
  return <CardContent className="space-y-6">{children}</CardContent>;
}

const CaseStudy = Object.assign(CaseStudyRoot, {
  Header,
  Body: ContentWrapper, // CardContent 역할
  Section,
  Figure, // 이미지를 예쁘게 넣고 싶을 때 사용
  Metrics,
  MetricItem,
  Result,
  Code,
  Markdown,
});

export default CaseStudy;
