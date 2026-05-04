import { notFound } from "next/navigation";
import Link from "next/link";
import { CircleChevronRight } from "lucide-react";
import {
  getCampaignProducts,
  getCategories,
  getCategoryBySlug,
  getTopDonations,
} from "@/lib/api";
import { ServerHttpError, ServerNetworkError } from "@/lib/api/server";
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

/** Matches ISR window used by `serverGet` for category APIs (see `@/lib/api`). */
export const revalidate = 300;

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

/** Pre-render known slugs at build when the API is reachable; runtime unknown slugs stay on-demand. */
export async function generateStaticParams() {
  try {
    const res = await getCategories();
    return res.data.items.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

/** Route-level API failures render the global 404 instead of an opaque runtime error. */
function shouldUseNotFoundForCauseApiError(error: unknown): boolean {
  return (
    error instanceof ServerNetworkError || error instanceof ServerHttpError
  );
}

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

  let categoryResponse: Awaited<ReturnType<typeof getCategoryBySlug>>;
  let topDonationsResponse: Awaited<ReturnType<typeof getTopDonations>>;

  try {
    [categoryResponse, topDonationsResponse] = await Promise.all([
      getCategoryBySlug(slug),
      getTopDonations(),
    ]);
  } catch (error) {
    if (shouldUseNotFoundForCauseApiError(error)) {
      notFound();
    }
    throw error;
  }

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

  let productsResponse: Awaited<ReturnType<typeof getCampaignProducts>>;
  try {
    productsResponse = await getCampaignProducts(category.activeCampaignId);
  } catch (error) {
    if (shouldUseNotFoundForCauseApiError(error)) {
      notFound();
    }
    throw error;
  }
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
        <section className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_minmax(380px,585px)] lg:gap-x-12 lg:items-start">
          <div className="order-1 min-w-0 max-lg:mb-6 lg:col-start-1 lg:row-start-1">
            <CategoryCampaignOverview
              category={category}
              campaignId={campaignId}
              products={products}
            />
          </div>
          <div className="order-3 min-w-0 lg:col-start-1 lg:row-start-2">
            <CategoryAboutCampaignSection items={aboutItems} />
            <CategoryImpactSection stats={impactStats} />
            <CategoryHowWeWorkSection steps={howWeWorkSteps} />
            <CategoryFaqSection items={faqItems} />
            <CategoryTopDonationsSection items={topDonationItems} />
            <SupportRealImpactCta />
          </div>
          <div className="order-2 min-h-0 min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-stretch">
            <div className="lg:sticky lg:top-6">
              <DonationForm
                campaignName={category.activeCampaign?.name ?? ""}
                campaignId={campaignId}
                products={products}
              />
            </div>
          </div>
        </section>
      </CampaignCartScope>
    </SitePageContainer>
  );
}
