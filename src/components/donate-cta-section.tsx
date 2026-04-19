import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type DonateCtaSectionProps = {
  /** Primary donation target (e.g. first campaign category). */
  donateHref?: string;
};

export function DonateCtaSection({ donateHref = "/" }: DonateCtaSectionProps) {
  return (
    <section
      className="relative overflow-visible bg-gradient-to-b from-orange-100 to-orange-50 py-7 lg:py-28"
      aria-labelledby="donate-cta-heading"
    >
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          <div className="order-1 flex min-w-0 flex-col gap-5 lg:max-w-[900px] lg:gap-12">
            <div className="flex flex-col gap-1.5">
              <h2
                id="donate-cta-heading"
                className="text-xl font-bold leading-snug tracking-tight text-red-800 lg:text-4xl xl:text-5xl xl:leading-tight"
              >
                Ready to{" "}
                <span className="font-extrabold text-red-600">Make</span> a
                Difference?
              </h2>
              <p className="text-sm leading-snug text-zinc-950 lg:text-lg lg:leading-relaxed">
                Your generosity can transform lives. Join thousands of donors who
                are creating lasting change in communities across India.
              </p>
            </div>

            <div>
              <Link
                href={donateHref}
                className="inline-flex h-12 w-[169px] max-w-full items-center justify-between gap-3 rounded-[4px] bg-cta-gradient px-3 text-sm font-semibold text-white transition hover:opacity-95 lg:h-17 lg:w-[266px] lg:gap-3 lg:px-6 lg:text-lg lg:leading-9"
              >
                <span className="min-w-0 shrink text-left leading-6 lg:leading-9">
                  Start Donating
                </span>
                <span
                  className="flex size-4 shrink-0 items-center justify-center lg:size-7.5"
                  aria-hidden
                >
                  <ChevronRight
                    className="size-3.5 text-white lg:size-[1.5625rem]"
                    strokeWidth={2}
                  />
                </span>
              </Link>
            </div>
          </div>

          <div className="order-2 flex justify-center lg:min-w-0 lg:flex-1 lg:justify-end">
            <div className="relative aspect-[253/270] w-full max-w-[253px] lg:aspect-auto lg:h-[658px] lg:w-[617px] lg:max-w-none lg:-translate-y-40 lg:self-start">
              <Image
                src="/ncf-img-kid-food-02.png"
                alt="Children with meals from community feeding programs."
                fill
                className="object-contain object-bottom lg:object-right-bottom"
                sizes="(max-width: 1024px) 253px, 617px"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
