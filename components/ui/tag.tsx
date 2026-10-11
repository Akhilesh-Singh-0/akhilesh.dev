import { cn } from "@/lib/cn";

type TagProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

export function Tag({ children, icon, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border border-rule px-2 py-0.5 text-xs font-medium",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}