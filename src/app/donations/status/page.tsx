import { Suspense } from "react";
import { DonationStatusClient } from "@/components/donation-status-client";
import { SitePageContainer } from "@/components/site-page-container";

export default function DonationStatusPage() {
  return (
    <SitePageContainer>
      <Suspense fallback={<p>Loading status page...</p>}>
        <DonationStatusClient />
      </Suspense>
    </SitePageContainer>
  );
}
