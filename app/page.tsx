import { ThemeToggle } from "@/components/features/themeToggle";

const tokens = ["bg", "surface", "ink", "muted", "rule", "ok", "fail"] as const;

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Akhilesh Singh</h1>
        <ThemeToggle />
      </div>
      <p className="mt-2 text-muted">Backend &amp; Systems Engineer</p>

      <ul className="mt-10 grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-4">
        {tokens.map((t) => (
          <li key={t} className="bg-bg p-3">
            <div
              className="h-10 border border-rule"
              style={{ background: `var(--${t})` }}
            />
            <p className="mt-2 font-mono text-xs text-muted">--{t}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}