import { ProfileHeader } from "@/components/features/profileHeader";
import { Band } from "@/components/layout/band";
import { Divider } from "@/components/layout/divider";
import { RichText } from "@/components/ui/richText";
import { about } from "@/content/about";
import { site } from "@/content/site";

export function About() {
  return (
    <section id="about" aria-label="About">
      <Divider />
      <Band>
        <ProfileHeader {...site} />
        <ul className="flex flex-col gap-3 px-6 pb-8">
          {about.bullets.map((text, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2.5 size-1.5 shrink-0 bg-ink" aria-hidden />
              <p>
                <RichText>{text}</RichText>
              </p>
            </li>
          ))}
        </ul>
      </Band>
    </section>
  );
}