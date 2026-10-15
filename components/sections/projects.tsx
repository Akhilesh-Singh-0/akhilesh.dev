import { ProjectCard } from "@/components/features/projectCard";
import { CardGrid } from "@/components/layout/cardGrid";
import { Section } from "@/components/layout/section";
import { projects } from "@/content/projects";

export function Projects() {
  return (
    <Section id="projects" title="Projects" raw>
      <CardGrid
        initial={4}
        moreLabel="Show all projects"
        lessLabel="Show fewer projects"
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </CardGrid>
    </Section>
  );
}