"use client";

import { useEffect, type ReactNode } from "react";
import { useCampaignProductCartStore } from "@/stores/campaign-product-cart-store";

type CampaignCartScopeProps = {
  campaignId: number;
  children: ReactNode;
};

/** Clears this campaign's product cart when the scope unmounts (e.g. user leaves the category page). */
export function CampaignCartScope({ campaignId, children }: CampaignCartScopeProps) {
  const clearCampaign = useCampaignProductCartStore((s) => s.clearCampaign);

  useEffect(() => {
    return () => {
      clearCampaign(campaignId);
    };
  }, [campaignId, clearCampaign]);

  return <>{children}</>;
}
