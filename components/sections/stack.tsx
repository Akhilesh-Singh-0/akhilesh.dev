import { StackMarquee } from "@/components/features/stackMarquee";
import { Section } from "@/components/layout/section";
import { stack } from "@/content/stack";

export function Stack() {
  return (
    <Section id="stack" title="Stack" flush>
      <StackMarquee rows={stack.rows} />
    </Section>
  );
}