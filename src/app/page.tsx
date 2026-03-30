import { getCategories } from "@/lib/api";
import { CategoryCard } from "@/components/category-card";

export default async function HomePage() {
  let categories = [] as Awaited<ReturnType<typeof getCategories>>["data"]["items"];
  try {
    const response = await getCategories();
    categories = response.data.items;
  } catch {
    categories = [];
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Donation Categories</h1>
      <p className="mt-1 text-sm text-zinc-800">
        Browse categories and support active campaigns.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard key={category.categoryId} category={category} />
          ))
        ) : (
          <p className="text-sm text-zinc-800">
            Categories are unavailable right now. Check API connectivity and refresh.
          </p>
        )}
      </div>
    </section>
  );
}
