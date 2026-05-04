import type { ReactNode } from "react";
import Link from "next/link";
import { SitePageContainer } from "@/components/site-page-container";

type LegalDocumentShellProps = {
  title: string;
  lastUpdated: string;
  intro?: ReactNode;
  children: ReactNode;
};

export function LegalDocumentShell({
  title,
  lastUpdated,
  intro,
  children,
}: LegalDocumentShellProps) {
  return (
    <SitePageContainer className="py-8 md:py-12">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-zinc-500">Last updated: {lastUpdated}</p>
        {intro ? <div className="mt-6 text-sm leading-relaxed text-zinc-600">{intro}</div> : null}
        <div className="mt-8 space-y-8 text-sm leading-relaxed text-zinc-700">{children}</div>
        <p className="mt-10 border-t border-zinc-200 pt-6 text-xs text-zinc-500">
          These materials are provided for general information only and do not constitute legal
          advice. Please consult a qualified professional for advice tailored to your situation.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/terms-of-use" className="font-medium text-zinc-900 underline-offset-4 hover:underline">
            Terms of Use
          </Link>
          <span className="text-zinc-300" aria-hidden>
            |
          </span>
          <Link href="/privacy-policy" className="font-medium text-zinc-900 underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          <span className="text-zinc-300" aria-hidden>
            |
          </span>
          <Link href="/" className="font-medium text-zinc-900 underline-offset-4 hover:underline">
            Home
          </Link>
        </div>
      </article>
    </SitePageContainer>
  );
}

export function LegalSection({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-base font-semibold text-zinc-900">{heading}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
