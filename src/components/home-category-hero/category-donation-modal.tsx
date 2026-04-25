"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { CampaignCartScope } from "@/components/campaign-cart-scope";
import { CategoryCampaignOverview } from "@/components/category/category-campaign-overview";
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
        className="max-h-[100vh] w-full max-w-3xl overflow-y-auto bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-center justify-end border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur md:px-6">
          <button
            type="button"
            aria-label="Close donation modal"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        {campaignId == null ? (
          <div className="p-6">
            <p className="text-sm text-zinc-700">
              This category currently has no active campaign.
            </p>
            <CategoryTopDonationsSection items={topDonationItems} />
          </div>
        ) : productsQuery.isLoading ? (
          <div className="p-6 text-sm text-zinc-600">Loading campaign details...</div>
        ) : productsQuery.isError ? (
          <div className="p-6 text-sm text-red-600">
            Unable to load campaign products right now. Please try again.
          </div>
        ) : (
          <div className="p-4 md:p-6">
            <CampaignCartScope campaignId={campaignId}>
              <section className="space-y-6">
                <CategoryCampaignOverview
                  category={slide}
                  campaignId={campaignId}
                  products={productsQuery.data ?? []}
                />
                <DonationForm
                  campaignName={campaignName}
                  campaignId={campaignId}
                  products={productsQuery.data ?? []}
                />
              </section>
            </CampaignCartScope>
            <div className="mt-6">
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
