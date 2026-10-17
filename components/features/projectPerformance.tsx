import type { CaseStudy } from "@/content/projects/caseStudies";

type ProjectPerformanceProps = {
  performance: CaseStudy["performance"];
};

const border = "border-neutral-300 dark:border-neutral-800";
const primaryText = "text-neutral-950 dark:text-neutral-100";
const secondaryText = "text-neutral-700 dark:text-neutral-300";

export function ProjectPerformance({
  performance,
}: ProjectPerformanceProps) {
  if (!performance) return null;

  return (
    <section className={`min-w-0 border-t ${border} py-8 sm:py-12`}>
      <header className="mb-8">
        <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.12em] ${secondaryText}`}>
          Measurements
        </p>

        <h3 className={`text-2xl font-semibold tracking-tight sm:text-3xl ${primaryText}`}>
          {performance.title}
        </h3>

        <p className={`mt-4 max-w-3xl text-base leading-7 ${secondaryText}`}>
          {performance.description}
        </p>
      </header>

      <div className={`grid min-w-0 grid-cols-1 border-l border-t ${border} sm:grid-cols-2 lg:grid-cols-3`}>
        {performance.metrics.map((metric) => (
          <article
            key={metric.label}
            className={`flex min-w-0 flex-col border-b border-r ${border} p-5 sm:p-6`}
          >
            <p className={`text-sm font-medium leading-6 ${secondaryText}`}>
              {metric.label}
            </p>

            <p className={`mt-4 break-words text-2xl font-semibold tracking-tight sm:text-3xl ${primaryText}`}>
              {metric.value}
            </p>

            {metric.detail && (
              <p className={`mt-3 text-sm leading-6 ${secondaryText}`}>
                {metric.detail}
              </p>
            )}
          </article>
        ))}
      </div>

      {performance.benchmarks && performance.benchmarks.length > 0 && (
        <div className="mt-10 min-w-0">
          <h4 className={`mb-4 text-lg font-semibold ${primaryText}`}>
            Results by concurrency
          </h4>

          <div
            className={`w-full min-w-0 overflow-x-auto border ${border}`}
            tabIndex={0}
            role="region"
            aria-label="Performance benchmark results; scroll horizontally to view all columns"
          >
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead className="bg-neutral-100 dark:bg-neutral-900">
                <tr>
                  {[
                    "Concurrency",
                    "Requests",
                    "Throughput",
                    "p50",
                    "p95",
                    "p99",
                    "Errors",
                  ].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className={`whitespace-nowrap border-b border-r ${border} px-4 py-4 text-sm font-semibold last:border-r-0`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {performance.benchmarks.map((row) => (
                  <tr
                    key={row.concurrency}
                    className="transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
                  >
                    {[
                      row.concurrency,
                      row.requests,
                      row.throughput,
                      row.p50,
                      row.p95,
                      row.p99,
                      row.errors,
                    ].map((value, index) => (
                      <td
                        key={`${row.concurrency}-${index}`}
                        className={`whitespace-nowrap border-b border-r ${border} px-4 py-4 text-sm font-medium ${primaryText} last:border-r-0`}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className={`mt-5 max-w-4xl text-sm leading-7 ${secondaryText}`}>
        {performance.note}
      </p>
    </section>
  );
}