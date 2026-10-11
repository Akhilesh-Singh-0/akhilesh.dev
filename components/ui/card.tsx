import { cn } from "@/lib/cn";

type CardProps = {
  title: string;
  meta?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function Card({ title, meta, children, footer, className }: CardProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-4 border border-rule bg-surface p-5",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-medium tracking-tight">{title}</h3>
        {meta ? <div className="shrink-0 text-sm">{meta}</div> : null}
      </header>
      {children ? <div>{children}</div> : null}
      {footer ? (
        <footer className="mt-auto flex flex-wrap items-center gap-2">
          {footer}
        </footer>
      ) : null}
    </article>
  );
}