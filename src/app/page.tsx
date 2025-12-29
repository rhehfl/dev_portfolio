'use client';

import HeroSection from '@/components/hero/HeroSection';
import ProjectSection from '@/components/project/ProjectSection';
import { useScrollRestoration } from '@/hooks/useKeepScroll';

export default function Home() {
  const { ref } = useScrollRestoration();
  return (
    <main className="mx-6">
      <HeroSection />
      <ProjectSection />
    </main>
  );
}
