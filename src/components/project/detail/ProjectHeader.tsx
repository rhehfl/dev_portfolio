interface ProjectHeaderProps {
  title: string;
  description: string;
  tags: string[];
  period?: string;
  teamSize?: string;
  role?: string;
}

export default function ProjectHeader({
  title,
  description,
  tags,
  period,
  teamSize,
  role,
}: ProjectHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        {description}
      </p>

      {(period || teamSize || role) && (
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-6">
          {period && <span>📅 {period}</span>}
          {teamSize && <span>👥 {teamSize}</span>}
          {role && <span>🛠 {role}</span>}
        </div>
      )}
    </div>
  );
}
