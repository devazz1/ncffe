import type { Category } from "@/lib/types";

/** Shared shape for hero carousel slides and the category card strip. */
export type HeroCategorySlide = {
  id: string | number;
  title: string;
  heroPoster: string;
  heroVideo?: string | null;
  description?: string | null;
  detailsHref: string;
  donateHref: string;
  donationCount: number;
};

/** Maps API categories to hero slides — keep slide fields in sync with {@link HeroCategorySlide} here only. */
export function categoryToHeroSlide(c: Category): HeroCategorySlide {
  return {
    id: c.categoryId,
    title: c.name,
    heroPoster: c.heroPoster ?? "",
    heroVideo: c.heroVideo,
    description: c.description,
    detailsHref: `/${c.slug}`,
    donateHref: `/${c.slug}`,
    donationCount: c.activeCampaign?.successDonations.count ?? 0,
  };
}
