import { CircleCheck } from "lucide-react";

import type { BodyHowWeWorkStep } from "@/lib/types";

type CategoryHowWeWorkSectionProps = {
  steps: ReadonlyArray<BodyHowWeWorkStep>;
};

export function CategoryHowWeWorkSection({ steps }: CategoryHowWeWorkSectionProps) {
  return (
    <section className="mt-6" aria-labelledby="how-we-work-heading">
      <h2
        id="how-we-work-heading"
        className="text-lg font-medium tracking-tight"
      >
        How we work
      </h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {steps.map((step, index) => (
          <article
            key={`${step.title}-${index}`}
            className="flex flex-col gap-3 rounded-[25px] border border-[#e8e9ea] bg-white p-4"
          >
            <CircleCheck
              className="size-8.75 shrink-0 [&_circle]:fill-[#FF847C] [&_circle]:stroke-white [&_path]:fill-none [&_path]:stroke-white"
              strokeWidth={2}
              aria-hidden
            />
            <div className="flex min-w-0 flex-col gap-1.5">
              <h3 className="text-base font-medium leading-snug text-black">
                {step.title}
              </h3>
              <p className="text-xs leading-relaxed text-[#767676]">
                {step.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
