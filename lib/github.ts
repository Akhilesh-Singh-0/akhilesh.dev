import { cacheLife } from "next/cache";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;
export type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
};
export type Contributions = { total: number; weeks: ContributionDay[][] };

const LEVELS: Record<string, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

type ApiDay = {
  date: string;
  contributionCount: number;
  contributionLevel: string;
};
type ApiResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: { contributionDays: ApiDay[] }[];
        };
      };
    } | null;
  };
};

export async function getContributions(
  login: string,
): Promise<Contributions | null> {
  "use cache";

  const data = await load(login);
  if (!data) {
    cacheLife("minutes");
    return null;
  }

  cacheLife("hours");
  return data;
}

async function load(login: string): Promise<Contributions | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
    });
    if (!res.ok) return null;

    const json = (await res.json()) as ApiResponse;
    const calendar =
      json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    return {
      total: calendar.totalContributions,
      weeks: calendar.weeks.map((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: LEVELS[day.contributionLevel] ?? 0,
        })),
      ),
    };
  } catch {
    return null;
  }
}