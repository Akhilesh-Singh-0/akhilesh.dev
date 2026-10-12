import type { Project } from "@/types/content";

export const beacon: Project = {
  slug: "beacon",
  name: "Beacon",
  status: "live",
  image: "/projects/beacon.png",
  tagline: "AI agent observability",
  summary:
    "Open-source observability for AI agents: it turns LLM and tool calls into a live graph, so stuck or failed runs are visible as they happen.",
    stack: ["typescript", "postgres", "redis", "bullmq", "nextjs", "prisma"],
  links: { 
    live: "https://beacon-web-mu.vercel.app",
    repo: "https://github.com/Akhilesh-Singh-0/Beacon" 
  },
};