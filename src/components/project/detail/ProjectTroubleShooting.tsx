export interface TroubleShootingItem {
  title: string;
  problem: string;
  solution: string;
  result: string;
  codeSnippet?: string;
}

interface ProjectTroubleShootingProps {
  items: TroubleShootingItem[];
}

export default function ProjectTroubleShooting({
  items,
}: ProjectTroubleShootingProps) {
  if (!items || items.length === 0) return null;

  return (
    <section>
      <div className="space-y-6">
        {items.map((ts, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4">
              {ts.title}
            </h4>

            <div className="grid grid-cols-[80px_1fr] gap-y-4 gap-x-2 text-sm sm:text-base">
              <span className="font-bold text-gray-500 dark:text-gray-400">
                Problem
              </span>
              <span className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                {ts.problem}
              </span>

              <span className="font-bold text-gray-500 dark:text-gray-400">
                Solution
              </span>
              <span className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                {ts.solution}
              </span>

              <span className="font-bold text-gray-500 dark:text-gray-400">
                Result
              </span>
              <span className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                {ts.result}
              </span>
            </div>

            {ts.codeSnippet && (
              <div className="mt-5 bg-[#282c34] rounded-lg p-4 overflow-x-auto custom-scrollbar">
                <pre className="text-sm font-mono text-gray-300 leading-relaxed">
                  <code>{ts.codeSnippet}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
