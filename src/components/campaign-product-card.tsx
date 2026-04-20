"use client";

import Image from "next/image";

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

  const imageSrc = product.imageUrl?.trim() ?? "";

  return (
    <article className="flex h-[175px] w-[202.5px] max-w-full min-w-0 flex-col overflow-hidden rounded-lg border border-[#E8E9EA] bg-white">
      <div className="relative h-[116px] w-full shrink-0 bg-zinc-100">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 220px"
            unoptimized
          />
        ) : null}
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-2 pt-1.5 pb-2">
        <h3 className="line-clamp-2 text-sm font-normal leading-snug text-black">
          {product.name}
        </h3>
        <div className="mt-1 flex min-h-[22px] items-center justify-between gap-2">
          <p className="shrink-0 text-sm text-black tabular-nums">
            {formatCurrencyINR(toNumber(product.unitPrice))}
          </p>
          {qty === 0 ? (
            <div className="rounded-[5px] bg-cta-gradient p-px">
              <button
                type="button"
                onClick={() =>
                  adjustQty(campaignId, product.campaignProductId, 1)
                }
                className="flex h-[20px] min-w-[39px] items-center justify-center rounded-[4px] bg-white px-2 text-xs font-medium leading-none"
              >
                <span className="bg-cta-gradient bg-clip-text text-transparent">
                  Add
                </span>
              </button>
            </div>
          ) : (
            <div className="rounded-[5px] bg-cta-gradient p-px">
              <div className="flex min-w-0 items-center justify-center gap-1 rounded-[4px] bg-white px-2 py-1">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() =>
                    adjustQty(campaignId, product.campaignProductId, -1)
                  }
                  className="flex size-[16px] shrink-0 items-center justify-center rounded-full border border-zinc-400 text-sm leading-none text-black"
                >
                  −
                </button>
                <span className="min-w-[1ch] text-center text-sm font-semibold tabular-nums text-black">
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() =>
                    adjustQty(campaignId, product.campaignProductId, 1)
                  }
                  className="flex size-[16px] shrink-0 items-center justify-center rounded-full border border-zinc-400 text-sm leading-none text-black"
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
