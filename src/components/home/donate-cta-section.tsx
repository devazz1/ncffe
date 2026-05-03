import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type DonateCtaSectionProps = {
  donateHref?: string;
};

export function DonateCtaSection({ donateHref = "/" }: DonateCtaSectionProps) {
  return (
    <section
      className="relative overflow-visible bg-[#fdf0e0] lg:h-117"
      aria-labelledby="donate-cta-heading"
      style={{
        background: "linear-gradient(to right, #FFEDD7, #FFFAF4)",
      }}
    >
      <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-12 h-full">
        <div className="flex flex-col lg:flex-row lg:items-stretch h-full">

          {/* ── Left column ── */}
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-6 py-12 lg:py-0 lg:gap-10 lg:max-w-[55%]">
            {/* Heading */}
            <div className="flex flex-col gap-3">
              <h2
                id="donate-cta-heading"
                className="text-2xl font-light leading-snug tracking-tight text-red-700 lg:text-4xl xl:text-5xl xl:leading-tight"
              >
                Ready to{" "}
                <span className="font-extrabold text-red-600">Make</span>{" "}
                a Difference?
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-zinc-700 lg:text-base lg:leading-relaxed">
                Your generosity can transform lives. Join thousands of donors
                who are creating lasting change in communities across India.
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <Link
                href={donateHref}
                className="group inline-flex items-center justify-between gap-3 rounded px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:px-7 lg:py-4 lg:text-lg"
                style={{
                  background: "linear-gradient(135deg, #e84c1e 0%, #f5a623 100%)",
                  minWidth: "160px",

                }}
              >
                <span>Start Donating</span>
                <span
                  className="flex size-5 items-center justify-center rounded-full border border-white/40"
                  aria-hidden
                >
                  <ChevronRight className="size-3.5 group-hover:-rotate-30 transition-transform duration-200 ease-out" strokeWidth={2.5} />
                </span>
              </Link>
            </div>
          </div>

          {/* ── Right column – image overflows top ── */}
          <div className="relative hidden shrink-0 lg:flex lg:w-[45%] lg:items-end lg:justify-end">
            {/*
              The image is anchored to the bottom of the section
              and overflows above. Fixed width (no maxWidth: 100% of the column)
              so the photo does not shrink when the viewport narrows; the left
              column wraps instead (min-w-0 on the text stack).
            */}
            <div className="absolute bottom-0 right-0 w-154.25 shrink-0">
              <Image
                src="/ncf-img-kid-food-02.png"
                alt="Children with meals from community feeding programs."
                width={617}
                height={658}
                className="h-auto w-full object-cover object-bottom mix-blend-multiply"
                priority={false}
              />
            </div>
          </div>

          {/* Mobile image (centered, no overflow) */}
          <div className="flex justify-center lg:hidden">
            <Image
              src="/ncf-img-kid-food-02.png"
              alt="Children with meals from community feeding programs."
              width={320}
              height={340}
              className="h-auto w-64 object-cover mix-blend-multiply"
              priority={false}
            />
          </div>

        </div>
      </div>
    </section>
  );
}