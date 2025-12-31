import { Github, Home, Mail, School, UserRound } from 'lucide-react';
import Image from 'next/image';

export default function ProfileCard() {
  return (
    <article className="flex col-span-12 flex-col items-center md:items-start lg:items-start text-center lg:col-start-2 md:col-span-4 md:col-start-2 lg:col-span-4">
      <figure className="mt-11 ">
        <Image
          src="/globe.svg"
          alt="프론트엔드 개발자 구도윤 프로필 사진"
          className="rounded-full border-2 border-gray-300"
          width={240}
          height={240}
        />
      </figure>
      <ul className="flex flex-col gap-3 mt-15">
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
