import Image from "next/image";
import Link from "next/link";

import { STORIES, type Story } from "@/data/stories";

const VIEW_MORE_HREF = "/stories";

/** Homepage grid: first two `STORIES` slots on small screens (`md` shows full list). */
function StoryCard({ story, index }: { story: Story; index: number }) {
  const showOnMobile = index < 2;

  return (
    <article className={showOnMobile ? "" : "hidden md:block"}>
      <Link
        href={`${VIEW_MORE_HREF}#${story.id}`}
        className="group flex flex-col gap-4 md:gap-5"
      >
        <div className="relative aspect-3/2 w-full overflow-hidden rounded-2xl bg-zinc-100">
          <Image
            src={story.imageSrc}
            alt={story.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl bg-black/20"
            aria-hidden
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-sm font-semibold leading-snug text-black md:text-lg">
            {story.title}
          </h3>
          <p className="text-xs leading-snug text-zinc-600 md:text-sm">{story.description}</p>
        </div>
      </Link>
    </article>
  );
}

export function HomeStoriesSection() {
  return (
    <section
      className="bg-white py-10 lg:py-14"
      aria-labelledby="home-stories-heading"
    >
      <div className="mx-auto max-w-[1920px] px-3 sm:px-6 lg:px-16">
        <div className="flex flex-col gap-10">
          <div className="flex flex-row items-center justify-between gap-10">
            <h2
              id="home-stories-heading"
              className="text-xl font-bold tracking-tight text-zinc-900 md:text-4xl lg:text-5xl"
            >
              Stories
            </h2>
            <Link
              href={VIEW_MORE_HREF}
              className="inline-flex h-8 min-w-[4.75rem] shrink-0 items-center justify-center rounded-lg bg-cta-gradient px-2 text-xs font-semibold text-white transition hover:opacity-95 md:h-[3.875rem] md:min-w-[9rem] md:rounded-xl md:px-5 md:text-lg"
            >
              View More
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6">
            {STORIES.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
