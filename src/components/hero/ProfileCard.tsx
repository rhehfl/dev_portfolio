import { Github, Mail, UserRound } from 'lucide-react';
import Image from 'next/image';

export default function ProfileCard() {
  return (
    <article className="col-start-2 col-span-4">
      <h1 className="text-5xl font-bold">__Profile</h1>
      <figure className="mt-11 mb-5">
        <Image
          src="/globe.svg"
          alt="프론트엔드 개발자 구도윤 프로필 사진"
          className="rounded-full border-2 border-gray-300"
          width={240}
          height={240}
        />
      </figure>
      <ul className="flex flex-col gap-3">
        <li className="flex gap-5">
          <UserRound />
          <h2 className="text-xl">
            <b>구도윤</b>
          </h2>
        </li>
        <li>
          <address className="not-italic flex gap-5">
            <Mail />
            <a href="mailto:rhehfl418q@gmail.com?subject=[채용 문의]">
              rhehfl418q@gmail.com
            </a>
          </address>
        </li>
        <li>
          <nav aria-label="Social Media Links" className=" flex gap-5">
            <Github />
            <a
              href="https://github.com/rhehfl"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </nav>
        </li>
      </ul>
    </article>
  );
}
