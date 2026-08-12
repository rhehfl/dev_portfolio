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
        <header className="mb-8 flex items-end justify-between border-b border-foreground pb-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              PROJECTS
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              프로젝트
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-relaxed text-muted-foreground md:block">
            기획부터 구현, 개선까지 참여한 프로젝트입니다.
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
