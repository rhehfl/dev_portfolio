import ProjectCard from '@/features/project/components/ProjectCard';
import ExperienceSection from '@/features/experience/components/ExperienceSection';
import HeroSection from '@/features/hero/components/HeroSection';
import { ProjectCardData } from '@/features/project/contents/common/projectCardData';
import CredentialSection from '@/features/credential/components/CredentialsSection';

export default function Home() {
  const homeProjects = ProjectCardData.filter((project) => project.tier);

  return (
    <main className="mx-6">
      <HeroSection />
      <section className="grid grid-cols-12 gap-6" id="projects">
        <header className="col-span-10 col-start-2 mt-16 md:mt-24">
          <h2 className="text-3xl font-bold">
            <span className="text-primary" aria-hidden="true">
              ✦
            </span>{' '}
            Projects
          </h2>
        </header>
        <div className="col-span-12 grid grid-cols-1 gap-6 md:col-span-10 md:col-start-2 md:grid-cols-3 md:gap-8">
          {homeProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>
      <ExperienceSection />
      <CredentialSection />
    </main>
  );
}
