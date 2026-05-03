import Image from "next/image";

export type GalleryImage = {
  src: string;
  alt: string;
};

export type MarqueeGalleryRow = {
  images: GalleryImage[];
  durationSec: number;
  reverse?: boolean;
};

const ROW_TILE_REPEAT_COUNT = 14;

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
                sizes="(max-width: 639px) calc(50vw - 6px), (max-width: 767px) 220px, (max-width: 1023px) 260px, 281px"
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
                sizes="(max-width: 639px) calc(50vw - 6px), (max-width: 767px) 220px, (max-width: 1023px) 260px, 281px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Default rows for the home page “Supporting Lives” strip (Dhanbad gallery assets). */
export const supportingLivesGalleryRows: MarqueeGalleryRow[] = [
  { images: ROW1_GALLERY, durationSec: 72 },
  { images: ROW2_GALLERY, durationSec: 68, reverse: true },
  { images: ROW3_GALLERY, durationSec: 32 },
];

export function MarqueeGallery({ rows }: { rows: MarqueeGalleryRow[] }) {
  return (
    <div className="flex flex-col gap-1 sm:gap-1.5">
      {rows.map((row, i) => (
        <MarqueeRow
          key={i}
          tiles={buildRowImages(row.images, ROW_TILE_REPEAT_COUNT)}
          durationSec={row.durationSec}
          reverse={row.reverse}
        />
      ))}
    </div>
  );
}
