import { FiExternalLink } from "react-icons/fi";
import { cn } from "@/lib/cn";
import type { Contributions, ContributionLevel } from "@/lib/github";

const levelClass: Record<ContributionLevel, string> = {
  0: "bg-rule",
  1: "bg-ink/25",
  2: "bg-ink/50",
  3: "bg-ink/75",
  4: "bg-ink",
};

const MOBILE_WEEKS = 26;

const parse = (iso: string) => new Date(`${iso}T00:00:00Z`);

const monthName = (iso: string) =>
  parse(iso).toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });

const longDate = (iso: string) =>
  parse(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

function monthLabels(weeks: Contributions["weeks"]) {
  const labels: (string | null)[] = weeks.map(() => null);
  let last = -10;

  weeks.forEach((week, i) => {
    const month = monthName(week[0].date);
    const previous = i === 0 ? null : monthName(weeks[i - 1][0].date);

    if (month !== previous && i - last >= 3) {
      labels[i] = month;
      last = i;
    }
  });

  return labels;
}

function tooltipPosition(i: number, total: number) {
  const mobileStart = total - MOBILE_WEEKS;

  if (i < 8) return "left-0";
  if (i >= total - 8) return "right-0";

  if (i >= mobileStart && i < mobileStart + 8) {
    return "max-sm:left-0 sm:left-1/2 sm:-translate-x-1/2";
  }

  return "left-1/2 -translate-x-1/2";
}

export function ContributionGraph({
  data,
  username,
  profileUrl,
}: {
  data: Contributions;
  username: string;
  profileUrl: string;
}) {
  const { total, weeks } = data;
  const labels = monthLabels(weeks);
  const totalText = total.toLocaleString("en-US");

  return (
    <div className="w-full">
      <div className="mb-8 flex justify-end">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit GitHub profile @${username}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-rule px-2.5 py-1 text-xs text-ink/60 transition-colors hover:border-ink/40 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          @{username}
          <FiExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </div>

      <div
        role="img"
        aria-label={`${totalText} contributions in the past 12 months`}
        className="flex gap-1"
      >
        {weeks.map((week, i) => {
          const padStart = i === 0 ? 7 - week.length : 0;
          const position = tooltipPosition(i, weeks.length);

          return (
            <div
              key={week[0].date}
              className={cn(
                "relative flex-1",
                i < weeks.length - MOBILE_WEEKS && "max-sm:hidden",
              )}
            >
              {labels[i] ? (
                <span className="absolute bottom-full mb-1.5 whitespace-nowrap text-xs">
                  {labels[i]}
                </span>
              ) : null}

              <div className="grid grid-rows-7 gap-1">
                {Array.from({ length: padStart }).map((_, k) => (
                  <div
                    key={`pad-${k}`}
                    className="aspect-square w-full"
                  />
                ))}

                {week.map((day) => (
                  <div
                    key={day.date}
                    className={cn(
                      "group/cell relative aspect-square w-full hover:ring-1 hover:ring-ink",
                      levelClass[day.level],
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none absolute bottom-full z-20 mb-1.5 whitespace-nowrap bg-ink px-2 py-1 text-xs font-medium text-bg opacity-0 transition-opacity duration-100 group-hover/cell:opacity-100",
                        position,
                      )}
                    >
                      {day.count} contribution
                      {day.count === 1 ? "" : "s"} on {longDate(day.date)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
        <p className="text-sm text-ink/70 sm:text-base">
          <strong className="text-ink">{totalText}</strong>{" "}
          contributions in the past 12 months
        </p>

        <div className="flex items-center gap-2 text-xs">
          <span>Less</span>

          {([0, 1, 2, 3, 4] as const).map((level) => (
            <span
              key={level}
              className={cn("size-3", levelClass[level])}
            />
          ))}

          <span>More</span>
        </div>
      </div>
    </div>
  );
}