import {} from '@/components/common/ImagePreloader';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import MarkDownWrapper from '@/components/common/MarkDownWrapper';
import ReadmeRenderer from '@/components/common/ReadmeRenderer';

interface ProjectFeatureProps {
  readmeContent: string;
}

export default function ProjectFeature({
  readmeContent,
  ...props
}: ProjectFeatureProps) {
  return (
    <Accordion
      {...props}
      type="single"
      collapsible
      className="w-full mb-10 border border-border rounded-xl bg-card text-foreground shadow-sm"
    >
      <AccordionItem value="item-1" className="border-b-0 px-6">
        <AccordionTrigger className="hover:no-underline py-6">
          <div className="flex items-center gap-3 text-left">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                🖥️ 프로젝트 소개(ReadMe)
              </h3>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="pt-2 pb-6 border-t border-border mt-2">
          <div className="w-full max-w-full min-w-0 overflow-hidden">
            <MarkDownWrapper>{readmeContent}</MarkDownWrapper>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
