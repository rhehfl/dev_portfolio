import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AchievementItem {
  title: string;
  icon?: React.ReactNode;
  tag: string;
  points: string[];
}

interface Props {
  items: AchievementItem[];
}

export default function KeyAchievements({ items }: Props) {
  return (
    <section className="mb-16">
      <h3 className="text-2xl font-bold text-foreground mb-6 border-l-4 border-primary pl-3">
        핵심 기여 및 성과
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((section, idx) => (
          <Card
            key={idx}
            className="h-full border border-border hover:border-primary transition-colors shadow-sm"
          >
            <CardHeader className="pb-3 border-b border-border bg-muted rounded-t-xl">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                  {section.icon}
                  {section.title}
                </CardTitle>
                <Badge variant="secondary" className="font-medium">
                  {section.tag}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              <ul className="space-y-3">
                {section.points.map((point, pIdx) => (
                  <li
                    key={pIdx}
                    className="flex items-start gap-2.5 text-[15px] text-muted-foreground leading-relaxed"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: point }} />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
