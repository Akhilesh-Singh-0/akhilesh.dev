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
};

export function ProfileHeader({
  name,
  role,
  headline,
  availability,
  location,
  timeZone,
  avatar,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-5 px-6 pb-6 pt-8 sm:gap-6">
      <Avatar name={name} src={avatar} />
      <div className="min-w-0">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {name}
        </h1>
        <p className="mt-1">{role}</p>
        <p className="mt-3 text-sm">{headline}</p>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span>{location}</span>
          <span aria-hidden>·</span>
          <LocalTime timeZone={timeZone} />
          {availability ? (
            <span className="inline-flex items-center gap-1.5 font-medium text-ok">
              <span className="size-1.5 bg-ok" />
              {availability}
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}