import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  primary: "border-ink bg-ink text-bg hover:bg-bg hover:text-ink",
  secondary: "border-rule bg-transparent text-ink hover:border-ink",
  ghost:
    "border-transparent bg-transparent text-ink underline-offset-4 hover:underline",
} as const;

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
} as const;

type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  "aria-label"?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external,
  type = "button",
  disabled,
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap border font-medium transition-colors",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </a>
    ) : (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}