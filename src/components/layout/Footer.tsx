"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Mail, NotebookPen } from "lucide-react";

const pillClass =
  "inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

// h-screen 고정 레이아웃 라우트(로그인·에디터)에는 전역 푸터를 붙이지 않는다.
const HIDDEN_ROUTES = ["/login", "/blog/write", "/blog/edit"];

export default function Footer() {
  const pathname = usePathname();
  if (HIDDEN_ROUTES.some((route) => pathname.startsWith(route))) {
    return null;
  }

  return (
    <footer className="mt-16 border-t border-border md:mt-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-4 py-10 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Gu Doyoon. Frontend Engineer.
        </p>
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
          <a
            href="mailto:rhehfl418q@gmail.com?subject=[채용 문의]"
            className={pillClass}
          >
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
