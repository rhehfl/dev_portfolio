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
    <div className="flex flex-wrap gap-3 mb-10">
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all bg-primary text-primary-foreground shadow-sm hover:brightness-110"
        >
          <ExternalLink size={16} /> Live Demo
        </a>
      )}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all bg-muted text-foreground border border-border hover:brightness-110"
        >
          <Github size={16} /> GitHub
        </a>
      )}
      {blog && (
        <a
          href={blog}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all bg-primary text-primary-foreground shadow-sm hover:brightness-110"
        >
          <BookOpen size={16} /> Dev Log
        </a>
      )}
    </div>
  );
}
