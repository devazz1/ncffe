import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
};

/** Repeats the base set so each row is wide enough for a smooth infinite loop. */
function buildRowImages(base: GalleryImage[], count: number): GalleryImage[] {
  return Array.from({ length: count }, (_, i) => base[i % base.length]);
}

const ROW1_GALLERY: GalleryImage[] = [
  { src: "/gallery/image_r11.png", alt: "Supporting lives in Dhanbad - row 1 image 1" },
  { src: "/gallery/image_r12.png", alt: "Supporting lives in Dhanbad - row 1 image 2" },
  { src: "/gallery/image_r13.png", alt: "Supporting lives in Dhanbad - row 1 image 3" },
  { src: "/gallery/image_r14.png", alt: "Supporting lives in Dhanbad - row 1 image 4" },
  { src: "/gallery/image_r15.png", alt: "Supporting lives in Dhanbad - row 1 image 5" },
  { src: "/gallery/image_r16.png", alt: "Supporting lives in Dhanbad - row 1 image 6" },
];

const ROW2_GALLERY: GalleryImage[] = [
  { src: "/gallery/image_r21.png", alt: "Supporting lives in Dhanbad - row 2 image 1" },
  { src: "/gallery/image_r22.png", alt: "Supporting lives in Dhanbad - row 2 image 2" },
  { src: "/gallery/image_r23.png", alt: "Supporting lives in Dhanbad - row 2 image 3" },
  { src: "/gallery/image_r24.png", alt: "Supporting lives in Dhanbad - row 2 image 4" },
  { src: "/gallery/image_r25.png", alt: "Supporting lives in Dhanbad - row 2 image 5" },
  { src: "/gallery/image_r26.png", alt: "Supporting lives in Dhanbad - row 2 image 6" },
];

const ROW3_GALLERY: GalleryImage[] = [
  { src: "/gallery/image_r31.png", alt: "Supporting lives in Dhanbad - row 3 image 1" },
  { src: "/gallery/image_r32.png", alt: "Supporting lives in Dhanbad - row 3 image 2" },
  { src: "/gallery/image_r33.png", alt: "Supporting lives in Dhanbad - row 3 image 3" },
  { src: "/gallery/image_r34.png", alt: "Supporting lives in Dhanbad - row 3 image 4" },
  { src: "/gallery/image_r35.png", alt: "Supporting lives in Dhanbad - row 3 image 5" },
  { src: "/gallery/image_r36.png", alt: "Supporting lives in Dhanbad - row 3 image 6" },
];

// const TILE_CLASS =  "relative h-[130px] w-[min(42vw,192px)] shrink-0 overflow-hidden bg-zinc-100 sm:h-[148px] sm:w-[220px] md:h-[176px] md:w-[260px] lg:h-[190px] lg:w-[281px]";
const TILE_CLASS =  "relative h-[133px] w-[calc(50vw-6px)] shrink-0 overflow-hidden bg-zinc-100 sm:h-[148px] sm:w-[220px] md:h-[176px] md:w-[260px] lg:h-[190px] lg:w-[281px]";

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
  const row1 = buildRowImages(ROW1_GALLERY, rowCount);
  const row2 = buildRowImages(ROW2_GALLERY, rowCount);
  const row3 = buildRowImages(ROW3_GALLERY, rowCount);

  return (
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

      <div className="flex flex-col gap-1 sm:gap-1.5">
        <MarqueeRow tiles={row1} durationSec={72} />
        <MarqueeRow tiles={row2} durationSec={68} reverse />
        <MarqueeRow tiles={row3} durationSec={32} />
      </div>
    </section>
  );
}
