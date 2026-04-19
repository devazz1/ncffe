import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
};

/** Repeats the base set so each row is wide enough for a smooth infinite loop. */
function buildRowImages(base: GalleryImage[], count: number): GalleryImage[] {
  return Array.from({ length: count }, (_, i) => base[i % base.length]);
}

const BASE_GALLERY: GalleryImage[] = [
  {
    src: "/ncf-img-kid-food-01.png",
    alt: "Community meals and care programs supporting people in Dhanbad.",
  },
  {
    src: "/ncf-img-kid-food-02.png",
    alt: "Children and outreach work in local communities.",
  },
];

const TILE_CLASS =
  "relative h-[100px] w-[min(42vw,200px)] shrink-0 overflow-hidden bg-zinc-100 sm:h-[120px] sm:w-[220px] md:h-[140px] md:w-[260px] lg:h-[156px] lg:w-[280px]";

function MarqueeRow({
  tiles,
  durationSec,
  reverse,
}: {
  tiles: GalleryImage[];
  durationSec: number;
  reverse?: boolean;
}) {
  return (
    <div className="overflow-hidden">
      <div
        className={`marquee-track ${reverse ? "marquee-track-reverse" : ""}`}
        style={{ animationDuration: `${durationSec}s` }}
      >
        <div className="flex gap-0.5 pr-0.5">
          {tiles.map((img, i) => (
            <div key={`a-${i}`} className={TILE_CLASS}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 42vw, (max-width: 1024px) 260px, 280px"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-0.5 pr-0.5" aria-hidden>
          {tiles.map((img, i) => (
            <div key={`b-${i}`} className={TILE_CLASS}>
              <Image
                src={img.src}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SupportingLivesGallerySection() {
  const rowCount = 14;
  const row1 = buildRowImages(BASE_GALLERY, rowCount);
  const row2 = buildRowImages([BASE_GALLERY[1], BASE_GALLERY[0]], rowCount);
  const row3 = buildRowImages(BASE_GALLERY, rowCount);

  return (
    <section
      className="bg-white py-8 lg:py-14"
      aria-labelledby="supporting-lives-gallery-heading"
    >
      <div className="mx-auto max-w-[1920px] px-3 sm:px-6 lg:px-16">
        <h2
          id="supporting-lives-gallery-heading"
          className="mb-8 text-center text-lg font-medium tracking-tight text-[#7b7b7b] sm:text-xl lg:mb-10 lg:text-2xl"
        >
          Supporting Lives Across Dhanbad{" "}
          <span className="not-italic" aria-hidden>
            ❤️
          </span>
        </h2>
      </div>

      <div className="flex flex-col gap-1 sm:gap-1.5">
        <MarqueeRow tiles={row1} durationSec={72} />
        <MarqueeRow tiles={row2} durationSec={48} reverse />
        <MarqueeRow tiles={row3} durationSec={32} />
      </div>
    </section>
  );
}
