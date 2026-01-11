import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CultureItem {
  title: string;
  tag?: string;
  points: string[];
}

interface Props {
  items: CultureItem[];
}

export default function TeamCulture({ items }: Props) {
  return (
    <section className="mb-16">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-green-500 pl-3">
        협업 문화 및 프로세스 구축
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((section, idx) => (
          <Card
            key={idx}
            className="h-full hover:border-green-500/50 transition-colors"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center mb-2">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  {section.title}
                </CardTitle>
                {section.tag && (
                  <Badge variant="secondary" className="text-xs font-normal">
                    {section.tag}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {section.points.map((point, pIdx) => (
                  <li
                    key={pIdx}
                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                    <span>{point}</span>
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
