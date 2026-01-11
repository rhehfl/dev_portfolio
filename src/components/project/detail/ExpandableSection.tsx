import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react'; // 아이콘 import
import { ReactNode } from 'react';

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export default function ExpandableSection({
  title,
  children,
  className,
  defaultOpen = false,
}: ExpandableSectionProps) {
  return (
    <div className={cn('mb-6', className)}>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue={defaultOpen ? 'item-1' : undefined}
      >
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger
            className={cn(
              'hover:no-underline hover:text-red-500 py-4 group cursor-pointer',
              '[&>svg]:hidden',
              '[&[data-state=open]_.custom-chevron]:rotate-180'
            )}
          >
            <div className="flex items-center gap-2">
              <ChevronDown
                className={cn(
                  'chevron h-6 w-6 shrink-0 text-gray-400 transition-transform duration-200',
                  'group-hover:text-black-800' // 호버 시 색상 변경
                )}
              />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white   transition-colors group-hover:text-black-500 text-left">
                {title}
              </h3>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-8 flex flex-col gap-8 pl-11">
            {/* pl-11: 아이콘 너비만큼 들여쓰기하여 본문 정렬 (선택사항) */}
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
