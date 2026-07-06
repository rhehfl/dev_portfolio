import Link from 'next/link';
import { Github, Mail, NotebookPen } from 'lucide-react';

const pillClass =
  'inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-card px-3.5 py-1.5 text-xs font-bold shadow-hard-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

export default function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-dashed border-foreground/50">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-6 py-10 md:flex-row">
        <p className="text-sm font-semibold">여기까지 읽어주셔서 감사해요! 🙌</p>
        <nav className="flex flex-wrap gap-3" aria-label="푸터 링크">
          <a
            href="https://github.com/rhehfl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (새 탭)"
            className={pillClass}
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            GitHub
          </a>
          <a href="mailto:rhehfl418q@gmail.com?subject=[채용 문의]" className={pillClass}>
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            이메일
          </a>
          <Link href="/blog" className={pillClass}>
            <NotebookPen className="h-3.5 w-3.5" aria-hidden="true" />
            Blog
          </Link>
        </nav>
      </div>
    </footer>
  );
}
