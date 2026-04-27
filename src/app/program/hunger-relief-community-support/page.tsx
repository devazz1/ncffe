import { SitePageContainer } from "@/components/site-page-container";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HungerReliefCommunitySupportPage() {
  const foundationSupportsWomen = [
    {
      src: "/program/img-19.jpeg",
      alt: "nand care foundation donating camp",
      caption: "Distribution of 1,000+ grocery kits containing essential staples such as rice, wheat, pulses, and cooking oil",
    },
    {
      src: "/program/img-20.jpeg",
      alt: "kid holding food",
      caption: "Nutrition and fruit distribution drives for children and families",
    },
    {
      src: "/program/img-21.jpeg",
      alt: "group of kid receiving food",
      caption: "Partnerships with initiatives such as Zomato Feeding India to expand food relief efforts",
    },
  ] as const;

  return (
    <>
    {/* section 1 */}
      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[1689px] px-10 flex-col items-center text-center">
            <p className="mt-5 max-w-[1561px] text-base leading-relaxed text-black md:text-2xl md:leading-[1.7] lg:text-4xl">
              <span className="text-[#D01A1A]"> In addition to long-term development programs, </span>{" "}
              Nand Care Foundation also provides direct humanitarian assistance to families facing immediate hardships.
            </p>
          </div>

          <div className="relative mx-auto mt-10 w-full max-w-[1792px] overflow-hidden rounded-[38px]">
            <div className="absolute inset-0 z-10 bg-black/30" />
            <Image
              src="/program/img-18.jpeg"
              alt="Children learning together"
              fill
              sizes="(max-width: 768px) 100vw, 1792px"
              className="object-cover"
            />
            <div className="h-[275px] md:h-[454px] lg:h-[618px]" />
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className="bg-white py-12 mb-6 md:py-16">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-10 lg:px-16">
          <h2 className="text-left text-2xl font-normal leading-tight text-[#D01A1A] md:text-3xl lg:text-4xl">
            Food & Grocery Distribution:
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 md:text-2xl md:leading-relaxed">
            The foundation regularly organizes food distribution drives to support vulnerable households.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:gap-10 md:mt-10 md:grid-cols-3 md:gap-6 lg:gap-8">
            {foundationSupportsWomen.map((item) => (
              <div
                key={item.caption}
                className="flex flex-col items-center text-center"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 560px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 max-w-sm text-base font-medium leading-snug text-black md:mt-5 md:text-lg">
                  {item.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Donation CTA */}
      <SitePageContainer>
        <section
          className="relative mb-10 md:mb-14"
          aria-labelledby="hunger-relief-donate-cta-heading"
        >
          <div
            className="overflow-hidden rounded-[24px] shadow-sm ring-1 ring-black/[0.04] md:rounded-[32px]"
            style={{
              background:
                "linear-gradient(105deg, #ffffff 0%, #edfce8 42%, #E4FFDF 100%)",
            }}
          >
            <div className="flex flex-col gap-10 p-6 md:flex-row md:items-center md:justify-between md:gap-10 md:p-8 lg:p-10">
       
              {/* Copy + action */}
              <div className="order-2 md:order-1 flex min-w-0 flex-col gap-5 md:gap-6">
                <h2
                  id="hunger-relief-donate-cta-heading"
                  className="text-2xl font-normal leading-snug tracking-tight text-[#8B2F2F] md:text-3xl md:leading-[1.15] lg:text-4xl lg:leading-[1.2]"
                >
                  Your Donation can{" "}
                  <span className="font-semibold text-[#c41e1e]">Make</span> a
                  Difference !
                </h2>
                <p className="max-w-2xl text-[15px] leading-relaxed text-zinc-700 md:text-lg md:leading-relaxed">
                  The foundation has also collaborated with humanitarian initiatives such as Crypto Relief Fund to support the distribution of essential medicines to vulnerable communities.
                </p>
                <div className="pt-1 md:pt-2">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-3 rounded-sm bg-gradient-to-r from-[#d01a1a] to-[#ffb43c] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-opacity hover:opacity-90 md:px-7 md:py-4 md:text-lg"
                  >
                    <span>Start Donating</span>
                    <span
                      aria-hidden
                      className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/45 md:size-[34px]"
                    >
                      <ChevronRight className="size-[18px] md:size-5" strokeWidth={2.5} />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Supporting image */}
              <div className="order-1 md:order-2 relative mx-auto w-full md:mx-0 md:max-w-sm">
                <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl md:aspect-square md:rounded-[22px]">
                  <Image
                    src="/program/img-22.jpeg"
                    alt="Children benefiting from community nutrition and meal programs"
                    fill
                    className="object-cover object-center grayscale-[0.15] md:object-[center_65%]"
                    sizes="(max-width: 768px) 100vw, 336px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </SitePageContainer>
    </>
  );
}