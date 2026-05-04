"use client";

import { BadgePercent, Users } from "lucide-react";

export function formatIndianCurrencyCompact(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "₹0";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function parseAmount(value?: string | number | null) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value !== "string") {
    return 0;
  }

  const parsedValue = Number.parseFloat(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

export type CampaignOverviewSummaryProps = {
  name: string;
  donationCount?: number | null;
  goalAmount?: string | number | null;
  amountRaised?: string | number | null;
  description?: string | null;
};

export function CampaignOverviewSummary({
  name,
  donationCount,
  goalAmount,
  amountRaised,
  description,
}: CampaignOverviewSummaryProps) {
  const normalizedGoalAmount = Math.max(parseAmount(goalAmount), 0);
  const normalizedAmountRaised = Math.max(parseAmount(amountRaised), 0);

  const progressPercentage =
    normalizedGoalAmount > 0
      ? Math.min((normalizedAmountRaised / normalizedGoalAmount) * 100, 100)
      : 0;

  return (
    <>
      <h1 className="mt-4 text-2xl font-semibold">{name}</h1>

      <div className="mt-3 flex flex-col items-start justify-between gap-4 md:min-h-24 md:flex-row md:justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 whitespace-nowrap">
            <Users className="size-4 text-[#FF847C]" />
            <span className="text-sm text-zinc-500">
              {donationCount ?? 0} Peoples helped us
            </span>
          </div>
          <div>
            <span className="inline-flex h-9 items-center gap-2 rounded-[5px] border border-slate-500 px-2 text-sm font-medium text-slate-600">
              <span>Tax Benefit</span>
              <BadgePercent className="size-5" aria-hidden />
            </span>
          </div>
        </div>

        <div className="w-[197px] max-w-full space-y-1">
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="font-medium text-slate-400">
              {formatIndianCurrencyCompact(normalizedAmountRaised)}
            </span>
            <span className="text-zinc-900">
              of {formatIndianCurrencyCompact(normalizedGoalAmount)}
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-[#e0e0e0]">
            <div
              className="h-full rounded-full bg-cta-gradient transition-[width] duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <p className="text-sm text-zinc-500">{description ?? " "}</p>
    </>
  );
}
