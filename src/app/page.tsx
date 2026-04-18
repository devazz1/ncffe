import { getCategories } from "@/lib/api";
import { CategoryHeroCarousel } from "@/components/category-hero/category-hero-carousel";
import { ImpactStatsSection } from "@/components/impact-stats-section";

export default async function HomePage() {
  let categories = [] as Awaited<ReturnType<typeof getCategories>>["data"]["items"];
  try {
    const response = await getCategories();
    categories = response.data.items;
  } catch {
    categories = [];
  }

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
        <div className="relative left-1/2 mb-10 w-[100vw] max-w-none -translate-x-1/2 px-4 sm:px-6 lg:mb-14 lg:px-8">
          <CategoryHeroCarousel categories={heroSlides} />
        </div>
      ) : null}

      <div className="relative left-1/2 mb-10 w-[100vw] max-w-none -translate-x-1/2">
        <ImpactStatsSection />
      </div>

      <section>
        <h1 className="text-2xl font-bold">Donation Categories</h1>
        <p className="mt-1 text-sm text-zinc-800">
          Browse categories and support active campaigns.
          see categories in detailed view
        </p>
        <p>See other on going activities</p>
      </section>
    </>
  );
}
