import type { IconType } from "react-icons";
import { FaLinkedin } from "react-icons/fa6";
import { LuArrowUpRight, LuFileText } from "react-icons/lu";
import { SiGithub, SiGmail, SiX } from "react-icons/si";
import { Section } from "@/components/layout/section";
import { site, type SocialKey } from "@/content/site";
import { cn } from "@/lib/cn";

type Item = {
  label: string;
  href: string;
  icon: IconType;
  tile: string;
  external: boolean;
};

const NEUTRAL_TILE = "bg-surface text-ink";
const socialTiles: Record<SocialKey, { icon: IconType; tile: string }> = {
  github: { icon: SiGithub, tile: "bg-[#0d1117] text-white" },
  x: { icon: SiX, tile: "bg-black text-white" },
  linkedin: { icon: FaLinkedin, tile: "bg-[#0a66c2] text-white" },
};

function getItems(): Item[] {
  const items: Item[] = [
    {
      label: "Email",
      href: `mailto:${site.email}`,
      icon: SiGmail,
      tile: "bg-[#0d0d0d] text-[#ea4335]",
      external: false,
    },
    ...site.social.map(({ key, label, href }) => ({
      label,
      href,
      icon: socialTiles[key].icon,
      tile: socialTiles[key].tile,
      external: true,
    })),
  ];
  if (site.resume) {
    items.push({
      label: "Resume",
      href: site.resume,
      icon: LuFileText,
      tile: NEUTRAL_TILE,
      external: true,
    });
  }
  return items;
}

const COLUMNS = 3;

export function Connect() {
  const items = getItems();
  const lastRowSize = items.length % COLUMNS || COLUMNS;

  return (
    <Section id="connect" title="Connect" bare>
      <ul className="grid sm:grid-cols-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isLast = i === items.length - 1;
          const span =
            isLast && lastRowSize === 1
              ? "sm:col-span-3"
              : isLast && lastRowSize === 2
                ? "sm:col-span-2"
                : "";
          const inLastRow = i >= items.length - lastRowSize;
          const hasRightBorder = !span && i % COLUMNS < COLUMNS - 1;

          return (
            <li
              key={item.label}
              className={cn(
                "border-b border-rule last:border-b-0",
                inLastRow && "sm:border-b-0",
                hasRightBorder && "sm:border-r",
                span,
              )}
            >
              <a
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-surface focus-visible:outline-offset-[-3px]"
              >
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center border border-rule transition-transform duration-200 group-hover:border-ink motion-safe:group-hover:-translate-y-0.5",
                    item.tile,
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-medium">{item.label}</span>
                <LuArrowUpRight
                  className="ml-auto size-4 shrink-0 transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}