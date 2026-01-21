import {
  CASE_STUDY_THUMB_HEIGHT,
  CASE_STUDY_THUMB_WIDTH,
} from '@/components/common/PreloadHover';
import ZoomableImage from '@/components/common/ZoomableImage';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FeatureItem {
  title: string;
  description: string;
  mediaSrc: string;
  isVideo?: boolean;
}

interface ProjectFeatureProps {
  features: FeatureItem[];
  overview?: string;
  [key: string]: any;
}

export default function ProjectFeature({
  features,
  overview,
  ...props
}: ProjectFeatureProps) {
  return (
    <Accordion
      {...props}
      type="single"
      collapsible
      className="w-full mb-10 border rounded-xl bg-white dark:bg-gray-800 shadow-sm"
    >
      <AccordionItem value="item-1" className="border-b-0 px-6">
        <AccordionTrigger className="hover:no-underline py-6">
          <div className="flex items-center gap-3 text-left">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                🖥️ 서비스 소개 및 주요 기능
              </h3>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="pt-2 pb-6 border-t border-gray-100 dark:border-gray-700 mt-2">
          {overview && (
            <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                {overview}
              </p>
            </div>
          )}

          {/* 기능 목록 그리드 */}
          <div className="grid gap-8 md:grid-cols-2 pt-2">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col gap-3 group">
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm relative">
                  {feature.isVideo ? (
                    <video
                      src={feature.mediaSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <ZoomableImage
                      src={feature.mediaSrc}
                      alt={feature.title}
                      width={CASE_STUDY_THUMB_WIDTH}
                      height={CASE_STUDY_THUMB_HEIGHT}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs">
                      {idx + 1}
                    </span>
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 leading-relaxed pl-8">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
