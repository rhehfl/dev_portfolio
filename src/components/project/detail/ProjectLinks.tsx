import { ExternalLink, Github, BookOpen } from 'lucide-react';

interface ProjectLinksProps {
  demo?: string;
  github?: string;
  blog?: string;
}

export default function ProjectLinks({
  demo,
  github,
  blog,
}: ProjectLinksProps) {
  if (!demo && !github && !blog) return null;

  return (
    <div className="flex gap-3 mb-10">
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <ExternalLink size={16} /> Live Demo
        </a>
      )}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium transition-colors"
        >
          <Github size={16} /> GitHub
        </a>
      )}
      {blog && (
        <a
          href={blog}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          <BookOpen size={16} /> Dev Log
        </a>
      )}
    </div>
  );
}
