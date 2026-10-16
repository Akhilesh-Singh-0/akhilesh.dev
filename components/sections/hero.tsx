import { Banner } from "@/components/features/banner";
import { Band } from "@/components/layout/band";
import { site } from "@/content/site";

// The band between the nav and the About section. Shows the banner image when
// one is set in content/site.ts, and a field of dots until then.
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