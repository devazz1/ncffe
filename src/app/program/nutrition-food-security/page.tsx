import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SitePageContainer } from "@/components/site-page-container";

export default function NutritionFoodSecurityPage() {
  return (
    <>
      <section className="bg-[#f2f2f9] py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[1689px] px-10 flex-col items-center text-center">
            <p className="mt-5 max-w-[1561px] text-base leading-relaxed text-black md:text-2xl md:leading-[1.7] lg:text-5xl">
            <span className="text-[#D01A1A]"> Malnutrition remains one of the most pressing </span>{" "}
            <span className="text-zinc-500"> challenges in rural and tribal communities. </span>{" "}
            Nand Care Foundation addresses this through direct food support as well as long-term nutritional interventions.
            </p>
          </div>

          <div className="relative mx-auto mt-10 w-full max-w-[1792px] overflow-hidden rounded-[38px]">
            <div className="absolute inset-0 z-10 bg-black/30" />
            <Image
            src="/program/img-4.jpeg"
            alt="Children learning together"
            fill
            sizes="(max-width: 768px) 100vw, 1792px"
            className="object-cover"
            />
            <div className="h-[340px] md:h-[560px] lg:h-[764px]" />
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <h2 className="text-base tracking-tight text-[#D01A1A] md:text-2xl lg:text-4xl">
            Poshan Vatika - Community Nutrition Gardens
          </h2>
          <p className="mt-4 max-w-5xl text-base leading-relaxed text-zinc-500 md:text-lg lg:text-xl">
            The Poshan Vatika initiative promotes household-level nutrition
            security by helping rural families establish kitchen gardens that
            produce nutrient-rich vegetables and fruits.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <article className="flex items-center gap-4 rounded-2xl bg-[#F8F8FC] p-4 md:gap-6">
              <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-xl md:h-36 md:w-52">
                <Image
                  src="/program/img-5.jpeg"
                  alt="Small household vegetable gardens"
                  fill
                  sizes="(max-width: 768px) 160px, 208px"
                  className="object-cover"
                />
              </div>
              <p className="text-base leading-relaxed text-zinc-800 md:text-2xl">
                Setting up <strong>small household vegetable gardens</strong>
              </p>
            </article>

            <article className="flex items-center gap-4 rounded-2xl bg-[#F8F8FC] p-4 md:gap-6">
              <p className="order-2 text-base leading-relaxed text-zinc-800 md:order-1 md:text-2xl">
                Cultivating <strong>nutrient-rich crops such as leafy vegetables, pulses, and seasonal produce</strong>
              </p>
              <div className="relative order-1 h-28 w-40 shrink-0 overflow-hidden rounded-xl md:order-2 md:h-36 md:w-52">
                <Image
                  src="/program/img-6.jpeg"
                  alt="Nutrient-rich crop cultivation"
                  fill
                  sizes="(max-width: 768px) 160px, 208px"
                  className="object-cover"
                />
              </div>
            </article>

            <article className="flex items-center gap-4 rounded-2xl bg-[#F8F8FC] p-4 md:gap-6">
              <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-xl md:h-36 md:w-52">
                <Image
                  src="/program/img-7.jpeg"
                  alt="Balanced diets and nutrition awareness"
                  fill
                  sizes="(max-width: 768px) 160px, 208px"
                  className="object-cover"
                />
              </div>
              <p className="text-base leading-relaxed text-zinc-800 md:text-2xl">
                Understanding <strong>balanced diets and nutritional practices</strong>
              </p>
            </article>

            <article className="flex items-center gap-4 rounded-2xl bg-[#F8F8FC] p-4 md:gap-6">
              <p className="order-2 text-base leading-relaxed text-zinc-800 md:order-1 md:text-2xl">
                Ensuring <strong>regular access to fresh, chemical-free food</strong>
              </p>
              <div className="relative order-1 h-28 w-40 shrink-0 overflow-hidden rounded-xl md:order-2 md:h-36 md:w-52">
                <Image
                  src="/program/img-8.jpeg"
                  alt="Access to fresh and chemical-free food"
                  fill
                  sizes="(max-width: 768px) 160px, 208px"
                  className="object-cover"
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Donation CTA */}
      <SitePageContainer>
        <section
          className="relative mb-10 md:mb-14"
          aria-labelledby="nutrition-donate-cta-heading"
        >
          <div
            className="overflow-hidden rounded-[24px] shadow-sm ring-1 ring-black/[0.04] md:rounded-[32px]"
            style={{
              background:
                "linear-gradient(105deg, #ffffff 0%, #fff8f9 42%, #fce8ee 100%)",
            }}
          >
            <div className="flex flex-col gap-10 p-6 md:flex-row md:items-center md:justify-between md:gap-10 md:p-8 lg:p-10">
       
              {/* Copy + action */}
              <div className="order-2 md:order-1 flex min-w-0 flex-col gap-5 md:gap-6">
                <h2
                  id="nutrition-donate-cta-heading"
                  className="text-2xl font-normal leading-snug tracking-tight text-[#8B2F2F] md:text-3xl md:leading-[1.15] lg:text-4xl lg:leading-[1.2]"
                >
                  Ready to{" "}
                  <span className="font-semibold text-[#c41e1e]">Make</span> a
                  Difference?
                </h2>
                <p className="max-w-2xl text-[15px] leading-relaxed text-zinc-700 md:text-lg md:leading-relaxed">
                  Your generosity can transform lives. Join thousands of donors
                  who are creating lasting change in communities across India.
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
                    src="/program/img-9.jpeg"
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