import { cn } from "@/lib/cn";

type MarqueeProps = {
  children: React.ReactNode;
  reverse?: boolean;
  seconds?: number;
  className?: string;
};

export function Marquee({
  children,
  reverse,
  seconds = 40,
  className,
}: MarqueeProps) {
  return (
    <div className={cn("marquee", className)}>
      <div
        className="marquee-track"
        data-reverse={reverse ? "true" : undefined}
        style={{ "--marquee-seconds": `${seconds}s` } as React.CSSProperties}
      >
        <div className="marquee-copy">{children}</div>
        <div className="marquee-copy" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}