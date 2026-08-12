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
            SELECTED WORK
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            문제를 끝까지 좁혀 해결한 작업
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            사용자 경험의 병목과 운영 과정의 마찰을 발견하고, 구현과 검증까지
            책임진 프로젝트입니다.
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
