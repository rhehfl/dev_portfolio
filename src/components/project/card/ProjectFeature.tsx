import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FeatureItem {
  title: string;
  description: string;
  mediaSrc: string; // 이미지나 비디오 경로 공통 사용
  isVideo?: boolean; // 비디오 여부 체크
}

interface ProjectFeatureProps {
  features: FeatureItem[];
}

export default function ProjectFeature({ features }: ProjectFeatureProps) {
  return (
    // type="single" collapsible: 하나만 열리고, 다시 누르면 닫히는 옵션
    <Accordion
      type="single"
      collapsible
      className="w-full mb-10 border rounded-xl bg-white dark:bg-gray-800 shadow-sm"
    >
      {/* value는 고유 식별자입니다. 하나만 쓸 거라 고정값 item-1 사용 */}
      <AccordionItem value="item-1" className="border-b-0 px-6">
        <AccordionTrigger className="hover:no-underline py-6">
          <div className="flex items-center gap-3 text-left">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                🖥️ 서비스 주요 기능 미리보기
                <span className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded-full">
                  {features.length}개
                </span>
              </h3>
              <p className="text-sm text-gray-500 font-normal mt-1">
                클릭하여 실제 구동 화면과 핵심 로직을 확인해보세요.
              </p>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="pt-2 pb-6 border-t border-gray-100 dark:border-gray-700 mt-2">
          <div className="grid gap-8 md:grid-cols-2 pt-4">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col gap-3 group">
                {/* 미디어 영역 (호버 시 약간 확대 효과) */}
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm">
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
                    <img
                      src={feature.mediaSrc}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>

                {/* 텍스트 영역 */}
                <div>
                  <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs">
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
