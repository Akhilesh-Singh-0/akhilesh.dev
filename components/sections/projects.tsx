import { ProjectCard } from "@/components/features/projectCard";
import { Section } from "@/components/layout/section";
import { projects } from "@/content/projects";

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}