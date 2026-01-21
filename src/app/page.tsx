'use client';

import AwardEducationSection from '@/components/awardEducation/AwardEducationSection';
import ExperienceSection from '@/components/experience/ExperienceSection';
import HeroSection from '@/components/hero/HeroSection';
import ProjectSection from '@/components/project/ProjectSection';

export default function Home() {
  return (
    <main className="mx-6">
      <HeroSection />
      <ProjectSection />
      <ExperienceSection />
      <AwardEducationSection />
    </main>
  );
}
