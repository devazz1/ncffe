"use client";

import { type ReactNode, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AuthModal } from "@/components/auth-modal";
import { getDonationStatus } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";

const MAX_AUTO_RETRIES = 2;
const RETRY_DELAY_MS = 3000;

function StatusShell({
  title,
  receipt,
  toneClasses,
  children,
}: {
  title: string;
  receipt: string;
  toneClasses: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-2xl rounded-xl border bg-white p-6 shadow-sm ${toneClasses}`}>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-zinc-700">Receipt: {receipt}</p>
      <div className="mt-5 border-t border-current/10 pt-4">{children}</div>
    </div>
  );
}

export function DonationStatusClient() {
  const params = useSearchParams();
  const receipt = params.get("receipt") ?? "";
  const [manualCount, setManualCount] = useState(0);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authPurpose, setAuthPurpose] = useState<"login" | "register">("login");
  const token = useAuthStore((s) => s.accessToken);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

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
    return (
      <div className="mx-auto w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-zinc-900">Checking donation status</h1>
        <p className="mt-2 text-sm text-zinc-700">
          Please wait while we verify your payment details.
        </p>
      </div>
    );
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

  if (status === "success") {
    return (
      <StatusShell
        title="Thank you for your donation"
        receipt={receipt}
        toneClasses="border-emerald-200 bg-emerald-50/50 text-emerald-900"
      >
        <p className="text-sm text-emerald-800">
          You will receive a confirmation message shortly on your registered email.
        </p>
        {hasHydrated && token ? (
          <div className="mt-4 rounded-lg bg-white/70 p-3 text-sm text-emerald-900">
            <p>
              You are already logged in. Please check your dashboard for donation details,
              certificates, and more.
            </p>
            <Link
              href="/dashboard"
              className="mt-3 inline-flex rounded-md border border-emerald-300 bg-white px-3 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-100"
            >
              Checkout dashboard
            </Link>
          </div>
        ) : hasHydrated ? (
          <div className="mt-4 rounded-lg bg-white/70 p-3 text-sm text-emerald-900">
            <p>
              To get your certificate and see donation details, please login or register with the
              same email used for this donation.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-md border border-emerald-300 bg-white px-3 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-100"
                onClick={() => {
                  setAuthPurpose("login");
                  setIsAuthOpen(true);
                }}
              >
                Login
              </button>
              <button
                type="button"
                className="rounded-md border border-emerald-300 bg-white px-3 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-100"
                onClick={() => {
                  setAuthPurpose("register");
                  setIsAuthOpen(true);
                }}
              >
                Register
              </button>
            </div>
            <AuthModal
              key={`${String(isAuthOpen)}-${authPurpose}`}
              open={isAuthOpen}
              initialPurpose={authPurpose}
              onClose={() => setIsAuthOpen(false)}
            />
          </div>
        ) : null}
      </StatusShell>
    );
  }

  if (status === "failed") {
    return (
      <StatusShell title="Payment failed" receipt={receipt} toneClasses="border-rose-200 bg-rose-50/60 text-rose-900">
        <p className="text-sm text-rose-800">
          The payment did not complete. Please try again with a valid payment method.
        </p>
        <div className="mt-4 rounded-lg bg-white/70 p-3 text-sm text-rose-900">
          If money was debited, it is usually reversed automatically by your provider.
        </div>
      </StatusShell>
    );
  }

  if (status === "pending") {
    return (
      <StatusShell
        title="We are processing your transaction"
        receipt={receipt}
        toneClasses="border-amber-200 bg-amber-50/60 text-amber-900"
      >
        <p className="text-sm text-amber-800">
          Your bank or payment provider is still confirming this transaction.
        </p>
        <div className="mt-4 rounded-lg bg-white/70 p-3 text-sm text-amber-900">
          You can check again in a few moments.
        </div>
        <button
          className="mt-4 rounded-md border border-amber-300 bg-white px-3 py-2 text-sm font-medium text-amber-900 hover:bg-amber-100"
          onClick={() => setManualCount((c) => c + 1)}
        >
          Recheck status
        </button>
      </StatusShell>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg border border-zinc-200 bg-white p-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-zinc-800">Receipt: {receipt}</p>
      <p className="mt-4 text-sm text-zinc-700">Status is currently unavailable. Please recheck shortly.</p>
    </div>
  );
}
