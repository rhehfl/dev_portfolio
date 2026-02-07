import { Github, Mail, UserRound } from 'lucide-react';
import Image from 'next/image';

export default function ProfileCard() {
  return (
    <article className="flex col-span-12 flex-col items-center md:items-start lg:items-start text-center lg:col-start-2 md:col-span-4 md:col-start-2 lg:col-span-4 text-foreground">
      <figure className="mt-11 ">
        <Image
          src="/profile_image.jpg"
          preload
          alt="프론트엔드 개발자 구도윤 프로필 사진"
          className="border border-border rounded-full shadow-md"
          width={240}
          height={240}
        />
      </figure>
      <ul className="flex flex-col gap-3 mt-15">
        <li className="flex gap-5">
          <UserRound className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">
            <b>구도윤</b>
          </h2>
        </li>
        <li>
          <address className="not-italic flex gap-5 items-center text-muted-foreground">
            <Mail className="w-5 h-5" />
            <a
              href="mailto:rhehfl418q@gmail.com?subject=[채용 문의]"
              className="hover:text-primary transition-colors"
            >
              rhehfl418q@gmail.com
            </a>
          </address>
        </li>
        <li>
          <nav
            aria-label="Social Media Links"
            className="flex gap-5 items-center text-muted-foreground"
          >
            <Github className="w-5 h-5" />
            <a
              href="https://github.com/rhehfl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </nav>
        </li>
      </ul>
    </article>
  );
}
