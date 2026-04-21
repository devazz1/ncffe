import type { BodyImpactStat } from "@/lib/types";
import { Star } from "lucide-react";

type CategoryImpactSectionProps = {
  stats: ReadonlyArray<BodyImpactStat>;
};

/**
 * Renders `iconSvg` as trusted markup from your API/CMS.
 * Only pass sanitized SVG from known sources.
 */
export function CategoryImpactSection({ stats }: CategoryImpactSectionProps) {
  return (
    <section className="mt-6" aria-labelledby="campaign-impact-heading">
      <h2
        id="campaign-impact-heading"
        className="text-lg font-semibold tracking-tight text-[#FF0000]"
      >
        Impact
      </h2>
      <div className="mt-5 flex flex-col gap-6 md:flex-row md:gap-6">
        {stats.map((stat, index) => (
          <article
            key={`${stat.value}-${index}`}
            className="flex min-w-0 flex-1 flex-col gap-5 rounded-[25px] border border-[#e8e9ea] bg-white p-6"
          >
            <div className="flex size-[54px] shrink-0 items-center justify-center rounded-[13px] bg-[#ffedd8]">
              {stat.iconSvg ? (
                <span
                  className="flex size-6 items-center justify-center [&_svg]:block [&_svg]:max-h-full [&_svg]:max-w-full [&_svg]:shrink-0"
                  dangerouslySetInnerHTML={{ __html: stat.iconSvg }}
                  aria-hidden
                />
              ) : (
                <Star className="size-6 text-[#ffd9b3]" fill="#FF847C" />
              )}
            </div>
            <div className="flex min-w-0 flex-col gap-1.5">
              <p className="text-lg font-medium tabular-nums tracking-tight text-black">
                {stat.value}
              </p>
              <p className="text-xs leading-snug text-[#767676]">{stat.label}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
