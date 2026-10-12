import type { TechKey } from "@/lib/tech";

export type ProjectStatus = "live" | "in-progress";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  summary: string;
  stack: TechKey[];
  links: { live?: string; repo?: string };
  image?: string;
};