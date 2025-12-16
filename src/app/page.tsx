'use client';

import HeroSection from '@/components/hero/HeroSection';
import ProjectSection from '@/components/project/ProjectSection';
import { useKeepScroll } from '@/hooks/useKeepScroll';

export default function Home() {
  useKeepScroll({ key: 'home-scroll' });
  return (
    <main className="mx-6">
      <HeroSection />
      <ProjectSection />
    </main>
  );
}
