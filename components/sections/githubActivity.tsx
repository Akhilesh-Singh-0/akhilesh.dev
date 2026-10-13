import { SiGithub } from "react-icons/si";
import { ContributionGraph } from "@/components/features/contributionGraph";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { getContributions } from "@/lib/github";

export async function GitHubActivity() {
  const data = await getContributions(site.github);

  return (
    <Section id="github" title="GitHub">
      {data ? (
        <ContributionGraph data={data} />
      ) : (
        <p>Activity couldn&apos;t be loaded right now.</p>
      )}
      <div className="mt-6">
        <Button
          variant="secondary"
          href={`https://github.com/${site.github}`}
          external
        >
          <SiGithub className="size-4" aria-hidden />
          {site.github}
        </Button>
      </div>
    </Section>
  );
}