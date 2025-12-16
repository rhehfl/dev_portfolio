import ProjectCard from '@/components/project/ProjectCard';

export default function ProjectSection() {
  return (
    <section className="grid grid-cols-12 gap-6 auto-rows">
      <div className="grid grid-cols-1 col-span-12 md:col-span-10 md:col-start-2 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-28">
        <ProjectCard />
        <ProjectCard />
      </div>
    </section>
  );
}
