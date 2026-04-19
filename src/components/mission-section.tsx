import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const MISSION_CTA_HREF = "/about#vision-mission";

/** Figma body text ~ rgb(122,122,122) */
const BODY_MUTED = "text-[#7b7b7b]";

export function MissionSection() {
  return (
    <section
      className="bg-white py-10 lg:py-[7.96875rem]"
      aria-labelledby="mission-heading"
    >
      <div className="mx-auto max-w-[1920px] px-3 sm:px-6 lg:px-16">
        <div className="flex flex-col gap-0 lg:flex-row lg:items-center lg:justify-between lg:gap-x-12">
          <div className="order-2 flex min-w-0 flex-col gap-5 lg:order-1 lg:max-w-[891px] lg:flex-1 lg:gap-[60px]">
            <div className="flex flex-col gap-1">
              <h2
                id="mission-heading"
                className="text-xl font-bold leading-snug tracking-tight text-zinc-900 lg:text-[2.625rem] lg:leading-[1.2] xl:text-[2.75rem]"
              >
                <span className="text-zinc-900">One mission.</span>{" "}
                <span className="text-cta-from">Many lives changed:</span>
              </h2>
              <p
                className={`text-sm font-normal leading-normal ${BODY_MUTED} lg:text-2xl lg:leading-snug`}
              >
                ending hunger, empowering children, and building livelihoods.
              </p>
            </div>

            <div>
              <Link
                href={MISSION_CTA_HREF}
                className="inline-flex h-[46px] w-[243px] max-w-full items-center justify-between gap-3 rounded-[4px] bg-cta-gradient px-3 text-sm font-semibold text-white transition hover:opacity-95 lg:h-[68px] lg:w-[356px] lg:gap-3 lg:px-6 lg:text-lg lg:leading-9"
              >
                <span className="min-w-0 shrink text-left leading-6 lg:leading-9">
                  Join us on our Mission
                </span>
                <span
                  className="flex size-[30px] shrink-0 items-center justify-center"
                  aria-hidden
                >
                  <ChevronRight className="size-[1.5625rem] text-white" strokeWidth={2} />
                </span>
              </Link>
            </div>
          </div>

          <div className="order-1 w-full shrink-0 lg:order-2 lg:w-[467px] lg:max-w-none">
            <div
              className="relative aspect-336/324 w-full overflow-hidden rounded-[25px] border-2 border-white lg:aspect-auto lg:h-[451px] lg:rounded-[56px] lg:border-0"
            >
              <Image
                src="/ncf-img-kid-food-01.png"
                alt="A child smiling while sharing a meal, representing the foundation’s food and care programs."
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 467px"
                priority={false}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[25px] bg-black/20 lg:hidden"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
