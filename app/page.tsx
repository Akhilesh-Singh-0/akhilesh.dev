import { ThemeToggle } from "@/components/features/themeToggle";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TechTag } from "@/components/features/techTag";

const tokens = ["bg", "surface", "ink", "rule", "ok", "fail"] as const;

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

      <Section id="about" title="About">
        <p>
          I build <strong>backend systems</strong> and <em>think hard</em> about
          how they break when real users show up.
        </p>
      </Section>

      <Section id="colors" title="Colors">
        <ul className="grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-3">
          {tokens.map((t) => (
            <li key={t} className="bg-bg p-3">
              <div
                className="h-10 border border-rule"
                style={{ background: `var(--${t})` }}
              />
              <p className="mt-2 text-xs">--{t}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="buttons" title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
          <Button href="#about" variant="secondary">As a link</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section id="cards" title="Cards">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card
            title="Project name"
            meta={
              <span className="inline-flex items-center gap-1.5 text-ok">
                <span className="size-1.5 bg-ok" />
                Live
              </span>
            }
            footer={
              <>
                <Button size="sm" variant="secondary" href="#">Live</Button>
                <Button size="sm" variant="ghost" href="#">Code</Button>
              </>
            }
          >
            <p>One sentence about what this project does and why it exists.</p>
          </Card>

          <Card title="Another project" meta="In progress">
            <p>A shorter card with no footer, to check that heights line up.</p>
          </Card>
        </div>
      </Section>
      
      <Section id="tags" title="Tags">
        <div className="flex flex-wrap gap-2">
          <TechTag name="nodejs" />
          <TechTag name="express" />
          <TechTag name="postgres" />
          <TechTag name="redis" />
          <TechTag name="bullmq" />
          <TechTag name="typescript" />
          <TechTag name="nextjs" />
        </div>
      </Section>
    </main>
  );
}