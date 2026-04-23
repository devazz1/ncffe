import { getCategories } from "@/lib/api";
import { CategoryHeroCarousel } from "@/components/home-category-hero/category-hero-carousel";
import { categoryToHeroSlide } from "@/components/home-category-hero/hero-category-slide";
import { ImpactStatsSection } from "@/components/home/impact-stats-section";
import { DonateCtaSection } from "@/components/home/donate-cta-section";
import { HomeStoriesSection } from "@/components/home/home-stories-section";
import { MissionSection } from "@/components/home/mission-section";
import { SupportingLivesGallerySection } from "@/components/supporting-lives-gallery-section";
// import { SitePageContainer } from "@/components/site-page-container";

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

  const heroSlides = categories.map(categoryToHeroSlide);

  return (
    <>
      {heroSlides.length > 0 ? (
        <div className="mb-5 lg:mb-10">
          <CategoryHeroCarousel categories={heroSlides} />
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 md:px-12">
        <ImpactStatsSection />
      </div>

      <div className="mb-10">
        <MissionSection />
      </div>

      <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 md:px-12">
        <HomeStoriesSection />
      </div>

      <div className="mb-10 mt-10">
        <DonateCtaSection donateHref={donateCtaHref} />
      </div>

      <div>
        <SupportingLivesGallerySection />
      </div>
    </>
  );
}
