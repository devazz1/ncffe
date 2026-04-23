import type { LucideIcon } from "lucide-react";
import { GraduationCap, Heart, Salad, Star } from "lucide-react";

type StatItem = {
  icon: LucideIcon;
  value: string;
  label: string;
};

const STATS: StatItem[] = [
  {
    icon: GraduationCap,
    value: "10,000+",
    label: "Children Educated",
  },
  {
    icon: Salad,
    value: "10,000+",
    label: "Families Fed",
  },
  {
    icon: Heart,
    value: "2000+",
    label: "Livelihoods Supported",
  },
  {
    icon: Star,
    value: "5+",
    label: "Years of Service",
  },
];

export function ImpactStatsSection() {
  return (
    <section
      className="py-10 sm:py-12 lg:py-14"
      aria-labelledby="impact-stats-heading"
    >
      <div className="">
        <h2 id="impact-stats-heading" className="sr-only">
          Our impact at a glance
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {STATS.map(({ icon: Icon, value, label }) => (
            <article
              key={label}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FFF3E0]">
                <Icon
                  className="h-8 w-8 text-[#FF6D00]"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </div>
              <p className="mt-5 text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl">
                {value}
              </p>
              <p className="mt-1 text-sm leading-snug text-zinc-600 sm:text-base">
                {label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
