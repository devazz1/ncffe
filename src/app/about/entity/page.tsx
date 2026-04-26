import { SitePageContainer } from "@/components/site-page-container";
import Image from "next/image";
import { Play } from "lucide-react";

const STAGGERED_COLLAGE_IMAGES = [
  { src: "/gallery/image_r11.png", alt: "Community and education" },
  { src: "/gallery/image_r12.png", alt: "Nutrition and family support" },
  { src: "/gallery/image_r13.png", alt: "Youth and learning" },
  { src: "/gallery/image_r14.png", alt: "Local outreach" },
  { src: "/gallery/image_r15.png", alt: "Livelihood activities" },
  { src: "/gallery/image_r16.png", alt: "Healthcare and awareness" },
  { src: "/gallery/image_r21.png", alt: "On-ground program" },
] as const;

export default function AboutEntityPage() {
  return (
    <>
      <SitePageContainer>
        <section className="mx-auto py-12 md:py-16">
          <p className="mx-auto text-center text-2xl font-normal leading-relaxed text-zinc-400 md:text-4xl">
            <span className="text-[#d3221c]">
              Nand Care Foundation is a Dhanbad-based non-profit organization founded
              by Deepak Kumar
            </span>{" "}
            <span className="text-black">with a singular mission</span>{" "} - to restore dignity, opportunity, and hope to
            marginalize communities living in India&apos;s coal mining belts and remote
            tribal regions.
          </p>
        </section>
      </SitePageContainer>
      <section className="mx-auto bg-white mb-10">
        <div className="grid items-center mx-auto w-full max-w-screen-2xl gap-8 px-4 py-6 md:grid-cols-[1fr_420px] md:gap-10 md:px-12">
          <p className="min-w-0 text-lg text-justify font-normal leading-relaxed text-zinc-800 md:text-4xl md:leading-tight">
            Working at the intersection of{" "}
            <span className="text-[#d3221c]">
              education, nutrition, healthcare, and livelihood
            </span>{" "}
            the foundation focuses on communities that remain largely excluded from mainstream development - particularly families in coal mining settlements, tribal villages, and remote rural clusters.
          </p>

          <div className="mx-auto w-full max-w-105 md:ml-auto">
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-zinc-50">
              <Image
                src="/india-map.png"
                alt="India map of foundation reach"
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 420px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mb-14 max-w-screen-2xl px-4 md:px-12">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
          <div className="order-2 space-y-6 lg:order-1">
            <p className="max-w-3xl text-base text-justify leading-8 text-zinc-700 md:text-lg md:leading-9">
              Over the years, Nand Care Foundation has grown into a grassroots development institution that works directly with millions of rural and tribal residents, building long-term interventions that address the root causes of poverty, malnutrition, lack of access to education, and economic vulnerability.
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div className="relative aspect-4/3 overflow-hidden rounded-xl">
                <Image
                  src="/gallery/image_r13.png"
                  alt="Education support initiative"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 33vw, 220px"
                />
              </div>
              <div className="relative aspect-4/3 overflow-hidden rounded-xl">
                <Image
                  src="/gallery/image_r14.png"
                  alt="Nutrition support session"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 33vw, 220px"
                />
              </div>
              <div className="relative aspect-4/3 overflow-hidden rounded-xl">
                <Image
                  src="/gallery/image_r15.png"
                  alt="Livelihood training activity"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 33vw, 220px"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="group relative order-1 block w-full overflow-hidden rounded-2xl text-left lg:order-2"
            aria-label="Play foundation story video"
          >
            <div className="relative aspect-video">
              <Image
                src="/ncf-img-kid-food-02.png"
                alt="Foundation story hero video thumbnail"
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.01]"
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            </div>
            <span className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
                <Play className="ml-1 size-7 text-zinc-900" fill="currentColor" />
              </span>
            </span>
          </button>
        </div>
      </section>

      <SitePageContainer>
        <section className="mx-auto py-12 md:py-16">
          <p className="mx-auto text-center text-2xl font-normal leading-relaxed text-zinc-400 md:text-4xl">
            <span className="text-[#d3221c]">
              The foundation believes that sustainable social transformation begins within the community itself.
            </span>{" "}
            Therefore, its approach focuses on strengthening local capacities, nurturing talent among rural youth, improving access to quality education, promoting nutritional security, and enabling dignified livelihoods for women and families.
          </p>
        </section>
      </SitePageContainer>

      <section
        className="mx-auto w-full overflow-hidden px-4 py-8 md:py-12"
        aria-label="Program moments collage"
      >
        <div
          className="
            mx-auto flex w-full items-center justify-center
            gap-2 sm:gap-3 md:gap-4

            overflow-x-auto overflow-y-visible
            py-10 md:py-14 lg:py-20

            [scrollbar-color:rgba(0,0,0,0.12)_transparent]
            [scrollbar-width:thin]

            [&>div]:shrink-0

            [&>div:nth-child(odd)]:translate-y-6
            [&>div:nth-child(even)]:-translate-y-6

            md:[&>div:nth-child(odd)]:translate-y-12
            md:[&>div:nth-child(even)]:-translate-y-12

            lg:[&>div:nth-child(odd)]:translate-y-16
            lg:[&>div:nth-child(even)]:-translate-y-16
          "
        >
          {STAGGERED_COLLAGE_IMAGES.map((img) => (
            <div
              key={img.src}
              className="
                relative
                w-20 h-20
                sm:w-28 sm:h-28
                md:w-36 md:h-36
                lg:w-44 lg:h-44
                xl:w-48 xl:h-48
                overflow-hidden rounded-3xl
              "
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 4.5rem, (max-width: 1024px) 7rem, 8rem"
              />
            </div>
          ))}
        </div>
      </section>
      <SitePageContainer>
        <section className="mx-auto bg-white rounded-3xl mb-10">
          <div className="grid items-center mx-auto w-full max-w-screen-2xl gap-8 px-4 py-6 md:grid-cols-[1fr_420px] md:gap-14">
            <p className="min-w-0 text-lg font-normal leading-relaxed text-zinc-800 md:text-4xl md:leading-tight">
              Today, Nand Care Foundation’s initiatives extend across over.{" "}
              <span className="text-[#d3221c]">
              600 panchayats in Jharkhand,
              </span>{" "}
              where the foundation works extensively with coal mining and tribal communities through a range of community-based programs designed to uplift vulnerable populations..
            </p>

            <div className="mx-auto w-full max-w-105 md:ml-auto">
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/india-map.png"
                  alt="India map of foundation reach"
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </SitePageContainer>

      <SitePageContainer>
        <section className="mx-auto rounded-3xl mb-10">
          <div className="grid items-center mx-auto w-full max-w-screen-2xl gap-8 py-6 md:grid-cols-[1fr_420px] md:gap-14">
            <p className="min-w-0 text-lg font-normal leading-relaxed text-zinc-800 md:text-4xl md:leading-tight">
              Today, Nand Care Foundation’s initiatives extend across over.{" "}
              <span className="text-[#d3221c]">
              600 panchayats in Jharkhand,
              </span>{" "}
              where the foundation works extensively with coal mining and tribal communities through a range of community-based programs designed to uplift vulnerable populations..
            </p>

            <div className="mx-auto w-full max-w-105 md:ml-auto">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                <Image
                  src="/about/img-1.png"
                  alt="India map of foundation reach"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </SitePageContainer>
      
    </>
  );
}
