import MarkDownWrapper from '@/components/common/MarkDownWrapper';
import ZoomableImage from '@/components/common/ZoomableImage';

export interface ImageWithDesc {
  type: 'image';
  src: string;
  alt?: string;
  desc?: string;
}

export type ContentItem = string | ImageWithDesc;

export interface TroubleShootingItem {
  title: string;
  problem: ContentItem | readonly ContentItem[];
  recognition: ContentItem | readonly ContentItem[];
  process: ContentItem | readonly ContentItem[];
  result: ContentItem | readonly ContentItem[];
  codeSnippet?: string;
}

export default function ProjectTroubleShooting({
  title,
  problem,
  recognition,
  process,
  result,
  codeSnippet,
}: TroubleShootingItem) {
  // 콘텐츠 렌더링 함수
  const renderContent = (content: ContentItem | readonly ContentItem[]) => {
    const items = Array.isArray(content) ? content : [content];

    if (items.length === 0) return null;

    return (
      <div className="flex flex-col gap-4 w-full">
        {items.map((item, index) => {
          if (typeof item === 'string') {
            return (
              <div
                key={index}
                className="text-gray-800 dark:text-gray-200 leading-relaxed"
              >
                <MarkDownWrapper>{item}</MarkDownWrapper>
              </div>
            );
          }

          return (
            <figure
              key={index}
              className="flex flex-col border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900/40 my-1"
            >
              <div className="flex justify-center bg-gray-100 dark:bg-black/20 py-4">
                <ZoomableImage
                  src={item.src}
                  alt={item.alt || 'troubleshooting reference'}
                  width={700}
                  height={500}
                  className=" object-contain shadow-sm rounded-md"
                  loading="lazy"
                />
              </div>

              {item.desc && (
                <figcaption className="p-3 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50">
                  <span className="inline-block align-top">
                    <MarkDownWrapper>{item.desc}</MarkDownWrapper>
                  </span>
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    );
  };

  return (
    <section>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <h4 className="text-lg font-bold text-red-600 dark:text-red-400 mb-6">
          {title}
        </h4>

        {/* 그리드 레이아웃: 라벨(왼쪽) - 콘텐츠(오른쪽) */}
        <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-y-6 gap-x-4 text-sm sm:text-base">
          <span className="font-bold text-gray-500 dark:text-gray-400 pt-1">
            상황
          </span>
          <div>{renderContent(problem)}</div>

          <span className="font-bold text-gray-500 dark:text-gray-400 pt-1">
            문제 인식
          </span>
          <div>{renderContent(recognition)}</div>

          <span className="font-bold text-gray-500 dark:text-gray-400 pt-1">
            해결 과정
          </span>
          <div>{renderContent(process)}</div>

          <span className="font-bold text-gray-500 dark:text-gray-400 pt-1">
            결과
          </span>
          <div>{renderContent(result)}</div>
        </div>

        {codeSnippet && (
          <div className="mt-8 bg-[#282c34] rounded-lg p-4 overflow-x-auto custom-scrollbar border border-gray-700/50 shadow-inner text-sm">
            <MarkDownWrapper>{codeSnippet.trim()}</MarkDownWrapper>
          </div>
        )}
      </div>
    </section>
  );
}
