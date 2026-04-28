import Image from "next/image";
import { MarqueeGallery, supportingLivesGalleryRows } from "@/components/supporting-lives-gallery-section";

export default function TalentIdentificationRuralTalentSupportPage() {

  const foundationTalentSupport = [
    {
      src: "/program/img-27.jpeg",
      alt: "books",
      caption: "Academics",
    },
    {
      src: "/program/img-28.jpeg",
      alt: "kids playing sports",
      caption: "Sports",
    },
    {
      src: "/program/img-29.jpeg",
      alt: "kids learning singing and dancing",
      caption: "Singing and Dancing",
    },
    {
      src: "/program/img-30.jpeg",
      alt: "kids painting",
      caption: "Painting and visual expression",
    },
  ] as const;
  
  return (
    <>
      {/* section 1 */}
      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[1689px] px-10 flex-col items-center text-center">
            <p className="mt-5 max-w-[1561px] text-base leading-relaxed text-black md:text-2xl md:leading-[1.7] lg:text-4xl">
              <span className="text-[#D01A1A]"> Recognizing that talent exists </span>{" "}
              <span className="text-zinc-500"> everywhere but opportunity does not, </span>{" "}
              the foundation runs a Rural Talent Scouting Initiative.
            </p>
          </div>

          <div className="relative mx-auto mt-10 w-full max-w-[1792px] overflow-hidden rounded-[38px]">
            <div className="absolute inset-0 z-10 bg-black/30" />
            <Image
              src="/program/img-26.jpeg"
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
          <p className="mt-4 text-base leading-relaxed text-zinc-600 md:text-2xl md:leading-relaxed">
            Talented children from underserved communities are identified and supported in multiple areas including :-
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:gap-10 md:mt-10 md:grid-cols-2 lg:grid-cols-4 md:gap-6 lg:gap-8">
            {foundationTalentSupport.map((item) => (
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

      <section
        className="py-8 lg:py-14"
        aria-labelledby="supporting-lives-gallery-heading"
      >
        <div className="mx-auto max-w-[1920px] px-3 sm:px-6 lg:px-16">
          <h2
            id="supporting-lives-gallery-heading"
            className="mb-8 text-lg tracking-tight text-zinc-400 sm:text-xl lg:mb-10 lg:text-4xl"
          >
            <span className="text-[#D01A1A]">Selected students </span>{" "}
            receive mentorship, training support, and opportunities to showcase their talents beyond their{" "}
            <span className="text-[#D01A1A]"> villages, helping them build confidence and pursue their aspirations.</span>
            
          </h2>
        </div>

        <MarqueeGallery rows={supportingLivesGalleryRows} />
      </section>

    </>
  );
}