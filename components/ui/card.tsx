import { cn } from "@/lib/cn";

type CardProps = {
  title: string;
  subtitle?: string;
  meta?: React.ReactNode;
  media?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function Card({
  title,
  subtitle,
  meta,
  media,
  children,
  footer,
  className,
}: CardProps) {
  return (
    <article
      className={cn("flex flex-col border border-rule bg-surface", className)}
    >
      {media ? <div className="border-b border-rule">{media}</div> : null}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <header>
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-medium tracking-tight">{title}</h3>
            {meta ? <div className="shrink-0 text-sm">{meta}</div> : null}
          </div>
          {subtitle ? <p className="mt-1 text-sm">{subtitle}</p> : null}
        </header>
        {children ? <div>{children}</div> : null}
        {footer ? <footer className="mt-auto pt-2">{footer}</footer> : null}
      </div>
    </article>
  );
}