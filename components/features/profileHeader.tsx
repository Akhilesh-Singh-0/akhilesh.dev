import { LocalTime } from "@/components/features/localTime";
import { Avatar } from "@/components/ui/avatar";

type ProfileHeaderProps = {
  name: string;
  role: string;
  headline: string;
  availability?: string;
  location: string;
  timeZone: string;
  avatar?: string;
  beaconUrl?: string;
};

export function ProfileHeader({
  name,
  role,
  headline,
  availability,
  location,
  timeZone,
  avatar,
  beaconUrl,
}: ProfileHeaderProps) {
  const parts = headline.split("Beacon");
  const hasBeaconLink = parts.length > 1 && Boolean(beaconUrl);

  return (
    <div className="flex min-w-0 items-center gap-5 px-6 pb-6 pt-8 sm:gap-6">
      <Avatar name={name} src={avatar} />

      <div className="min-w-0 flex-1">
        <h1 className="break-words text-3xl font-semibold tracking-tight sm:text-4xl">
          {name}
        </h1>

        <p className="mt-1">{role}</p>

        <p className="mt-3 break-words text-sm">
          {hasBeaconLink ? (
            <>
              {parts[0]}
              <span className="group relative inline">
                <a
                  href={beaconUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:opacity-70"
                  aria-describedby="beacon-tooltip"
                >
                Beacon
                </a>

                <span
                  id="beacon-tooltip"
                  role="tooltip"
                  className="invisible absolute bottom-full left-0 z-50 mb-2 w-64 max-w-[calc(100vw-3rem)] border border-rule bg-bg p-3 text-sm text-ink opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                >
                  <span className="block">
                    Open-source observability for AI systems. Follow execution
                    as it happens.
                  </span>
                </span>
              </span>
              {parts.slice(1).join("Beacon")}
            </>
          ) : (
            headline
          )}
        </p>

        <p className="mt-1 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span>{location}</span>
          <span aria-hidden="true">·</span>
          <LocalTime timeZone={timeZone} />

          {availability ? (
            <span className="inline-flex items-center gap-1.5 font-medium text-ok">
              <span className="size-1.5 shrink-0 bg-ok" aria-hidden="true" />
              {availability}
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}