import Link from "next/link";

import type { Story } from "@/lib/types";

const VIEW_MORE_HREF = "/stories";

function StoryCard({ story, index }: { story: Story; index: number }) {
  const showOnMobile = index < 2;
  const imageUrl = story.heroPoster?.trim() ?? "";

  return (
    <article className={showOnMobile ? "" : "hidden md:block"}>
      {/* <Link
        href={VIEW_MORE_HREF}
        className="group flex flex-col gap-4 md:gap-5"
      > */}
      <div className="gap-4">
        <div className="relative aspect-3/2 w-full overflow-hidden rounded-2xl bg-zinc-100">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- CMS-provided URLs
            <img
              src={imageUrl}
              alt={story.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            />
          ) : null}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl bg-black/20"
            aria-hidden
          />
        </div>
        <div className="flex flex-col mt-4 gap-1.5">
          <h3 className="text-lg font-normal leading-snug text-black md:text-xl">
            {story.title}
          </h3>
          <p className="text-xs leading-snug text-zinc-600 md:text-sm">
            {story.description ?? ""}
          </p>
        </div>
      </div>
      {/* </Link> */}
    </article>
  );
}

type HomeStoriesSectionProps = {
  stories: Story[];
};

export function HomeStoriesSection({ stories }: HomeStoriesSectionProps) {
  if (stories.length === 0) {
    return null;
  }

  return (
    <section
    className="pb-6 md:pb-16"
      aria-labelledby="home-stories-heading"
    >
      <div className="flex flex-col gap-10">
        <div className="flex flex-row items-center justify-between gap-10">
          <h2
            id="home-stories-heading"
            className="text-xl tracking-tight text-zinc-900 md:text-2xl lg:text-3xl"
          >
            Stories
          </h2>
          <Link
            href={VIEW_MORE_HREF}
            className="inline-flex h-8 min-w-[4.75rem] shrink-0 items-center justify-center rounded-lg bg-cta-gradient px-2 text-xs text-white transition hover:opacity-95 md:h-13 md:min-w-28 md:rounded-xl md:px-5 md:text-base"
          >
            View More
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6">
          {stories.map((story, index) => (
            <StoryCard key={story.storyId} story={story} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
