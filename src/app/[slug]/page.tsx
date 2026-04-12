import { notFound } from "next/navigation";
import {
  getCampaignProducts,
  getCategoryBySlug,
  getTopDonations,
} from "@/lib/api";
import { DonationForm } from "@/components/donation-form";
import type { TopDonationItem } from "@/lib/types";

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

function formatTopDonationInr(amount: string) {
  const n = Number(amount);
  if (!Number.isFinite(n)) {
    return amount;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(n);
}

function TopDonationsSection({ items }: { items: TopDonationItem[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="rounded-lg border border-zinc-200 bg-white p-6"
      aria-labelledby="top-donations-heading"
    >
      <h2
        id="top-donations-heading"
        className="text-lg font-semibold text-zinc-900"
      >
        Top donations
      </h2>
      <p className="mt-1 text-sm text-zinc-600">
        Largest successful donations, highest first.
      </p>
      <ul className="mt-4 divide-y divide-zinc-100">
        {items.map((item, index) => (
          <li
            key={`${item.name}-${item.amount}-${index}`}
            className="flex items-center justify-between gap-4 py-3 text-sm first:pt-0 last:pb-0"
          >
            <span className="font-medium text-zinc-900">{item.name}</span>
            <span className="tabular-nums text-zinc-800">
              {formatTopDonationInr(item.amount)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) {
    notFound();
  }

  const [categoryResponse, topDonationsResponse] = await Promise.all([
    getCategoryBySlug(slug),
    getTopDonations(),
  ]);
  const category = categoryResponse.data;
  const topDonationItems = topDonationsResponse.data.items;

  if (!category.activeCampaignId) {
    return (
      <>
        <section className="rounded-lg border border-zinc-200 bg-white p-6">
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="mt-2 text-sm text-zinc-900">
            This category currently has no active campaign.
          </p>
        </section>
        <div className="mt-6">
          <TopDonationsSection items={topDonationItems} />
        </div>
      </>
    );
  }

  const productsResponse = await getCampaignProducts(category.activeCampaignId);
  const products = productsResponse.data;

  return (
    <>
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
        <DonationForm
          campaignName={category.activeCampaign?.name ?? ""}
          campaignId={category.activeCampaignId}
          products={products}
        />
      </section>
      <div className="mt-6">
        <TopDonationsSection items={topDonationItems} />
      </div>
    </>
  );
}
