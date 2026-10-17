import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuArrowUpRight } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { ProjectArchitecture } from "@/components/features/projectArchitecture";
import { ProjectPerformance } from "@/components/features/projectPerformance";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/content/projects/caseStudies";
import { projects } from "@/content/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.name} — Project Case Study`,
    description: project.summary,
  };
}

const bodyText =
  "text-base leading-7 text-neutral-700 dark:text-neutral-300";

const secondaryText =
  "text-sm leading-6 text-neutral-700 dark:text-neutral-300";

function ProjectPageFallback() {
  return (
    <main
      className="w-full min-w-0 overflow-x-clip text-neutral-950 dark:text-neutral-100"
      aria-busy="true"
      aria-label="Loading project"
    >
      <Section id="project" title="Project">
        <div className="w-full min-w-0">
          <div className="h-5 w-28 animate-pulse bg-neutral-200 dark:bg-neutral-800" />
          <div className="mt-8 h-12 max-w-md animate-pulse bg-neutral-200 dark:bg-neutral-800" />
          <div className="mt-6 h-20 max-w-3xl animate-pulse bg-neutral-100 dark:bg-neutral-900" />
        </div>
      </Section>
    </main>
  );
}

async function ProjectPageContent({ params }: PageProps) {
  const { slug } = await params;

  const project = projects.find((item) => item.slug === slug);
  const study = caseStudies[slug];

  if (!project || !study) {
    notFound();
  }

  return (
    <main className="w-full min-w-0 overflow-x-clip text-neutral-950 dark:text-neutral-100">
      <Section id="project" title="Project">
        <div className="w-full min-w-0">
          <Link
            href="/#projects"
            className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-neutral-700 transition-colors hover:text-black dark:text-neutral-300 dark:hover:text-white"
          >
            <LuArrowLeft className="size-4 shrink-0" aria-hidden />
            All projects
          </Link>

          <div className="mt-8 min-w-0">
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {study.eyebrow}
            </p>

            <h1 className="mt-3 break-words text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {project.name}
            </h1>

            <p className={`mt-6 max-w-3xl break-words sm:text-lg ${bodyText}`}>
              {study.introduction}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.links.live && (
                <Button href={project.links.live} external>
                  Visit project
                  <LuArrowUpRight className="size-4" aria-hidden />
                </Button>
              )}

              {project.links.repo && (
                <Button
                  variant="secondary"
                  href={project.links.repo}
                  external
                >
                  <SiGithub className="size-4" aria-hidden />
                  Source code
                </Button>
              )}
            </div>
          </div>
        </div>
      </Section>

      {project.image && (
        <Section id="preview" title="Preview">
          <div className="w-full min-w-0">
            <div className="relative mx-auto aspect-video w-full min-w-0 overflow-hidden border border-neutral-300 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950">
              <Image
                src={project.image}
                alt={`${project.name} application preview`}
                fill
                priority
                sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1200px) 85vw, 1100px"
                className="object-contain"
              />
            </div>
          </div>
        </Section>
      )}

      <Section id="overview" title="Overview">
        <div className="grid min-w-0 gap-8 md:grid-cols-2 md:gap-12">
          <article className="min-w-0">
            <h3 className="text-xl font-semibold">The problem</h3>
            <p className={`mt-4 break-words ${bodyText}`}>
              {study.problem}
            </p>
          </article>

          <article className="min-w-0">
            <h3 className="text-xl font-semibold">The approach</h3>
            <p className={`mt-4 break-words ${bodyText}`}>
              {study.solution}
            </p>
          </article>
        </div>
      </Section>

      <Section id="architecture" title="Architecture">
        <div className="w-full min-w-0">
          <ProjectArchitecture slug={slug} />

          <p className={`mt-5 max-w-4xl break-words ${bodyText}`}>
            {study.architectureNote}
          </p>
        </div>
      </Section>

      <Section id="engineering" title="Engineering decisions">
        <div className="min-w-0 divide-y divide-neutral-300 border-y border-neutral-300 dark:divide-neutral-800 dark:border-neutral-800">
          {study.engineering.map((item, index) => (
            <article
              key={item.title}
              className="grid min-w-0 gap-3 py-6 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-6 sm:py-8"
            >
              <span className="text-sm font-medium tabular-nums text-neutral-700 dark:text-neutral-300">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h3 className="break-words text-lg font-semibold">
                  {item.title}
                </h3>

                <p className={`mt-3 max-w-3xl break-words ${bodyText}`}>
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {study.performance && (
        <Section id="performance" title="Performance">
          <ProjectPerformance performance={study.performance} />
        </Section>
      )}
    </main>
  );
}

export default function ProjectPage({ params }: PageProps) {
  return (
    <Suspense fallback={<ProjectPageFallback />}>
      <ProjectPageContent params={params} />
    </Suspense>
  );
}