import { About } from "@/components/sections/about";
import { GitHubActivity } from "@/components/sections/githubActivity";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";

export default function Page() {
  return (
    <main>
      <About />
      <Stack />
      <Projects />
      <GitHubActivity />
    </main>
  );
}