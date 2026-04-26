import Image from "next/image";
import { Heart } from "lucide-react";

export default function AboutReachScalePage() {
  return (
    <>

      <section className="relative mb-10 aspect-2/1 w-full overflow-hidden">
        <Image
          src="/about/img-2.jpeg"
          alt="Communities and outreach at scale across our regions of work"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />
        {/* <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent"
          aria-hidden
        /> */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end items-center p-6 md:p-10">
          {/* <h1 className="text-2xl font-semibold tracking-tight text-white md:text-4xl">
            The Reach <span className="text-white/90">&amp; Scale</span>
          </h1> */}
          <p className="mt-2 max-w-6xl text-sm leading-relaxed text-center font-medium text-white/95 md:text-2xl lg:text-4xl">
            Nand Care Foundation operates across extensive rural and tribal geographies, with a focused presence in coal mining and tribal communities that face significant gaps in access to development resources.
          </p>
        </div>
      </section>

      <section
        className="py-10 sm:py-12 lg:py-14"
        aria-labelledby="impact-stats-heading"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-12">
          <h2 id="impact-stats-heading" className="sr-only">
            Our impact at a glance
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6">
            <article
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FFF3E0]">
                <Heart
                  className="h-8 w-8 text-[#FF6D00]"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </div>
              <p className="mt-1 text-base leading-snug text-zinc-600 sm:text-lg">
                <span className="font-semibold">600+</span>{" "} Panchayats across Jharkhand
              </p>
            </article>
            <article
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FFF3E0]">
                <Heart
                  className="h-8 w-8 text-[#FF6D00]"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </div>
              <p className="mt-1 text-base leading-snug text-zinc-600 sm:text-lg">
                Active engagement with <span className="font-semibold">millions of coal miner,rural and tribal community members</span> 
              </p>
            </article>
            <article
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FFF3E0]">
                <Heart
                  className="h-8 w-8 text-[#FF6D00]"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </div>
              <p className="mt-1 text-base leading-snug text-zinc-600 sm:text-lg">
              Long-term presence in <span className="font-semibold">coal mining belts, tribal settlements, and underserved villages</span> 
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto mb-10">
        <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 md:px-12">
          <div className="grid items-center gap-8 md:grid-cols-[420px_1fr] md:gap-10">
            <div className="mx-auto w-full max-w-105">
              <div className="grid grid-cols-2 gap-2">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src="/gallery/image_r11.png"
                    alt="Community support activity"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src="/gallery/image_r12.png"
                    alt="Nutrition and family outreach"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src="/gallery/image_r21.png"
                    alt="Livelihood-focused program"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src="/gallery/image_r22.png"
                    alt="Healthcare awareness camp"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                </div>
              </div>
            </div>
            <p className="text-lg font-light leading-relaxed text-zinc-800 md:text-4xl md:leading-tight">
              Across these regions, the foundation works closely with coal mining and tribal communities through programs in education, nutrition, healthcare, livelihood support, elderly care, and humanitarian assistance—providing both immediate support and pathways for long-term change.”
            </p>
          </div>
        </div>
      </section>

    </>
  );
}
