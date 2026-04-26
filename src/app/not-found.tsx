import Link from "next/link";
import { SitePageContainer } from "@/components/site-page-container";

export default function NotFound() {
  return (
    <SitePageContainer className="py-14 md:py-20">
      <section className="mx-auto max-w-3xl rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-xs md:p-12">
        <p className="text-sm font-semibold tracking-wide text-[#d11f19]">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-600 md:text-base">
          The page you are looking for does not exist or may have been moved. You can
          continue from the homepage or explore stories.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded bg-cta-gradient px-5 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Go to Homepage
          </Link>
          <Link
            href="/stories"
            className="inline-flex h-10 items-center justify-center rounded border border-zinc-300 px-5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
          >
            Browse Stories
          </Link>
        </div>
      </section>
    </SitePageContainer>
  );
}
