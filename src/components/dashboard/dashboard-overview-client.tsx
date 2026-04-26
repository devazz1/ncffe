"use client";

import { useQuery } from "@tanstack/react-query";
import { Heart, Sprout, Users } from "lucide-react";
import { DashboardDonationsTable } from "@/components/dashboard/dashboard-donations-table";
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
  helper?: string;
};

function StatCard({ title, value, helper }: StatCardProps) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-5">
      <p className="text-sm text-zinc-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-900">{value}</p>
      {helper ? <p className="mt-1 text-xs text-zinc-500">{helper}</p> : null}
    </article>
  );
}

function ImpactStatsCard({
  contributions,
  totalDonated,
  campaignsSupported,
}: {
  contributions: number;
  totalDonated: string;
  campaignsSupported: number;
}) {
  return (
    <aside className="rounded-3xl border border-zinc-200 bg-white p-6">
      <div className="relative flex flex-col gap-10 md:gap-12">
        <article className="group relative flex transition-transform duration-300 hover:-translate-y-1 md:justify-end">
          <div className="flex w-full items-center gap-4 rounded-2xl p-1 transition-shadow duration-300 group-hover:shadow-sm md:max-w-[78%]">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-rose-500 text-white">
              <Heart size={20} />
            </div>
            <div>
              <p className="text-base font-medium text-zinc-500">Total donations made</p>
              <p className="text-xl font-semibold text-rose-500">
                {contributions} Contribution{contributions === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        </article>

        <article className="group relative flex transition-transform duration-300 hover:-translate-y-1 md:justify-start">
          <div className="flex w-full items-center gap-4 rounded-2xl p-1 transition-shadow duration-300 group-hover:shadow-sm md:max-w-[78%]">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lime-600 text-white">
              <Users size={20} />
            </div>
            <div>
              <p className="text-base font-medium text-zinc-500">Lives supported</p>
              <p className="text-xl font-semibold text-lime-600">{Math.ceil(Number(totalDonated) / 500)}</p>
            </div>
          </div>
        </article>

        <article className="group relative flex transition-transform duration-300 hover:-translate-y-1 md:justify-end">
          <div className="flex w-full items-center gap-4 rounded-2xl p-1 transition-shadow duration-300 group-hover:shadow-sm md:max-w-[78%]">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sky-500 text-white">
              <Sprout size={20} />
            </div>
            <div>
              <p className="text-base font-medium text-zinc-500">Cause you supported</p>
              <p className="text-xl font-semibold text-amber-600">
                {campaignsSupported} campaign{campaignsSupported === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        </article>
      </div>
    </aside>
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
      <section className="rounded-lg p-6">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
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
            />
            <StatCard
              title="Total Amount Donated"
              value={totalAmountDonated}
              // helper="Sum of successful donation amounts."
            />
            <StatCard
              title="Campaigns Supported"
              value={String(stats.campaignsSupportedCount)}
              // helper="Distinct campaigns you have supported."
            />
          </div>
        )}
      </section>
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0">
          <DashboardDonationsTable />
        </div>
        {statsQuery.isLoading ? (
          <aside className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <p className="text-sm text-zinc-700">Loading impact stats…</p>
          </aside>
        ) : statsQuery.isError || !stats ? (
          <aside className="rounded-3xl border border-red-200 bg-red-50 p-6">
            <p className="text-sm text-red-700">
              Unable to load impact stats right now.
            </p>
          </aside>
        ) : (
          <ImpactStatsCard
            contributions={stats.successDonationCount}
            totalDonated={stats.totalAmountDonated}
            campaignsSupported={stats.campaignsSupportedCount}
          />
        )}
      </section>
    </div>
  );
}
