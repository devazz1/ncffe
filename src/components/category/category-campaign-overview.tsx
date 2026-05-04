"use client";

import { CampaignOverviewSummary } from "@/components/category/campaign-overview-summary";
import { CampaignProductCard } from "@/components/campaign-product-card";
import type { CampaignProduct, Category } from "@/lib/types";
import { Volume2, VolumeX } from "lucide-react";
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

export function HeroMedia({ heroVideo, heroPoster, name }: HeroMediaProps) {
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
      <div className={`relative w-full overflow-hidden ${ratioClass}`}>
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

  const description = category.activeCampaign?.description ?? category.description;
  const name = category.activeCampaign?.name ?? category.name;

  const donationCount = category.activeCampaign?.successDonations.count;
  const goalAmount = category.activeCampaign?.goalAmount;
  const amountRaised = category.activeCampaign?.successDonations.totalAmount;

  return (
    <div className="rounded-t-2xl overflow-hidden">
      <HeroMedia heroVideo={heroVideo} heroPoster={heroPoster} name={name} />

      <CampaignOverviewSummary
        name={name}
        donationCount={donationCount}
        goalAmount={goalAmount}
        amountRaised={amountRaised}
        description={description}
      />

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
