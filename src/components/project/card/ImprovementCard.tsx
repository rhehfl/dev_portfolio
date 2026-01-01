import MarkDownWrapper from '@/components/common/MarkDownWrapper';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle2, TrendingUp, Wrench } from 'lucide-react';

interface MetricItem {
  name: string;
  before: string | number;
  after: string | number;
  rate?: string;
}

interface ImprovementItemProps {
  title: string;
  // readonly 추가
  problem: string;
  // readonly 추가
  solution: string | readonly string[];
  result: string;
  // readonly 추가
  metrics?: readonly MetricItem[];
}

export default function ImprovementCard({
  title,
  problem,
  solution,
  result,
  metrics,
}: ImprovementItemProps) {
  const renderContent = (content: string | readonly string[]) => {
    if (Array.isArray(content)) {
      return (
        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
          {content.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-muted-foreground"
            >
              <span className="mt-[0.6rem] w-1.5 h-1.5 rounded-full bg-muted-foreground/70 shrink-0" />
              <div className="flex">
                <MarkDownWrapper>{item}</MarkDownWrapper>
              </div>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p className="text-muted-foreground leading-relaxed">
        <MarkDownWrapper>{content as string}</MarkDownWrapper>
      </p>
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
        <div>
          <h5 className="font-bold text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            개선 배경
          </h5>
          {renderContent(problem)}
        </div>

        <div>
          <h5 className="font-bold text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            해결 방안
          </h5>
          {renderContent(solution)}
        </div>

        {/* 3. [조건부 렌더링] 수치 데이터가 있는 경우 (Metrics) */}
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

        {/* 4. 결과 및 배운 점 (Result) */}
        {/* 수치가 있으면 간단한 요약으로, 없으면 강조 박스로 보여줌 */}
        <div
          className={
            !hasMetrics
              ? 'bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-100 dark:border-green-800/30'
              : ''
          }
        >
          <h5
            className={`font-bold text-sm mb-2 flex items-center gap-2 ${
              !hasMetrics
                ? 'text-green-700 dark:text-green-400'
                : 'text-muted-foreground'
            }`}
          >
            {!hasMetrics ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            )}
            {!hasMetrics ? '최종 성과 및 회고' : '결과 요약'}
          </h5>
          <div
            className={!hasMetrics ? 'text-green-800 dark:text-green-200' : ''}
          >
            {renderContent(result)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
