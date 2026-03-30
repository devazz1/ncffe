"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getDonationStatus } from "@/lib/api";

const MAX_AUTO_RETRIES = 2;
const RETRY_DELAY_MS = 3000;

export function DonationStatusClient() {
  const params = useSearchParams();
  const receipt = params.get("receipt") ?? "";
  const [manualCount, setManualCount] = useState(0);

  const query = useQuery({
    queryKey: ["donation-status", receipt, manualCount],
    queryFn: () => getDonationStatus(receipt),
    enabled: Boolean(receipt),
    retry: (failureCount, error) => {
      if (failureCount >= MAX_AUTO_RETRIES) return false;
      const message = error instanceof Error ? error.message.toLowerCase() : "";
      return !message.includes("invalid receipt");
    },
    retryDelay: RETRY_DELAY_MS,
  });

  const title = useMemo(() => {
    const status = query.data?.data.status;
    if (status === "success") return "Thank you for your donation";
    if (status === "failed") return "Payment failed";
    if (status === "pending") return "We are processing your transaction";
    return "Donation status";
  }, [query.data?.data.status]);

  if (!receipt) {
    return (
      <div className="mx-auto w-full max-w-2xl rounded-lg border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Donation status</h1>
        <p className="mt-2 text-sm text-zinc-800">
          Missing receipt. Please return to a category and start your donation again.
        </p>
      </div>
    );
  }

  if (query.isLoading) {
    return <p className="mx-auto w-full max-w-2xl">Checking donation status...</p>;
  }

  if (query.isError) {
    return (
      <div className="mx-auto w-full max-w-2xl rounded-lg border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Donation status</h1>
        <p className="mt-2 text-sm text-red-600">
          Could not verify status. Please try recheck.
        </p>
        <button
          className="mt-4 rounded border border-zinc-300 px-3 py-2"
          onClick={() => setManualCount((c) => c + 1)}
        >
          Recheck
        </button>
      </div>
    );
  }

  const status = query.data?.data.status;

  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg border border-zinc-200 bg-white p-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-zinc-800">Receipt: {receipt}</p>
      {status === "success" ? (
        <p className="mt-4 text-green-700">Your payment is confirmed.</p>
      ) : null}
      {status === "failed" ? (
        <p className="mt-4 text-red-700">The payment did not complete. Please try again.</p>
      ) : null}
      {status === "pending" ? (
        <div className="mt-4">
          <p className="text-amber-700">
            We are processing your transaction. You can recheck the status.
          </p>
          <button
            className="mt-3 rounded border border-zinc-300 px-3 py-2"
            onClick={() => setManualCount((c) => c + 1)}
          >
            Recheck
          </button>
        </div>
      ) : null}
    </div>
  );
}
