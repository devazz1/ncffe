import Image from "next/image";

export default function EducationChildDevelopmentPage() {
  return (
    <>
    <section className="bg-[#f2f2f9] py-14 md:py-20">
    <div className="mx-auto w-full max-w-[1920px] px-4 md:px-10 lg:px-16">
        <div className="mx-auto flex w-full max-w-[1689px] flex-col items-center text-center">
        <h1 className="bg-gradient-to-r from-[#D01A1A] to-[#FFB53C] bg-clip-text text-3xl font-semibold text-transparent md:text-5xl md:leading-[1.2]">
            Education &amp; Child Development
        </h1>
        <p className="mt-5 max-w-[1561px] text-sm leading-relaxed text-black md:text-xl md:leading-[1.7]">
            Education remains the cornerstone of Nand Care Foundation’s work. The organization is committed to ensuring that children from rural and tribal backgrounds receive access to quality learning environments, academic support, and holistic development opportunities.
        </p>
        </div>

        <div className="relative mx-auto mt-10 w-full max-w-[1792px] overflow-hidden rounded-[38px]">
        <div className="absolute inset-0 z-10 bg-black/30" />
        <Image
            src="/program/img-1.jpeg"
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
    <section>

    </section>
    
    </>
  );
}