import { Band } from "@/components/layout/band";
import { Divider } from "@/components/layout/divider";
import { cn } from "@/lib/cn";

type SectionProps = {
  id: string;
  title: string;
  flush?: boolean;
  bare?: boolean;
  raw?: boolean;
  children: React.ReactNode;
};

export function Section({ id, title, flush, bare, raw, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <Divider />
      <Band>
        <h2
          id={`${id}-title`}
          className="px-6 py-4 text-2xl font-medium tracking-tight"
        >
          {title}
        </h2>
      </Band>
      {raw ? (
        children
      ) : (
        <Band>
          <div className={cn(bare ? "" : flush ? "py-8" : "px-6 py-8")}>
            {children}
          </div>
        </Band>
      )}
    </section>
  );
}