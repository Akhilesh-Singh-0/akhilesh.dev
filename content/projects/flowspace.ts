import type { Project } from "@/types/content";

export const flowspace: Project = {
  slug: "flowspace",
  name: "FlowSpace",
  status: "live",
  image: "/projects/flowspace.png",
  tagline: "Real-time collaboration platform",
  summary:
    "A multi-tenant real-time collaboration platform with role-based access control and background job queues.",
    stack: ["nextjs", "express", "postgres", "redis", "typescript", "bullmq", "clerk", "turborepo"],
  links: { 
    live: "https://flowspace-web-sigma.vercel.app/sign-in",
    repo: "https://github.com/Akhilesh-Singh-0/flowspace" 
  },
};