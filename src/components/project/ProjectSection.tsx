import ProjectCard from '@/components/project/ProjectCard';
import { ProjectCardData } from '@/data/ProjectCardData';

export default function ProjectSection() {
  return (
    <section className="grid grid-cols-12 gap-6 auto-rows">
      <header className="col-span-10 col-start-2 mt-30 ">
        <h2 className="text-3xl font-bold">__프로젝트</h2>
      </header>
      <div className="grid grid-cols-1 col-span-12 md:col-span-10 md:col-start-2 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-28">
        {ProjectCardData.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
