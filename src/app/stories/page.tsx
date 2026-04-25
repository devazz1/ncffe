import Link from "next/link";
import { getStories } from "@/lib/api";
import { MediaContentBlock } from "@/components/media-content-block";
import { SitePageContainer } from "@/components/site-page-container";

type StoriesPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

const STORIES_PER_PAGE = 4;

function toPage(value: string | undefined) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }
  return parsed;
}

export default async function StoriesPage({ searchParams }: StoriesPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const page = toPage(resolvedSearchParams?.page);

  let items: Awaited<ReturnType<typeof getStories>>["data"]["items"] = [];
  let meta: Awaited<ReturnType<typeof getStories>>["data"]["meta"] | null = null;
  let hasError = false;

  try {
    const response = await getStories(page, STORIES_PER_PAGE);
    items = response.data.items;
    meta = response.data.meta;
  } catch {
    hasError = true;
  }

  const currentPage = meta?.page ?? page;
  const hasNextPage = meta ? currentPage < meta.totalPages : false;
  const hasPrevPage = currentPage > 1;
  const nextPageHref = `/stories?page=${currentPage + 1}`;
  const prevPageHref = `/stories?page=${currentPage - 1}`;

  return (
    <SitePageContainer>
      <section className="mx-auto flex max-w-4xl flex-col gap-6 rounded-lg p-6">
        <div>
          <h1 className="text-xl text-center font-normal md:text-3xl">Stories of Hope, Dignity, and Change</h1>
          <p className="mt-2 text-sm text-zinc-500 text-center md:text-base">
            Discover how small actions can create a big impact in the lives of many.
          </p>
        </div>

        {hasError ? (
          <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            Unable to load stories right now. Please try again shortly.
          </p>
        ) : items.length === 0 ? (
          <p className="text-sm text-zinc-700">No stories available right now.</p>
        ) : (
          <>
            <div className="flex flex-col gap-8">
              {items.map((story) => (
                <MediaContentBlock
                  key={story.storyId}
                  videoUrl={story.heroVideo}
                  imageUrl={story.heroPoster}
                  heading={story.title}
                  description={story.description}
                />
              ))}
            </div>

            {meta ? (
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-4">
                <p className="text-sm text-zinc-700">
                  Page {meta.page} of {meta.totalPages} ({meta.total} total)
                </p>
                <div className="flex gap-2">
                  {hasPrevPage ? (
                    <Link
                      href={prevPageHref}
                      className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm hover:bg-zinc-50"
                    >
                      Previous
                    </Link>
                  ) : null}
                  {hasNextPage ? (
                    <Link
                      href={nextPageHref}
                      className="rounded bg-cta-gradient px-3 py-1.5 text-sm text-white transition hover:opacity-95"
                    >
                      Load more
                    </Link>
                  ) : null}
                </div>
              </div>
            ) : null}
          </>
        )}
      </section>
    </SitePageContainer>
  );
}
