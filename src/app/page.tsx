import ProjectCard from "@/features/project/components/ProjectCard";
import ExperienceSection from "@/features/experience/components/ExperienceSection";
import HeroSection from "@/features/hero/components/HeroSection";
import { ProjectCardData } from "@/features/project/contents/common/projectCardData";
import CredentialSection from "@/features/credential/components/CredentialsSection";

export default function Home() {
  const homeProjects = ProjectCardData.filter(
    (project) => project.tier === "featured",
  );

  return (
    <main className="px-1 sm:px-4">
      <HeroSection />
      <section className="mx-auto mt-24 max-w-5xl md:mt-32" id="projects">
        <header className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-primary">
            PROJECTS
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            프로젝트
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            기획부터 구현, 개선까지 참여한 프로젝트를 소개합니다.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-5">
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
