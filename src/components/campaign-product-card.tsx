"use client";

import { formatCurrencyINR, toNumber } from "@/lib/format";
import type { CampaignProduct } from "@/lib/types";
import { useCampaignProductCartStore } from "@/stores/campaign-product-cart-store";

type CampaignProductCardProps = {
  campaignId: number;
  product: CampaignProduct;
};

export function CampaignProductCard({
  campaignId,
  product,
}: CampaignProductCardProps) {
  const qty = useCampaignProductCartStore(
    (s) =>
      s.unitsByCampaign[campaignId]?.[product.campaignProductId] ?? 0,
  );
  const adjustQty = useCampaignProductCartStore((s) => s.adjustQty);

  return (
    <div className="rounded border border-zinc-200 p-3">
      <div className="flex items-center justify-between">
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-zinc-800">
          {formatCurrencyINR(toNumber(product.unitPrice))}
        </p>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() =>
            adjustQty(campaignId, product.campaignProductId, -1)
          }
          className="rounded border border-zinc-300 px-2"
        >
          -
        </button>
        <span className="w-8 text-center">{qty}</span>
        <button
          type="button"
          onClick={() =>
            adjustQty(campaignId, product.campaignProductId, 1)
          }
          className="rounded border border-zinc-300 px-2"
        >
          +
        </button>
      </div>
    </div>
  );
}
