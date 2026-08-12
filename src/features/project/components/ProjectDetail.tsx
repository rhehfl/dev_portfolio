"use client";

import React from "react";
import MarkDownWrapper from "@/components/common/MarkDownWrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  TrendingUp,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import PhotoDetailLink from "@/components/common/PhotoDetailLink";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeaderProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  hasMetrics?: boolean;
  link?: string;
}

const Header = ({ children, icon, hasMetrics, link }: HeaderProps) => {
  const DefaultIcon = hasMetrics ? (
    <TrendingUp className="w-6 h-6 text-primary" />
  ) : (
    <Wrench className="w-5 h-5 text-muted-foreground" />
  );

  return (
    <CardHeader className="flex justify-between border-b border-border bg-muted/60 py-5">
      <CardTitle className="text-xl  sm:text-2xl font-extrabold flex items-center gap-3 tracking-tight">
        <span className="shrink-0">{icon || DefaultIcon}</span>
        <span className="text-foreground">{children}</span>
      </CardTitle>
      {link && (
        <Button
          asChild
          variant="ghost"
          className="relative h-10 px-6 bg-card backdrop-blur-sm border border-border shadow-sm hover:bg-muted"
        >
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <span className="text-sm text-foreground tracking-tight">
              자세히 보기
            </span>
            <div className="relative">
              <ExternalLink className="w-4 h-4" />
            </div>
          </Link>
        </Button>
      )}
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
  dotColor = "bg-muted-foreground",
  children,
  className,
}: SectionProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      <h5 className="font-bold text-base sm:text-lg flex items-center gap-2.5 text-foreground leading-none">
        <span
          className={cn("w-1.5 h-4 rounded-full shrink-0 shadow-sm", dotColor)}
        />
        {title}
      </h5>
      <div className="pl-4 flex flex-col gap-3 text-sm sm:text-base leading-relaxed text-muted-foreground break-keep">
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
  <figure
    className={cn(
      "my-6 flex flex-col overflow-hidden rounded-xl border border-border bg-muted shadow-sm",
      className,
    )}
  >
    <div className="flex py-6 px-4 bg-card">
      <PhotoDetailLink
        photoId={encodeURIComponent(src)}
        className="cursor-zoom-in transition-transform hover:scale-[1.01]"
      >
        <Image
          src={src}
          alt={alt || "reference image"}
          width={width}
          height={height}
          className="rounded-md object-contain shadow-md"
          {...props}
        />
      </PhotoDetailLink>
    </div>
    {caption && (
      <figcaption className="p-4 text-xs sm:text-sm text-muted-foreground bg-muted border-t border-border">
        <MarkDownWrapper>{caption}</MarkDownWrapper>
      </figcaption>
    )}
  </figure>
);

const Metrics = ({ children }: { children: React.ReactNode }) => (
  <div className="my-2 rounded-xl border border-primary/15 bg-primary-soft/50 p-5">
    <h5 className="mb-4 flex items-center gap-2 text-sm font-bold text-primary">
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
  <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40">
    <span className="font-semibold text-muted-foreground text-xs sm:text-sm flex-shrink-0">
      {name}
    </span>
    <div className="flex items-center gap-3 flex-1 justify-end min-w-0">
      <span className="text-muted-foreground line-through decoration-muted-foreground decoration-1 text-xs sm:text-sm truncate opacity-70">
        {before}
      </span>
      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 opacity-70" />
      <span className="font-bold text-foreground text-sm sm:text-base whitespace-nowrap">
        {after}
      </span>
      {rate && (
        <Badge
          variant="secondary"
          className="ml-1 px-1.5 py-0 text-foreground font-bold shrink-0"
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
  language = "tsx",
}: {
  children: string;
  language?: string;
}) => {
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-border shadow-sm flex">
      <MarkDownWrapper>{`\`\`\`${language}\n${children}\n\`\`\``}</MarkDownWrapper>
    </div>
  );
};

function ProjectDetailRoot({ children, className }: RootProps) {
  return (
    <Card
      className={cn(
        "h-full overflow-hidden border border-border p-0 transition-colors duration-300 hover:border-primary/40",
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
    <CardContent className="space-y-8 px-5 py-7 sm:px-8 sm:py-8">
      {children}
    </CardContent>
  );
}
interface BlogLinkProps {
  title: string;
  description?: string;
  href: string;
}

const BlogLink = ({ title, description, href }: BlogLinkProps) => {
  return (
    <div className="mt-8">
      <Link href={href} className="group block">
        <div className="flex items-center justify-between p-5 rounded-xl border border-border bg-muted hover:border-primary transition-all duration-300">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Related Post
              </span>
            </div>
            <h6 className="font-bold text-base group-hover:underline decoration-primary decoration-2 underline-offset-4 transition-colors line-clamp-1">
              {title}
            </h6>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                {description}
              </p>
            )}
          </div>
          <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </Link>
    </div>
  );
};
const ProjectDetail = Object.assign(ProjectDetailRoot, {
  Header,
  Body: ContentWrapper,
  Section,
  Figure,
  Metrics,
  MetricItem,
  Result,
  Code,
  Markdown,
  BlogLink,
});

export default ProjectDetail;
