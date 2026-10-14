import { RiDoubleQuotesR } from "react-icons/ri";
import { Band } from "@/components/layout/band";
import { Divider } from "@/components/layout/divider";
import { quote } from "@/content/quote";

export function Quote() {
  return (
    <section aria-label="Quote">
      <Divider />
      <Band>
        <figure className="flex flex-col items-center px-6 py-14 text-center">
          <RiDoubleQuotesR className="size-10 text-ink/35" aria-hidden />
          <blockquote className="mt-6 max-w-xl font-hand text-3xl leading-snug sm:text-4xl">
            “{quote.text}”
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4 text-xs font-medium uppercase tracking-widest">
            <span aria-hidden className="h-px w-10 bg-rule" />
            {quote.author}
            <span aria-hidden className="h-px w-10 bg-rule" />
          </figcaption>
        </figure>
      </Band>
    </section>
  );
}