import Image from "next/image";
import { ShieldPlus, ChevronRight } from "lucide-react";
import Link from "next/link";
import { SitePageContainer } from "@/components/site-page-container";
import { MediaContentBlock } from "@/components/media-content-block";

export default function HealthcareMedicalSupportPage() {
	const healthCampHighlights = [
    "Basic medical consultations",
    "Health screenings",
    "Early diagnosis of diseases",
    "Distribution of essential medicines",
    "Preventive health awareness",
  ];

  return (
    <>
      <section className="bg-[#f2f2f9] py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[1689px] px-20 flex-col items-center text-center">
            <p className="mt-5 max-w-[1561px] text-base leading-relaxed text-black md:text-2xl md:leading-[1.7] lg:text-4xl">
            	<span className="text-[#D01A1A]"> Limited access to healthcare remains a critical barrier in remote rural areas. </span>{" "}
            	To address this, the foundation regularly organizes community health camps in underserved villages.
            </p>
          </div>

          <div className="mx-auto mt-10 w-full max-w-[1792px] overflow-hidden rounded-[38px]">
            <MediaContentBlock imageUrl="/program/img-10.jpeg" />
          </div>
        </div>
      </section>

			{/* section 2 */}
      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[1792px] flex-col gap-5 xl:flex-row xl:items-start xl:gap-10">
            <div className="w-full max-w-4xl">
              <h2 className="text-3xl font-normal leading-tight text-[#D01A1A] md:text-3xl">
								Community Health Camps
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 md:mt-6 md:text-2xl md:leading-relaxed">
								Nand Care Foundation has conducted
								<span className="text-zinc-900"> 100+ healthcare camps across rural and tribal communities.</span>{" "}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 md:gap-5">
                {healthCampHighlights.map((item) => (
                  <div
                    key={item}
                    className="flex min-h-[122px] items-center gap-5 rounded-[25px] bg-white px-6 py-6 shadow-[0_1px_10px_rgba(0,0,0,0.05)]"
                  >
                    <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[13px] bg-[#FFF6EE]">
                      <ShieldPlus className="size-6 text-[#FF7C01]" />
                    </div>
                    <p className="text-base font-medium leading-snug text-black md:text-lg">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[360px] w-full overflow-hidden rounded-[22px] md:h-[500px] xl:h-[601px] xl:max-w-[681px]">
              <Image
                src="/program/img-11.jpeg"
                alt="Community remedial learning class"
                fill
                sizes="(max-width: 1280px) 100vw, 681px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

			{/* section 3 */}
			<SitePageContainer>
        <section className="mx-auto py-12 px-6 md:py-16">
          <p className="mx-auto text-center text-2xl font-normal leading-relaxed text-zinc-900 md:text-4xl">
            <span className="text-[#d3221c]">
						  Many undiagnosed health conditions
            </span>{" "}
						<span className="text-zinc-500">have been identified through these camps, enabling early intervention and treatment.</span>{" "}
            This has significantly contributed to disease prevention and improved community health outcomes.
          </p>
        </section>
      </SitePageContainer>

			{/* Donation CTA */}
      <SitePageContainer>
        <section
          className="relative mb-10 md:mb-14"
          aria-labelledby="healthcare-donate-cta-heading"
        >
          <div
            className="overflow-hidden rounded-[24px] shadow-sm ring-1 ring-black/[0.04] md:rounded-[32px]"
            style={{
              background:
                "linear-gradient(105deg, #ffffff 0%, #ede8fc 42%, #E7DFFF 100%)",
            }}
          >
            <div className="flex flex-col gap-10 p-6 md:flex-row md:items-center md:justify-between md:gap-10 md:p-8 lg:p-10">
       
              {/* Copy + action */}
              <div className="order-2 md:order-1 flex min-w-0 flex-col gap-5 md:gap-6">
                <h2
                  id="nutrition-donate-cta-heading"
                  className="text-2xl font-normal leading-snug tracking-tight text-[#8B2F2F] md:text-3xl md:leading-[1.15] lg:text-4xl lg:leading-[1.2]"
                >
                  Crypto Relief Fund
                </h2>
                <p className="max-w-2xl text-[15px] leading-relaxed text-zinc-700 md:text-lg md:leading-relaxed">
								  The foundation has also collaborated with humanitarian initiatives such as Crypto Relief Fund to support the distribution of essential medicines to vulnerable communities.
                </p>
                <div className="pt-1 md:pt-2">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#d01a1a] to-[#ffb43c] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-opacity hover:opacity-90 md:px-7 md:py-4 md:text-lg"
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
                    src="/program/img-12.jpeg"
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