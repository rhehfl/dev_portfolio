import { ExternalLink, Github, BookOpen } from "lucide-react";

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
    <div className="mb-10 flex flex-wrap gap-3">
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ExternalLink size={16} /> Live Demo
        </a>
      )}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Github size={16} /> GitHub
        </a>
      )}
      {blog && (
        <a
          href={blog}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <BookOpen size={16} /> Dev Log
        </a>
      )}
    </div>
  );
}
