import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";

export default function Page() {
  return (
    <main>
      <About />
      <Stack />
      <Projects />
    </main>
  );
}