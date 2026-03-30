import { Suspense } from "react";
import { DonationStatusClient } from "@/components/donation-status-client";

export default function DonationStatusPage() {
  return (
    <Suspense fallback={<p>Loading status page...</p>}>
      <DonationStatusClient />
    </Suspense>
  );
}
