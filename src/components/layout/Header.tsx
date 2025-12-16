'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="w-full flex py-9 justify-between px-10">
      <div>로고</div>
      <nav className="hidden md:flex">
        <ul className="flex space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
      <button
        className="md:hidden text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
          <Link href="#about" className="block py-2">
            About
          </Link>
          <Link href="#projects" className="block py-2">
            Projects
          </Link>
        </div>
      )}
    </header>
  );
}
