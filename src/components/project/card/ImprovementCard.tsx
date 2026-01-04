import MarkDownWrapper from '@/components/common/MarkDownWrapper';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle2, TrendingUp, Wrench } from 'lucide-react';

// 1. 이미지+설명 객체 및 콘텐츠 타입 정의
export interface ImageWithDesc {
  type: 'image';
  src: string;
  alt?: string;
  desc?: string;
}

export type ContentItem = string | ImageWithDesc;

interface MetricItem {
  name: string;
  before: string | number;
  after: string | number;
  rate?: string;
}

export interface ImprovementItemProps {
  title: string;
  problem: ContentItem | readonly ContentItem[];
  solution: ContentItem | readonly ContentItem[];
  result: ContentItem | readonly ContentItem[];
  metrics?: readonly MetricItem[];
}

export default function ImprovementCard({
  title,
  problem,
  solution,
  result,
  metrics,
}: ImprovementItemProps) {
  const renderContent = (content: ContentItem | readonly ContentItem[]) => {
    const items = Array.isArray(content) ? content : [content];

    if (items.length === 0) return null;

    return (
      <div className="flex flex-col gap-3">
        {items.map((item, index) => {
          if (typeof item === 'string') {
            return (
              <div key={index} className="leading-relaxed break-keep">
                <MarkDownWrapper>{item}</MarkDownWrapper>
              </div>
            );
          }

          return (
            <figure
              key={index}
              className="flex flex-col border border-border/50 rounded-lg overflow-hidden bg-background/50 my-1 shadow-sm"
            >
              <div className="flex justify-center bg-secondary/20 py-3">
                <img
                  src={item.src}
                  alt={item.alt || 'improvement reference'}
                  className="max-h-[300px] object-contain rounded-sm"
                  loading="lazy"
                />
              </div>
              {item.desc && (
                <figcaption className="p-2 text-xs sm:text-sm text-muted-foreground border-t border-border/50 bg-background/80">
                  <MarkDownWrapper>{item.desc}</MarkDownWrapper>
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    );
  };

  const hasMetrics = metrics && metrics.length > 0;

  return (
    <Card className="h-full border border-border/60 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex flex-wrap gap-2 mb-3"></div>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          {hasMetrics ? (
            <TrendingUp className="w-6 h-6 text-blue-500" />
          ) : (
            <Wrench className="w-5 h-5 text-gray-500" />
          )}
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="text-muted-foreground">
          <h5 className="font-bold text-sm mb-2 flex items-center gap-2 text-foreground/80">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
            개선 배경
          </h5>
          {renderContent(problem)}
        </div>

        <div className="text-muted-foreground">
          <h5 className="font-bold text-sm mb-2 flex items-center gap-2 text-foreground/80">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
            해결 방안
          </h5>
          {renderContent(solution)}
        </div>

        {hasMetrics && (
          <div className="bg-secondary/30 rounded-lg p-4 border border-border/50">
            <h5 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
              📊 주요 성과 지표
            </h5>
            <div className="space-y-3">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm sm:text-base bg-background/50 p-2 rounded-md shadow-sm"
                >
                  <span className="font-semibold text-muted-foreground w-20 sm:w-24 truncate">
                    {m.name}
                  </span>
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <span className="text-muted-foreground line-through decoration-red-400 decoration-2 opacity-70">
                      {m.before}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/50" />
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {m.after}
                    </span>
                    {m.rate && (
                      <Badge
                        variant="outline"
                        className="ml-2 border-blue-200 text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 hidden sm:inline-flex"
                      >
                        {m.rate}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          className={
            !hasMetrics
              ? 'bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-100 dark:border-green-800/30 text-green-800 dark:text-green-200'
              : 'text-muted-foreground'
          }
        >
          <h5
            className={`font-bold text-sm mb-2 flex items-center gap-2 ${
              !hasMetrics
                ? 'text-green-700 dark:text-green-400'
                : 'text-foreground/80'
            }`}
          >
            {!hasMetrics ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
            )}
            {!hasMetrics ? '최종 성과 및 회고' : '결과 요약'}
          </h5>
          {renderContent(result)}
        </div>
      </CardContent>
    </Card>
  );
}
