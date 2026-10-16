import { ContributionGraph } from "@/components/features/contributionGraph";
import { Section } from "@/components/layout/section";
import { site } from "@/content/site";
import { getContributions } from "@/lib/github";

export async function GitHubActivity() {
  const data = await getContributions(site.github);

  return (
    <Section id="github" title="GitHub">
      {data ? (
        <ContributionGraph
          data={data}
          username={site.github}
          profileUrl={`https://github.com/${site.github}`}
        />
      ) : (
        <p>Activity couldn&apos;t be loaded right now.</p>
      )}
    </Section>
  );
}