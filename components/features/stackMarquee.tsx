import { Marquee } from "@/components/ui/marquee";
import { tech, type TechKey } from "@/lib/tech";

function Item({ name }: { name: TechKey }) {
  const { label, icon: Icon, color } = tech[name];
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap pr-10">
      {Icon ? (
        <Icon
          className="size-5 shrink-0"
          style={color ? { color } : undefined}
          aria-hidden
        />
      ) : null}
      <span className="font-medium">{label}</span>
    </span>
  );
}

export function StackMarquee({ rows }: { rows: TechKey[][] }) {
  return (
    <div className="flex flex-col gap-6">
      {rows.map((row, i) => (
        <Marquee key={i} reverse={i % 2 === 1} seconds={i % 2 === 1 ? 38 : 45}>
          {row.map((name) => (
            <Item key={name} name={name} />
          ))}
        </Marquee>
      ))}
    </div>
  );
}