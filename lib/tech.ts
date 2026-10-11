import type { IconType } from "react-icons";
import {
  SiClerk,
  SiDocker,
  SiDrizzle,
  SiExpress,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiTurborepo,
  SiTypescript,
} from "react-icons/si";

export type Tech = {
  label: string;
  icon?: IconType;
  color?: string;
};

const defs = {
  nodejs: { label: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  express: { label: "Express", icon: SiExpress },
  postgres: { label: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  redis: { label: "Redis", icon: SiRedis, color: "#FF4438" },
  bullmq: { label: "BullMQ" },
  typescript: { label: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  javascript: { label: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  nextjs: { label: "Next.js", icon: SiNextdotjs },
  react: { label: "React", icon: SiReact, color: "#61DAFB" },
  tailwind: { label: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  docker: { label: "Docker", icon: SiDocker, color: "#2496ED" },
  python: { label: "Python", icon: SiPython, color: "#3776AB" },
  supabase: { label: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
  clerk: { label: "Clerk", icon: SiClerk, color: "#6C47FF" },
  turborepo: { label: "Turborepo", icon: SiTurborepo, color: "#FF1E56" },
  mongodb: { label: "MongoDB", icon: SiMongodb, color: "#47A248" },
  prisma: { label: "Prisma", icon: SiPrisma },
  drizzle: { label: "Drizzle", icon: SiDrizzle },
  git: { label: "Git", icon: SiGit, color: "#F03C2E" },
} satisfies Record<string, Tech>;

export type TechKey = keyof typeof defs;
export const tech: Record<TechKey, Tech> = defs;