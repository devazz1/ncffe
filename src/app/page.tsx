import { getCategories, getStories, getTopDonations } from "@/lib/api";
import { CategoryHeroCarousel } from "@/components/home-category-hero/category-hero-carousel";
import { categoryToHeroSlide } from "@/components/home-category-hero/hero-category-slide";
import { ImpactStatsSection } from "@/components/home/impact-stats-section";
import { DonateCtaSection } from "@/components/home/donate-cta-section";
import { HomeStoriesSection } from "@/components/home/home-stories-section";
import { MissionSection } from "@/components/home/mission-section";
import {
  MarqueeGallery,
  supportingLivesGalleryRows,
} from "@/components/supporting-lives-gallery-section";

export default async function HomePage() {
  let categories = [] as Awaited<ReturnType<typeof getCategories>>["data"]["items"];
  let stories = [] as Awaited<ReturnType<typeof getStories>>["data"]["items"];
  let topDonationItems: Awaited<
    ReturnType<typeof getTopDonations>
  >["data"]["items"] = [];
  try {
    const [categoriesResponse, storiesResponse, topDonationsResponse] = await Promise.all([
      getCategories(),
      getStories(1, 4),
      getTopDonations(),
    ]);
    categories = categoriesResponse.data.items;
    stories = storiesResponse.data.items;
    topDonationItems = topDonationsResponse.data.items;
  } catch {
    categories = [];
    stories = [];
    topDonationItems = [];
  }

  // const donateCtaHref = categories.length > 0 ? `/cause/${categories[0].slug}` : "/";
  const donateCtaHref = "#hero-carousel";

  const heroSlides = categories.map(categoryToHeroSlide);

  return (
    <>
      {heroSlides.length > 0 ? (
        <div className="mb-5 lg:mb-10" id="hero-carousel">
          <CategoryHeroCarousel categories={heroSlides} topDonationItems={topDonationItems} />
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 md:px-12">
        <ImpactStatsSection />
      </div>

      <div className="mb-10">
        <MissionSection />
      </div>

      <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 md:px-12">
        <HomeStoriesSection stories={stories} />
      </div>

      <div className="mb-10 mt-10">
        <DonateCtaSection donateHref={donateCtaHref} />
      </div>

      <section
        className="py-8 lg:py-14"
        aria-labelledby="supporting-lives-gallery-heading"
      >
        <div className="mx-auto max-w-[1920px] px-3 sm:px-6 lg:px-16">
          <h2
            id="supporting-lives-gallery-heading"
            className="mb-8 text-center text-lg font-semibold tracking-tight text-zinc-400 sm:text-xl lg:mb-10 lg:text-4xl"
          >
            Supporting Lives Across Dhanbad{" "}
            <span className="not-italic" aria-hidden>
              ❤️
            </span>
          </h2>
        </div>

        <MarqueeGallery rows={supportingLivesGalleryRows} />
      </section>
    </>
  );
}
