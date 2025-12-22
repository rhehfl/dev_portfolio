export interface TroubleShootingItem {
  title: string;
  problem: string | string[];
  recognition: string | string[];
  process: string | string[];
  result: string | string[];
  codeSnippet?: string;
}

export default function ProjectTroubleShooting({
  problem,
  recognition,
  process,
  result,
  codeSnippet,
  title,
}: TroubleShootingItem) {
  const renderContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-2 list-disc list-inside">
          {content.map((item, index) => (
            <li key={index} className="text-gray-800 dark:text-gray-200">
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <span className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
        {content}
      </span>
    );
  };

  return (
    <section>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4">
            {title}
          </h4>

          <div className="grid grid-cols-[80px_1fr] gap-y-8 gap-x-2 text-sm sm:text-base">
            <span className="font-bold text-gray-500 dark:text-gray-400">
              문제 발견
            </span>
            {renderContent(problem)}

            <span className="font-bold text-gray-500 dark:text-gray-400">
              문제 인식
            </span>
            {renderContent(recognition)}

            <span className="font-bold text-gray-500 dark:text-gray-400">
              해결 과정
            </span>
            {renderContent(process)}

            <span className="font-bold text-gray-500 dark:text-gray-400">
              결과
            </span>
            {renderContent(result)}
          </div>

          {codeSnippet && (
            <div className="mt-5 bg-[#282c34] rounded-lg p-4 overflow-x-auto custom-scrollbar">
              <pre className="text-sm font-mono text-gray-300 leading-relaxed">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
