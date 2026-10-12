import { LuArrowUpRight } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { ProjectImage } from "@/components/features/projectImage";
import { TechTag } from "@/components/features/techTag";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/cn";
import type { Project, ProjectStatus } from "@/types/content";

const MAX_TAGS = 4;

const statuses: Record<
  ProjectStatus,
  { label: string; text: string; dot: string }
> = {
  live: { label: "Live", text: "text-ok", dot: "bg-ok" },
  "in-progress": { label: "In progress", text: "text-wip", dot: "bg-wip" },
};

function Status({ status }: { status: ProjectStatus }) {
  const { label, text, dot } = statuses[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-medium", text)}>
      <span className={cn("size-1.5", dot)} />
      {label}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const { name, tagline, status, summary, stack, links, image } = project;
  const shown = stack.slice(0, MAX_TAGS);
  const extra = stack.length - shown.length;

  return (
    <Card
      title={name}
      subtitle={tagline}
      meta={<Status status={status} />}
      media={<ProjectImage src={image} alt={`${name} screenshot`} />}
      footer={
        <div className="grid grid-cols-2 gap-2">
          <Button
            href={links.live}
            external
            disabled={!links.live}
            className="w-full"
          >
            Visit
            <LuArrowUpRight className="size-4" aria-hidden />
          </Button>
          <Button
            variant="secondary"
            href={links.repo}
            external
            disabled={!links.repo}
            className="w-full"
          >
            <SiGithub className="size-4" aria-hidden />
            GitHub
          </Button>
        </div>
      }
    >
      <p className="line-clamp-3">{summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {shown.map((key) => (
          <li key={key}>
            <TechTag name={key} />
          </li>
        ))}
        {extra > 0 ? (
          <li>
            <Tag>+{extra}</Tag>
          </li>
        ) : null}
      </ul>
    </Card>
  );
}