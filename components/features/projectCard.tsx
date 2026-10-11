import { LuArrowUpRight } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { TechTag } from "@/components/features/techTag";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { Project, ProjectStatus } from "@/types/content";

const statuses: Record<
  ProjectStatus,
  { label: string; text: string; dot: string }
> = {
  live: { label: "Live", text: "text-ok", dot: "bg-ok" },
  "in-progress": { label: "In progress", text: "text-wip", dot: "bg-wip" },
};

// Not clickable, so it's the only thing on the card that carries color.
function Status({ status }: { status: ProjectStatus }) {
  const { label, text, dot } = statuses[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-medium", text)}>
      <span className={cn("size-1.5", dot)} />
      {label}
    </span>
  );
}

// Renders any project. No per-project design: pass data, get a card.
export function ProjectCard({ project }: { project: Project }) {
  const { name, status, summary, stack, links } = project;
  const hasLinks = Boolean(links.live || links.repo);

  return (
    <Card
      title={name}
      meta={<Status status={status} />}
      footer={
        hasLinks ? (
          <>
            {links.live ? (
              <Button size="sm" href={links.live} external>
                Visit
                <LuArrowUpRight className="size-4" aria-hidden />
              </Button>
            ) : null}
            {links.repo ? (
              <Button size="sm" variant="secondary" href={links.repo} external>
                <SiGithub className="size-4" aria-hidden />
                GitHub
              </Button>
            ) : null}
          </>
        ) : undefined
      }
    >
      <p>{summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {stack.map((key) => (
          <li key={key}>
            <TechTag name={key} />
          </li>
        ))}
      </ul>
    </Card>
  );
}