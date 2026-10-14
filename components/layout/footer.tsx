import { Band } from "@/components/layout/band";
import { Divider } from "@/components/layout/divider";

export function Footer({ name }: { name: string }) {
  return (
    <footer className="flex flex-1 flex-col">
      <Divider />
      <Band>
        <p className="px-6 py-10 text-center text-sm">
          Designed and built by <strong>{name}</strong>.
        </p>
      </Band>
      <Divider />
      <div className="flex-1">
        <div className="mx-auto h-full min-h-10 w-full max-w-2xl sm:border-x sm:border-rule" />
      </div>
    </footer>
  );
}