import { cn } from "@/lib/cn";

type TooltipProps = {
  label: React.ReactNode;
  children: React.ReactNode;
  align?: "center" | "end";
  className?: string;
};

export function Tooltip({
  label,
  children,
  align = "center",
  className,
}: TooltipProps) {
  return (
    <span className={cn("group/tip relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute top-full z-30 mt-2 whitespace-nowrap bg-ink px-2 py-1 text-xs font-medium text-bg opacity-0 transition-opacity duration-100",
          "group-hover/tip:opacity-100 group-has-[:focus-visible]/tip:opacity-100",
          align === "end" ? "right-0" : "left-1/2 -translate-x-1/2",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute -top-1 size-2 rotate-45 bg-ink",
            align === "end" ? "right-3.5" : "left-1/2 -translate-x-1/2",
          )}
        />
        {label}
      </span>
    </span>
  );
}