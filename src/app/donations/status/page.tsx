import { Suspense } from "react";
import { DonationStatusClient } from "@/components/donation-status-client";
import { SitePageContainer } from "@/components/site-page-container";

export default function DonationStatusPage() {
  return (
    <SitePageContainer>
      <Suspense
        fallback={
          <div className="mx-auto w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h1 className="text-xl font-semibold text-zinc-900">Loading donation status</h1>
            <p className="mt-2 text-sm text-zinc-700">Preparing your transaction details...</p>
          </div>
        }
      >
        <DonationStatusClient />
      </Suspense>
    </SitePageContainer>
  );
}
