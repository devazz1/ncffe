import { getCategories } from "@/lib/api";
import { CategoryHeroCarousel } from "@/components/category-hero/category-hero-carousel";
import { ImpactStatsSection } from "@/components/impact-stats-section";
import { DonateCtaSection } from "@/components/home/donate-cta-section";
import { HomeStoriesSection } from "@/components/home/home-stories-section";
import { MissionSection } from "@/components/home/mission-section";
import { SupportingLivesGallerySection } from "@/components/supporting-lives-gallery-section";
import { SitePageContainer } from "@/components/site-page-container";

export default async function HomePage() {
  let categories = [] as Awaited<ReturnType<typeof getCategories>>["data"]["items"];
  try {
    const response = await getCategories();
    categories = response.data.items;
  } catch {
    categories = [];
  }

  const donateCtaHref =
    categories.length > 0 ? `/${categories[0].slug}` : "/";

  const heroSlides = categories.map((c) => ({
    id: c.categoryId,
    title: c.name,
    heroPoster: c.heroPoster ?? "",
    heroVideo: c.heroVideo,
    description: c.description,
    detailsHref: `/${c.slug}`,
    donateHref: `/${c.slug}`,
  }));

  return (
    <>
      {heroSlides.length > 0 ? (
        <div className="mb-10 lg:mb-14">
          <CategoryHeroCarousel categories={heroSlides} />
        </div>
      ) : null}

      <div className="mb-10">
        <ImpactStatsSection />
      </div>

      <div className="mb-10">
        <MissionSection />
      </div>

      <div className="mb-10">
        <HomeStoriesSection />
      </div>

      <div className="mb-10">
        <DonateCtaSection donateHref={donateCtaHref} />
      </div>

      <div className="mb-10">
        <SupportingLivesGallerySection />
      </div>

      <SitePageContainer>
        <section>
          <h1 className="text-2xl font-bold">Donation Categories</h1>
          <p className="mt-1 text-sm text-zinc-800">
            Browse categories and support active campaigns.
            see categories in detailed view
          </p>
          <p>See other on going activities</p>
        </section>
      </SitePageContainer>
    </>
  );
}
