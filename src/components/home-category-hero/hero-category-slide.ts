import type { Category } from "@/lib/types";

/** Shared shape for hero carousel slides and the category card strip. */
export type HeroCategorySlide = {
  categoryId: number;
  id: string | number;
  slug: string;
  name: string;
  displayOrder: number;
  title: string;
  heroPoster: string;
  heroVideo: string | null;
  description: string | null;
  detailsHref: string;
  donateHref: string;
  donationCount: number;
  bodyDetails: Category["bodyDetails"];
  activeCampaignId: number | null;
  activeCampaign: Category["activeCampaign"];
};

/** Maps API categories to hero slides — keep slide fields in sync with {@link HeroCategorySlide} here only. */
export function categoryToHeroSlide(c: Category): HeroCategorySlide {
  return {
    categoryId: c.categoryId,
    id: c.categoryId,
    slug: c.slug,
    name: c.name,
    displayOrder: c.displayOrder,
    title: c.name,
    heroPoster: c.heroPoster ?? "",
    heroVideo: c.heroVideo,
    description: c.description,
    detailsHref: `/${c.slug}`,
    donateHref: `/${c.slug}`,
    donationCount: c.activeCampaign?.successDonations.count ?? 0,
    bodyDetails: c.bodyDetails,
    activeCampaignId: c.activeCampaignId,
    activeCampaign: c.activeCampaign,
  };
}
