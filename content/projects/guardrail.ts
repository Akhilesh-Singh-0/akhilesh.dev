import type { Project } from "@/types/content";

export const guardrail: Project = {
  slug: "guardrail",
  name: "Guardrail",
  status: "live",
  image: "/projects/guardrail.png",
  tagline: "AI cost enforcement proxy",
  summary:
    "A reverse proxy for the OpenAI API that enforces per-user cost limits, using atomic Redis Lua scripts so concurrent requests can't slip past a limit.",
    stack: ["redis", "postgres", "express", "typescript", "nextjs", "bullmq", "clerk", "turborepo"],
  links: { 
    live: "https://guardrail-web-mu.vercel.app",
    repo: "https://github.com/Akhilesh-Singh-0/guardrail" 
  },
};