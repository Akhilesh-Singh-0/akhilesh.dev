import { Banner } from "@/components/features/banner";
import { Band } from "@/components/layout/band";
import { site } from "@/content/site";

export function Hero() {
  return (
    <Band>
      {site.banner ? (
        <Banner dark={site.banner.dark} light={site.banner.light} />
      ) : (
        <div aria-hidden className="dots h-40 sm:h-52" />
      )}
    </Band>
  );
}