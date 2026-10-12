import { cn } from "@/lib/cn";

type SectionProps = {
  id: string;
  title: string;
  flush?: boolean;
  children: React.ReactNode;
};

export function Section({ id, title, flush, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="border-b border-rule"
    >
      <h2
        id={`${id}-title`}
        className="border-b border-rule px-6 py-4 text-2xl font-medium tracking-tight"
      >
        {title}
      </h2>
      <div className={cn(flush ? "py-8" : "px-6 py-8")}>{children}</div>
    </section>
  );
}