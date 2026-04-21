import { notFound } from "next/navigation";
import Link from "next/link";
import { CircleChevronRight } from "lucide-react";
import {
  getCampaignProducts,
  getCategoryBySlug,
  getTopDonations,
} from "@/lib/api";
import { CampaignCartScope } from "@/components/campaign-cart-scope";
import { CategoryAboutCampaignSection } from "@/components/category/category-about-campaign-section";
import { CategoryCampaignOverview } from "@/components/category/category-campaign-overview";
import { CategoryFaqSection } from "@/components/category/category-faq-section";
import { CategoryHowWeWorkSection } from "@/components/category/category-how-we-work-section";
import { CategoryImpactSection } from "@/components/category/category-impact-section";
import { CategoryTopDonationsSection } from "@/components/category/category-top-donations-section";
import { DonationForm } from "@/components/donation-form";
import {
  ABOUT_DUMMY,
  FAQ_DUMMY,
  HOW_WE_WORK_DUMMY,
  IMPACT_DUMMY,
} from "@/data/category";
import type { BodyDetails } from "@/lib/types";
import { SitePageContainer } from "@/components/site-page-container";

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

function isBodyDetails(value: unknown): value is Partial<BodyDetails> {
  if (!value || typeof value !== "object") {
    return false;
  }

  const details = value as Record<string, unknown>;
  return (
    (!("about" in details) || Array.isArray(details.about)) &&
    (!("impact" in details) || Array.isArray(details.impact)) &&
    (!("howWeWork" in details) || Array.isArray(details.howWeWork)) &&
    (!("faq" in details) || Array.isArray(details.faq))
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
          className="text-base font-medium leading-tight tracking-tight text-[#d11f19] sm:text-xl md:leading-snug"
        >
          Support us in Creating Real impact
        </h2>
        <p className="text-sm leading-relaxed">
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
            <CircleChevronRight className="size-4 text-white" strokeWidth={2} />
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
          <CategoryTopDonationsSection items={topDonationItems} />
        </div>
      </SitePageContainer>
    );
  }

  const productsResponse = await getCampaignProducts(category.activeCampaignId);
  const products = productsResponse.data;

  const bodyDetailsSource = category.bodyDetails;
  const bodyDetails = isBodyDetails(bodyDetailsSource)
    ? bodyDetailsSource
    : undefined;
  const aboutItems = bodyDetails?.about ?? ABOUT_DUMMY;
  const impactStats = bodyDetails?.impact ?? IMPACT_DUMMY;
  const howWeWorkSteps = bodyDetails?.howWeWork ?? HOW_WE_WORK_DUMMY;
  const faqItems = bodyDetails?.faq ?? FAQ_DUMMY;

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
          <CategoryAboutCampaignSection items={aboutItems} />
          <CategoryImpactSection stats={impactStats} />
          <CategoryHowWeWorkSection steps={howWeWorkSteps} />
          <CategoryFaqSection items={faqItems} />
          <CategoryTopDonationsSection items={topDonationItems} />
          <SupportRealImpactCta />
        </div>
      </section>
    </SitePageContainer>
  );
}
