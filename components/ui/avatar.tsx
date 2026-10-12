import Image from "next/image";
import { cn } from "@/lib/cn";

type AvatarProps = { name: string; src?: string; className?: string };

export function Avatar({ name, src, className }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className={cn(
        "group size-28 shrink-0 rounded-[12px] border border-rule bg-surface p-1.5 transition-colors hover:border-ink sm:size-32",
        className,
      )}
    >
      <div className="relative size-full overflow-hidden rounded-[8px] bg-bg">
        {src ? (
          <Image
            src={src}
            alt={name}
            fill
            sizes="128px"
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <span className="flex size-full items-center justify-center text-2xl font-semibold">
            {initials}
          </span>
        )}
      </div>
    </div>
  );
}