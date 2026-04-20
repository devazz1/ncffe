import { CampaignProductCard } from "@/components/campaign-product-card";
import type { CampaignProduct, Category } from "@/lib/types";

type CategoryCampaignOverviewProps = {
  category: Category;
  campaignId: number;
  products: CampaignProduct[];
};

export function CategoryCampaignOverview({
  category,
  campaignId,
  products,
}: CategoryCampaignOverviewProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{category.name}</h1>
      <p className="mt-2 text-sm text-zinc-900">
        {category.description ?? "No category description available."}
      </p>
      {category.activeCampaign ? (
        <div className="mt-4 rounded border border-zinc-200 bg-zinc-50 p-4 text-sm">
          <p className="font-semibold">Active campaign</p>
          <p className="mt-1">{category.activeCampaign.name}</p>
          <p className="text-zinc-800">
            Status: {category.activeCampaign.campaignStatus}
          </p>
        </div>
      ) : null}
      {products.length > 0 && (
        <div className="mt-6 space-y-3">
          <h2 className="text-sm font-semibold text-zinc-900">
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
