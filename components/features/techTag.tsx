import { Tag } from "@/components/ui/tag";
import { tech, type TechKey } from "@/lib/tech";

export function TechTag({ name }: { name: TechKey }) {
  const { label, icon: Icon, color } = tech[name];

  return (
    <Tag
      icon={
        Icon ? (
          <Icon
            className="size-3.5 shrink-0"
            style={color ? { color } : undefined}
            aria-hidden
          />
        ) : undefined
      }
    >
      {label}
    </Tag>
  );
}