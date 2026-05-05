import { MediaContentBlock } from "@/components/media-content-block";
import { SitePageContainer } from "@/components/site-page-container";
import Image from "next/image";

export default function WinterReliefClothingDistributionPage() {
  return (
    <>
      {/* section 1 */}
      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[1689px] px-10 flex-col items-center text-center">
            <p className="mt-5 max-w-[1561px] text-base leading-relaxed text-black md:text-2xl md:leading-[1.7] lg:text-4xl">
              <span className="text-[#D01A1A]"> Many tribal and rural communities lack access </span>{" "}
              to adequate winter protection. To address this, the foundation conducts seasonal relief programs.
            </p>
          </div>

          <div className="mx-auto mt-10 w-full max-w-[1792px] overflow-hidden rounded-[38px]">
            <MediaContentBlock imageUrl="/program/img-23.jpeg" />
          </div>
        </div>
      </section>

      {/* section 2 — image left / text right */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[1792px] flex-col gap-8 md:flex-row md:items-center md:gap-10 lg:gap-14">
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl md:aspect-[16/11] md:w-[min(52%,896px)] md:max-w-none">
              <Image
                src="/program/img-24.jpeg"
                alt="Winter blanket distribution with communities gathered outdoors"
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
              />
            </div>
            <p className="text-center text-xl leading-snug text-black md:flex-1 md:text-left md:text-2xl md:leading-tight lg:text-3xl lg:leading-snug">
              Distribution of {" "}
              <span className="font-semibold">800+ winter blankets across tribal villages</span> 
            </p>
          </div>
        </div>
      </section>

      {/* section 3 — text left / image right */}
      <section className="pb-14 pt-10 md:pb-20 md:pt-14 lg:pb-24 lg:pt-16">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[1792px] flex-col gap-8 md:flex-row-reverse md:items-center md:gap-10 lg:gap-14">
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl md:aspect-[16/11] md:w-[min(52%,896px)] md:max-w-none">
              <Image
                src="/program/img-25.jpeg"
                alt="Volunteers handing clothing packages to families in line"
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
              />
            </div>
            <p className="text-center text-xl leading-snug text-black md:flex-1 md:text-left md:text-2xl md:leading-tight lg:text-3xl lg:leading-snug">
              <span className="font-semibold">Clothing distribution </span>{" "} 
              drives for vulnerable families
            </p>
          </div>
        </div>
      </section>

      {/* section 4 */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[1792px] flex-col gap-8 md:flex-row md:items-center md:gap-10 lg:gap-14">
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl md:aspect-[16/11] md:w-[min(52%,896px)] md:max-w-none">
              <Image
                src="/program/img-24.jpeg"
                alt="Winter blanket distribution with communities gathered outdoors"
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
              />
            </div>
            <p className="text-center text-xl leading-snug text-black md:flex-1 md:text-left md:text-2xl md:leading-tight lg:text-3xl lg:leading-snug">
              <span className="font-semibold">Community support for elderly </span>{" "} 
              residents and children during extreme weather conditions
              
            </p>
          </div>
        </div>
      </section>
      
      {/* section 5 */}
      <SitePageContainer>
        <section className="mx-auto py-12 px-6 md:py-16">
          <p className="mx-auto text-center text-2xl font-normal leading-relaxed text-zinc-900 md:text-4xl">
            These efforts ensure that marginalized populations receive basic protection, dignity, and comfort during harsh winters.
          </p>
        </section>
      </SitePageContainer>

    </>
  );
}