import type { Project } from "@/types/content";

export const nexus: Project = {
  slug: "nexus",
  name: "Nexus",
  status: "in-progress",
  tagline: "Real-time messaging system",
  summary:
    "A real-time messaging system built to explore connection state, ordering and consistency: every message is persisted before it is broadcast.",
    stack: ["typescript", "postgres", "prisma", "nextjs", "clerk", "turborepo"],
  links: { 
    repo: "https://github.com/Akhilesh-Singh-0/Nexus" 
  },
};