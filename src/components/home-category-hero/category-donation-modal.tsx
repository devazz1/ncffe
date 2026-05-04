"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { CampaignCartScope } from "@/components/campaign-cart-scope";
import { CampaignProductCard } from "@/components/campaign-product-card";
import { CampaignOverviewSummary } from "@/components/category/campaign-overview-summary";
import { HeroMedia } from "@/components/category/category-campaign-overview";
import { CategoryHowWeWorkSection } from "@/components/category/category-how-we-work-section";
import { CategoryImpactSection } from "@/components/category/category-impact-section";
import { CategoryTopDonationsSection } from "@/components/category/category-top-donations-section";
import { DonationForm } from "@/components/donation-form";
import { HOW_WE_WORK_DUMMY, IMPACT_DUMMY } from "@/data/category";
import type { CampaignProduct, TopDonationItem } from "@/lib/types";
import type { HeroCategorySlide } from "./hero-category-slide";

type CategoryDonationModalProps = {
  open: boolean;
  slide: HeroCategorySlide | null;
  topDonationItems: TopDonationItem[];
  onClose: () => void;
};

function useCampaignProducts(campaignId: number | null, open: boolean) {
  return useQuery({
    queryKey: ["campaign-products", campaignId],
    queryFn: async () => {
      const { data } = await apiClient.get<{ data: CampaignProduct[] }>(
        `/campaigns/${campaignId}/products`,
      );
      return data.data;
    },
    enabled: open && campaignId != null,
    staleTime: 5 * 60 * 1000,
  });
}

export function CategoryDonationModal({
  open,
  slide,
  topDonationItems,
  onClose,
}: CategoryDonationModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const campaignId = slide?.activeCampaignId ?? null;
  const campaignName = slide?.activeCampaign?.name ?? "";
  const impactStats = slide?.bodyDetails?.impact ?? IMPACT_DUMMY;
  const howWeWorkSteps = slide?.bodyDetails?.howWeWork ?? HOW_WE_WORK_DUMMY;

  const heroVideo = slide?.heroVideo;
  const heroPoster = slide?.heroPoster;
  const description = slide?.activeCampaign?.description ?? slide?.description;
  const donationCount = slide?.activeCampaign?.successDonations.count ?? 0;
  const goalAmount = slide?.activeCampaign?.goalAmount;
  const amountRaised = slide?.activeCampaign?.successDonations.totalAmount;

  const productsQuery = useCampaignProducts(campaignId, open);

  if (!open || !slide) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-2 md:items-center md:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Category donation modal"
    >
      <div
        className="relative max-h-[100vh] w-full max-w-3xl overflow-y-auto bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close donation modal"
          onClick={onClose}
          className="absolute right-3 top-3 z-30 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/95 text-white shadow-md backdrop-blur transition hover:bg-zinc-100 hover:text-zinc-900"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>

        {campaignId == null ? (
          <div className="p-6 pt-14">
            <p className="text-sm text-zinc-700">
              This category currently has no active campaign.
            </p>
            <CategoryTopDonationsSection items={topDonationItems} />
          </div>
        ) : productsQuery.isLoading ? (
          <div className="p-6 pt-14 text-sm text-zinc-600">Loading campaign details...</div>
        ) : productsQuery.isError ? (
          <div className="p-6 pt-14 text-sm text-red-600">
            Unable to load campaign products right now. Please try again.
          </div>
        ) : (
          <div>
            <CampaignCartScope campaignId={campaignId}>
              <section className="space-y-6">
                <HeroMedia heroVideo={heroVideo} heroPoster={heroPoster} name={campaignName} />
                <div className="p-4 md:p-6">
                  <CampaignOverviewSummary
                    name={campaignName}
                    donationCount={donationCount}
                    goalAmount={goalAmount}
                    amountRaised={amountRaised}
                    description={description}
                  />
                </div>
                {(productsQuery.data ?? []).length > 0 ? (
                  <div className="p-4 md:p-6">
                    <h2 className="text-xl font-medium">
                      Donate a price of product
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {(productsQuery.data ?? []).map((product) => (
                        <CampaignProductCard
                          key={product.campaignProductId}
                          campaignId={campaignId}
                          product={product}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
                <div className="p-4 md:p-6">
                  <DonationForm
                    campaignName={campaignName}
                    campaignId={campaignId}
                    products={productsQuery.data ?? []}
                  />
                </div>
              </section>
            </CampaignCartScope>
            <div className="mt-6 p-4 md:p-6">
              <CategoryImpactSection stats={impactStats} />
              <CategoryHowWeWorkSection steps={howWeWorkSteps} />
              <CategoryTopDonationsSection items={topDonationItems} />
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
