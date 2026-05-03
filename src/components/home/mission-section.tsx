import Image from "next/image";
import Link from "next/link";
import { CircleChevronRight } from "lucide-react";

const MISSION_CTA_HREF = "/about#vision-mission";

export function MissionSection() {
  return (
    <section
      className="bg-white py-6"
      aria-labelledby="mission-heading"
    >
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 md:px-12">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-x-12">
          <div className="order-2 flex min-w-0 flex-col gap-5 lg:order-1 lg:max-w-[891px] lg:flex-1 lg:gap-[60px]">
            <div className="flex flex-col gap-1">
              <h2
                id="mission-heading"
                className="text-base leading-snug tracking-tight lg:text-[2.625rem] lg:leading-[1.2] xl:text-[2.75rem]"
              >
                <span className="font-extralight text-zinc-900">One mission.</span>{" "}
                <span className="font-light text-cta-from">
                  Many lives changed:
                </span>
              </h2>
              <p
                className={`text-sm font-light leading-normal text-zinc-400 lg:text-3xl lg:leading-snug`}
              >
                ending hunger, empowering children, and building livelihoods.
              </p>
            </div>

            <div>
              <Link
                href={MISSION_CTA_HREF}
                className="group inline-flex h-12 w-60 items-center justify-between gap-2 rounded bg-cta-gradient px-4 text-sm font-medium text-white transition hover:opacity-95 lg:h-16 lg:w-75 lg:px-6 lg:text-lg"
              >
                <span className="min-w-0 shrink text-left leading-6 lg:leading-9">
                  Join us on our Mission
                </span>
                <span
                  className="flex size-7.5 shrink-0 items-center justify-center transition-transform duration-200 ease-out group-hover:-rotate-30"
                  aria-hidden
                >
                  <CircleChevronRight className="size-6.25 text-white" strokeWidth={2} />
                </span>
              </Link>
            </div>
          </div>

          <div className="order-1 w-full shrink-0 lg:order-2 lg:w-[420px] lg:max-w-none">
            <div
              className="relative aspect-336/324 w-full overflow-hidden rounded-[25px] border-2 border-white lg:aspect-square lg:max-w-[364px] lg:rounded-[56px] lg:border-0"
            >
              <Image
                src="/ncf-img-kid-food-01.png"
                alt="A child smiling while sharing a meal, representing the foundation’s food and care programs."
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 420px"
                priority={false}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[25px] lg:hidden"
                aria-hidden
              />
            </div>
          </div>
   
        </div>
      </div>
    </section>
  );
}
