"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardDonationsTable } from "@/components/dashboard-donations-table";
import { getMyDonationStatistics } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";

function parseAmount(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatInrWithDecimals(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

type StatCardProps = {
  title: string;
  value: string;
  helper: string;
};

function StatCard({ title, value, helper }: StatCardProps) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-5">
      <p className="text-sm text-zinc-600">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-900">{value}</p>
      <p className="mt-1 text-xs text-zinc-500">{helper}</p>
    </article>
  );
}

export function DashboardOverviewClient() {
  const token = useAuthStore((s) => s.accessToken);

  const statsQuery = useQuery({
    queryKey: ["users", "me", "statistics"],
    queryFn: getMyDonationStatistics,
    enabled: !!token,
  });

  if (!token) return null;

  const stats = statsQuery.data?.data;
  const totalAmountDonated = stats
    ? formatInrWithDecimals(parseAmount(stats.totalAmountDonated))
    : "";

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-zinc-200 bg-zinc-50 p-6">
        <h1 className="text-xl font-semibold">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-zinc-700">
          Your impact summary from successful donations.
        </p>
        {statsQuery.isLoading ? (
          <p className="mt-4 text-sm text-zinc-700">
            Loading your donation statistics…
          </p>
        ) : statsQuery.isError || !stats ? (
          <p className="mt-4 text-sm text-red-700">
            Unable to load donation statistics right now. Please try again shortly.
          </p>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <StatCard
              title="Successful Donations"
              value={String(stats.successDonationCount)}
              helper="Count of completed donations."
            />
            <StatCard
              title="Total Amount Donated"
              value={totalAmountDonated}
              helper="Sum of successful donation amounts."
            />
            <StatCard
              title="Campaigns Supported"
              value={String(stats.campaignsSupportedCount)}
              helper="Distinct campaigns you have supported."
            />
          </div>
        )}
      </section>
      <DashboardDonationsTable />
    </div>
  );
}
