import { ThemeToggle } from "@/components/features/themeToggle";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

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
    </main>
  );
}