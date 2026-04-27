import Image from "next/image";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { SitePageContainer } from "@/components/site-page-container";

export default function EducationChildDevelopmentPage() {
  const learningHighlights = [
    "Academic support and remedial learning",
    "Daily learning sessions for over 5,000 children",
    "Foundational literacy and numeracy strengthening",
    "Play-based learning & extracurricular engagement",
    "Life skills development",
    "Career awareness and mentoring",
  ];

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
      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[1792px] flex-col gap-5 xl:flex-row xl:items-start xl:gap-10">
            <div className="w-full max-w-4xl">
              <h2 className="text-3xl font-normal leading-tight text-black md:text-3xl">
                Community Remedial Learning Centres
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#8c8c8c] md:mt-6 md:text-2xl md:leading-relaxed">
                To address learning gaps among rural children, the foundation has
                established 100+ remedial education centres across remote
                communities.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 md:gap-5">
                {learningHighlights.map((item) => (
                  <div
                    key={item}
                    className="flex min-h-[122px] items-center gap-5 rounded-[25px] bg-white px-6 py-6 shadow-[0_1px_10px_rgba(0,0,0,0.05)]"
                  >
                    <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[13px] bg-[#FFF6EE]">
                      <GraduationCap className="size-6 text-[#FF7C01]" />
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
                src="/program/img-2.jpeg"
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
              Beyond academic learning,
            </span>{" "}
            these centres also function as community hubs for nurturing curiosity, creativity, and confidence among children who often lack access to structured learning environments.
          </p>
        </section>
      </SitePageContainer>

      {/* section 4 */}
      <section className="pb-12 mt-12 md:pb-16">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-10 lg:px-16">
          <div className="relative mx-auto w-full max-w-[1729px] overflow-visible rounded-[32px] border border-[#ffbe6e] bg-gradient-to-r from-[#fffaf4] to-[#ffedd7] px-6 py-10 md:px-12 md:py-14 lg:min-h-[503px] lg:rounded-[57px] lg:px-[60px] lg:py-[107px]">
            <div className="relative z-10 max-w-[900px]">
              <h2 className="text-xl font-normal leading-tight text-[#d12019] md:text-4xl md:leading-[1.2]">
                Ready to <span className="font-semibold">Make</span> a
                Difference?
              </h2>
              <p className="mt-3 max-w-[900px] text-base leading-relaxed text-[#040404] md:mt-2 md:text-lg md:leading-[1.5]">
                Your generosity can transform lives. Join thousands of donors
                who are creating lasting change in communities across India.
              </p>
              <Link
                href="/"
                className="mt-8 inline-flex items-center gap-3 rounded-[4px] bg-gradient-to-r from-[#d01a1a] to-[#ffb43c] px-6 py-4 text-base text-white transition-opacity hover:opacity-90 md:mt-12 md:min-h-[68px] md:px-6 md:py-4 md:text-lg"
              >
                <span>Start Donating</span>
                <span
                  aria-hidden
                  className="flex size-7 items-center justify-center rounded-full border border-white/50 text-base md:size-[30px]"
                >
                  &gt;
                </span>
              </Link>
            </div>

            <div className="pointer-events-none mt-8 flex justify-center lg:absolute lg:-top-[152px] lg:right-[52px] lg:mt-0">
              <Image
                src="/program/img-3.png"
                alt="Smiling child holding a board"
                width={501}
                height={655}
                className="h-auto w-[250px] max-w-full object-contain md:w-[340px] lg:w-[501px]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}