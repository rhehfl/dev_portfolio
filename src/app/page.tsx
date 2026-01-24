'use client';

import ProjectCard from '@/features/project/components/ProjectCard';
import CredentialSection from '@/features/awardEducation/components/CredentialsSection';
import ExperienceSection from '@/features/experience/components/ExperienceSection';
import HeroSection from '@/features/hero/components/HeroSection';
import { ProjectCardData } from '@/features/project/contents/common/projectCardData';

export default function Home() {
  return (
    <main className="mx-6">
      <HeroSection />
      <section className="grid grid-cols-12 gap-6 auto-rows" id="projects">
        <header className="col-span-10 col-start-2 mt-30 ">
          <h2 className="text-3xl font-bold">__Project</h2>
        </header>
        <div className="grid grid-cols-1 col-span-12 md:col-span-10 md:col-start-2 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-28">
          {ProjectCardData.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>
      <ExperienceSection />
      <CredentialSection />
    </main>
  );
}
