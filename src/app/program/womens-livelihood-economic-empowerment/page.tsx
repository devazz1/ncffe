import Image from "next/image";
import { Star } from "lucide-react";
import { SitePageContainer } from "@/components/site-page-container";

export default function WomensLivelihoodEconomicEmpowermentPage() {
	const livelihoodInitiativesHighlights = [
    "Tailoring and garment production",
    "Small retail shops and micro-enterprises",
    "Animal husbandry and dairy activities",
    "Handicrafts and home-based production",
    "Food processing and local produce businesses",
  ];

  const foundationSupportsWomen = [
    {
      src: "/program/img-15.jpeg",
      alt: "Women in entrepreneurship training with technology",
      caption: "Entrepreneurship training",
    },
    {
      src: "/program/img-16.jpeg",
      alt: "Women in a workshop for market linkage guidance",
      caption: "Market linkage guidance",
    },
    {
      src: "/program/img-17.jpeg",
      alt: "Women entrepreneurs and professionals",
      caption: "Small seed funding for enterprise start-ups",
    },
  ] as const;

  return (
    <>
      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[1689px] px-10 flex-col items-center text-center">
            <p className="mt-5 max-w-[1561px] text-base leading-relaxed text-black md:text-2xl md:leading-[1.7] lg:text-4xl">
            <span className="text-[#D01A1A]"> Economic empowerment of rural women </span>{" "}
            is a key pillar of Nand Care Foundation’s development strategy.
            </p>
          </div>

          <div className="relative mx-auto mt-10 w-full max-w-[1792px] overflow-hidden rounded-[38px]">
            <div className="absolute inset-0 z-10 bg-black/30" />
            <Image
              src="/program/img-13.jpeg"
              alt="Children learning together"
              fill
              sizes="(max-width: 768px) 100vw, 1792px"
              className="object-cover"
            />
            <div className="h-[275px] md:h-[454px] lg:h-[618px]" />
          </div>

					<div className="mx-auto flex w-full max-w-[1689px] px-5 flex-col items-center text-center">
            <p className="mt-5 max-w-[1561px] text-base leading-relaxed text-black md:text-2xl md:leading-[1.7] lg:text-3xl">
              Through training programs and small financial support mechanisms, the foundation enables women to establish sustainable income-generating activities.
            </p>
          </div>
        </div>
      </section>

			{/* section 2 */}
			<section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[1792px] flex-col gap-5 xl:flex-row xl:items-start xl:gap-10">
					  
						<div className="relative h-[291px] w-full overflow-hidden rounded-[22px] md:h-[405px] xl:h-[487px] xl:max-w-[551px]">
              <Image
                src="/program/img-11.jpeg"
                alt="Community remedial learning class"
                fill
                sizes="(max-width: 1280px) 100vw, 551px"
                className="object-cover"
              />
            </div>
      

            <div className="w-full max-w-4xl">
              <h2 className="text-3xl font-normal leading-tight text-[#D01A1A] md:text-3xl">
							  Livelihood Initiatives for Rural Women
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 md:mt-6 md:text-2xl md:leading-relaxed">
							  Women receive skill development training and guidance in areas such as:
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 md:gap-5">
                {livelihoodInitiativesHighlights.map((item) => (
                  <div
                    key={item}
                    className="flex min-h-[122px] items-center gap-5 rounded-[25px] bg-white px-6 py-6 shadow-[0_1px_10px_rgba(0,0,0,0.05)]"
                  >
                    <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[13px] bg-[#FFF6EE]">
                      <Star className="size-6 text-[#FF7C01]" />
                    </div>
                    <p className="text-base font-medium leading-snug text-black md:text-lg">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
      
          </div>
        </div>
      </section>

			{/* section 3 */}
			<section className="bg-white py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-10 lg:px-16">
          <h2 className="text-left text-2xl font-normal leading-tight text-black md:text-3xl lg:text-4xl">
            The foundation also supports women through:
          </h2>

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

			{/* section 4 */}
			<SitePageContainer>
        <section className="mx-auto py-12 px-6 md:py-16">
          <p className="mx-auto text-center text-2xl font-normal leading-relaxed text-zinc-900 md:text-4xl">
            These initiatives enable women to build independent incomes, strengthen household stability, and improve the economic resilience of their families.
          </p>
        </section>
      </SitePageContainer>

    </>
  );
}