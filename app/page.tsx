import { ThemeToggle } from "@/components/features/themeToggle";
import { Projects } from "@/components/sections/projects";

export default function Page() {
  return (
    <main>
      <div className="flex items-center justify-between border-b border-rule px-6 py-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Akhilesh Singh
          </h1>
          <p className="mt-1">Backend &amp; Systems Engineer</p>
        </div>
        <ThemeToggle />
      </div>

      <Projects />
    </main>
  );
}