'use client';

import AwardEducationSection from '@/components/awardEducation/AwardEducationSection';
import ExperienceSection from '@/components/experience/ExperienceSection';
import HeroSection from '@/components/hero/HeroSection';
import ProjectSection from '@/components/project/ProjectSection';
import { useScrollRestoration } from '@/hooks/useKeepScroll';

export default function Home() {
  useScrollRestoration();
  return (
    <main className="mx-6">
      <HeroSection />
      <ProjectSection />
      <ExperienceSection />
      <AwardEducationSection />
    </main>
  );
}
