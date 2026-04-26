import Image from "next/image";
import { SitePageContainer } from "@/components/site-page-container";

export default function AboutVisionMissionPage() {
  return (
    <>
      <SitePageContainer>
        <section className="mx-auto rounded-3xl mb-10">
          <div className="grid items-center mx-auto w-full max-w-screen-2xl gap-8 py-6 md:grid-cols-[1fr_420px] md:gap-14">
            <div>
              <h2 className="text-2xl font-semibold text-[#d3221c] mb-4">OUR VISION</h2>
              <p className="min-w-0 text-lg font-normal leading-8 text-zinc-800 md:leading-9">
              To create a compassionate and inclusive future for coal mining and tribal communities where every child can access quality education, every family is supported with proper nutrition and healthcare, the elderly live with dignity and care, and every individual has the opportunity to lead a hopeful life. 
              </p>
            </div>
            <div className="mx-auto w-full max-w-xs md:ml-auto">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                <Image
                  src="/about/vision.png"
                  alt="India map of foundation reach"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 80vw, 336px"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </SitePageContainer>

      <SitePageContainer>
        <section className="mx-auto rounded-3xl mb-10">
          <div className="grid items-center mx-auto w-full max-w-screen-2xl gap-8 py-6 md:grid-cols-[420px_1fr] md:gap-14">
            <div className="mx-auto w-full max-w-xs md:mr-auto">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                <Image
                  src="/about/mision.png"
                  alt="India map of foundation reach"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 80vw, 336px"
                  priority
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#d3221c] mb-4">OUR MISSION</h2>
              <p className="min-w-0 text-lg font-normal leading-8 text-zinc-800 md:leading-9">
                To empower underserved coal mining and tribal communities through community-driven initiatives focused on education, health, nutrition, elderly care, and resilience-building. Nand Care Foundation collaborates closely with communities to develop sustainable pathways that promote dignity, self-reliance, and long-term, inclusive social development. 
              </p>
            </div>
          </div>
        </section>
      </SitePageContainer>

    </>
  );
}
