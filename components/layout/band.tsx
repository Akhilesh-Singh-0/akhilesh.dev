import { cn } from "@/lib/cn";

type BandProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

export function Band({ children, className, innerClassName }: BandProps) {
  return (
    <div className={cn("border-b border-rule", className)}>
      <div
        className={cn(
          "mx-auto w-full max-w-2xl sm:border-x sm:border-rule",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}