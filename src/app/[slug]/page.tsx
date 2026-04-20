import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  getCampaignProducts,
  getCategoryBySlug,
  getTopDonations,
} from "@/lib/api";
import { CampaignCartScope } from "@/components/campaign-cart-scope";
import { CategoryCampaignOverview } from "@/components/category-campaign-overview";
import { DonationForm } from "@/components/donation-form";
import { SitePageContainer } from "@/components/site-page-container";
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
        className="text-lg text-center font-semibold text-zinc-900"
      >
        Our Top Supporters
      </h2>

      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
        {items.map((item, index) => (
          <li
            key={`${item.name}-${item.amount}-${index}`}
            className="flex min-w-0 items-center justify-between gap-2.5 rounded-md bg-[#d6f2ff] px-2.5 py-2.5 text-sm text-black"
          >
            <span className="min-w-0 flex-1 truncate font-medium" title={item.name}>
              {item.name}
            </span>
            <span className="shrink-0 tabular-nums">
              {formatTopDonationInr(item.amount)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SupportRealImpactCta() {
  return (
    <section
      className="mt-6 flex flex-col gap-8 rounded-3xl border border-[#ffd5c7] bg-linear-to-br from-white to-[#ffd7a4] p-8"
      aria-labelledby="support-impact-heading"
    >
      <div className="flex flex-col gap-2">
        <h2
          id="support-impact-heading"
          className="text-lg font-semibold leading-tight tracking-tight text-[#d11f19] sm:text-xl md:text-[1.75rem] md:leading-snug"
        >
          Support us in Creating Real impact
        </h2>
        <p className="text-sm leading-relaxed text-zinc-950 md:text-base">
          Your generosity can transform lives. Join thousands of donors who are
          creating lasting change in communities across India.
        </p>
      </div>
      <div>
        <Link
          href="#donation"
          className="inline-flex h-10 min-w-50 max-w-full items-center justify-between gap-3 rounded bg-cta-gradient px-4 text-sm font-semibold text-white transition hover:opacity-95"
        >
          <span className="min-w-0 shrink leading-6">Start Monthly Donation</span>
          <span className="flex size-5 shrink-0 items-center justify-center" aria-hidden>
            <ChevronRight className="size-4 text-white" strokeWidth={2} />
          </span>
        </Link>
      </div>
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
      <SitePageContainer>
        <section className="rounded-lg border border-zinc-200 bg-white p-6">
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="mt-2 text-sm text-zinc-900">
            This category currently has no active campaign.
          </p>
        </section>
        <div className="mt-6">
          <TopDonationsSection items={topDonationItems} />
        </div>
      </SitePageContainer>
    );
  }

  const productsResponse = await getCampaignProducts(category.activeCampaignId);
  const products = productsResponse.data;

  const campaignId = category.activeCampaignId;

  return (
    <SitePageContainer>
      <CampaignCartScope campaignId={campaignId}>
        <section className="grid gap-6 lg:grid-cols-[1fr_minmax(380px,525px)]">
          <CategoryCampaignOverview
            category={category}
            campaignId={campaignId}
            products={products}
          />
          <DonationForm
            campaignName={category.activeCampaign?.name ?? ""}
            campaignId={campaignId}
            products={products}
          />
        </section>
      </CampaignCartScope>
      <section className="grid gap-6 lg:grid-cols-[1fr_minmax(380px,525px)]">
        <div>
          <div className="mt-6">
            <TopDonationsSection items={topDonationItems} />
          </div>
          <SupportRealImpactCta />
        </div>
      </section>
    </SitePageContainer>
  );
}
