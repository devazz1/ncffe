"use client";

import Link from "next/link";
import { Heart, Volume2, VolumeX, CircleChevronRight } from "lucide-react";

export type HeroOverlayContentProps = {
  title: string;
  detailsHref: string;
  onDonateClick?: () => void;
  isMuted: boolean;
  hasVideo: boolean;
  onVolumeClick: () => void;
};

export function HeroOverlayContent({
  title,
  detailsHref,
  onDonateClick,
  isMuted,
  hasVideo,
  onVolumeClick,
}: HeroOverlayContentProps) {
  return (
    <div className="pointer-events-none flex w-full max-w-186 flex-col gap-6 sm:gap-10 md:gap-14">
      <h1 className="pointer-events-none max-w-186 text-lg leading-[1.1] text-white drop-shadow-md sm:text-xl sm:font-medium md:text-2xl lg:text-3xl">
        {title}
      </h1>
      <div className="pointer-events-auto inline-flex max-w-full min-w-0 flex-nowrap items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4.5">
        <button
          type="button"
          onClick={onDonateClick}
          className="inline-flex h-10 min-w-0 items-center justify-center gap-1 rounded-sm bg-cta-gradient px-2 text-xs leading-none text-white shadow-lg cursor-pointer transition hover:opacity-95 sm:h-11  sm:gap-1 sm:px-3 sm:text-sm md:h-12 md:gap-3 md:px-4 md:text-lg lg:h-14"
        >
          <span className="min-w-0 truncate">Donate Now</span>
          <Heart className="size-3.5 shrink-0 sm:size-4 md:size-5 lg:size-6" aria-hidden />
        </button>
        <Link
          href={detailsHref}
          className=" group inline-flex h-10 min-w-0 items-center justify-center gap-1 rounded-sm bg-[#6d6d6eb3] px-2 text-xs leading-none text-white backdrop-blur-sm transition hover:bg-[#6d6d6ecc] sm:h-11 sm:gap-1 sm:px-3 sm:text-sm md:h-12 md:gap-3 md:px-4 md:text-lg lg:h-14"
        >
          <span className="min-w-0 truncate">More Details</span>
          <CircleChevronRight className="size-3.5 shrink-0 sm:size-4 md:size-5 lg:size-6 group-hover:-rotate-30 transition-transform duration-200 ease-out" aria-hidden />
        </Link>
        {hasVideo && (
          <button
            type="button"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            onClick={onVolumeClick}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/4 text-white transition hover:bg-white/10 sm:size-11 md:size-14 lg:size-17"
          >
            {isMuted ? (
              <VolumeX className="size-5 opacity-60 sm:size-6 md:size-8 lg:size-9" aria-hidden />
            ) : (
              <Volume2 className="size-5 opacity-60 sm:size-6 md:size-8 lg:size-9" aria-hidden />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
