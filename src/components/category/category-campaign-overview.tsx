 "use client";

import { CampaignProductCard } from "@/components/campaign-product-card";
import type { CampaignProduct, Category } from "@/lib/types";
import { BadgePercent, Users, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

type CategoryCampaignOverviewProps = {
  category: Category;
  campaignId: number;
  products: CampaignProduct[];
};

type HeroMediaProps = {
  heroVideo?: string | null;
  heroPoster?: string | null;
  name: string;
};

function formatIndianCurrencyCompact(value?: number) {
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

function parseAmount(value?: string | number | null) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value !== "string") {
    return 0;
  }

  const parsedValue = Number.parseFloat(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function HeroMedia({ heroVideo, heroPoster, name }: HeroMediaProps) {
  const ratioClass = "aspect-[1015/567]";
  const mediaClass = "h-full w-full object-cover";
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasVideo = Boolean(heroVideo);

  const handleVolumeClick = () => {
    if (!hasVideo) {
      return;
    }

    setIsMuted((current) => {
      const next = !current;
      if (videoRef.current) {
        videoRef.current.muted = next;
      }
      return next;
    });
  };

  return (
    <section className="w-full overflow-hidden">
      <div className={`relative w-full rounded-t-2xl overflow-hidden ${ratioClass}`}>
        {heroVideo ? (
          <video
            ref={videoRef}
            className={mediaClass}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            poster={heroPoster ?? undefined}
          >
            <source src={heroVideo} />
            {heroPoster ? (
              <img
                src={heroPoster}
                alt={`${name} hero poster`}
                className={mediaClass}
              />
            ) : null}
          </video>
        ) : heroPoster ? (
          <img src={heroPoster} alt={`${name} hero poster`} className={mediaClass} />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-sm text-zinc-500">
            Hero media unavailable
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-zinc-900/85" />
        <div className="absolute bottom-4 right-4 z-10">
          <button
            type="button"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            disabled={!hasVideo}
            onClick={handleVolumeClick}
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/35 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/55 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isMuted ? (
              <VolumeX className="size-5" aria-hidden />
            ) : (
              <Volume2 className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export function CategoryCampaignOverview({
  category,
  campaignId,
  products,
}: CategoryCampaignOverviewProps) {
  const heroVideo = category.heroVideo;
  const heroPoster = category.heroPoster;
  const description = category.description;
  const name = category.name;

  const donationCount = category.activeCampaign?.successDonations.count;

  const goalAmount = category.activeCampaign?.goalAmount;
  const amountRaised = category.activeCampaign?.successDonations.totalAmount;
  const normalizedGoalAmount = Math.max(parseAmount(goalAmount), 0);
  const normalizedAmountRaised = Math.max(parseAmount(amountRaised), 0);

  const progressPercentage =
    normalizedGoalAmount > 0
      ? Math.min((normalizedAmountRaised / normalizedGoalAmount) * 100, 100)
      : 0;

  return (
    <div>
      <HeroMedia heroVideo={heroVideo} heroPoster={heroPoster} name={name} />

      <h1 className="text-2xl font-semibold mt-4">{name}</h1>

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

      <p className="text-sm text-zinc-500">
        {description ?? " "}
      </p>

      {products.length > 0 && (
        <div className="mt-6 space-y-3">
          <h2 className="text-xl font-medium">
            Donate a price of product
          </h2>
          <div className="flex flex-wrap gap-2">
            {products.map((product) => (
              <CampaignProductCard
                key={product.campaignProductId}
                campaignId={campaignId}
                product={product}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
