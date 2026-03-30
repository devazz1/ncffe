import { notFound } from "next/navigation";
import { getCampaignProducts, getCategoryBySlug } from "@/lib/api";
import { DonationForm } from "@/components/donation-form";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const RESERVED_SLUGS = new Set([
  "about",
  "stories",
  "dashboard",
  "donations",
  "api",
]);

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) {
    notFound();
  }

  const categoryResponse = await getCategoryBySlug(slug);
  const category = categoryResponse.data;

  if (!category.activeCampaignId) {
    return (
      <section className="rounded-lg border border-zinc-200 bg-white p-6">
        <h1 className="text-2xl font-bold">{category.name}</h1>
        <p className="mt-2 text-sm text-zinc-900">
          This category currently has no active campaign.
        </p>
      </section>
    );
  }

  const productsResponse = await getCampaignProducts(category.activeCampaignId);
  const products = productsResponse.data;

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
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
      </div>
      <DonationForm campaignId={category.activeCampaignId} products={products} />
    </section>
  );
}
