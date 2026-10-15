import { About } from "@/components/sections/about";
import { Connect } from "@/components/sections/connect";
import { GitHubActivity } from "@/components/sections/githubActivity";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";
import { Quote } from "@/components/sections/quote";

export default function Page() {
  return (
    <main>
      <About />
      <Stack />
      <Projects />
      <GitHubActivity />
      <Connect />
      <Quote />
    </main>
  );
}