import type { Project } from "@/types/content";
import { beacon } from "./beacon";
import { flowspace } from "./flowspace";
import { guardrail } from "./guardrail";
import { luminary } from "./luminary";
import { nexus } from "./nexus";
import { quizmon } from "./quizmon";

export const projects: Project[] = [
  beacon,
  guardrail,
  flowspace,
  quizmon,
  nexus,
  luminary,
];