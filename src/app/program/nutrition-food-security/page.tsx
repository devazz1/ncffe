import Image from "next/image";

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
    </>
  );
}