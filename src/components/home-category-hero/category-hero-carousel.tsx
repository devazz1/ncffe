"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { CategoryCardStrip } from "./category-card-strip";
import { HeroOverlayContent } from "./hero-overlay-content";
import type { HeroCategorySlide } from "./hero-category-slide";

const IMAGE_DURATION_MS = 5000;

export type CategoryHeroCarouselProps = {
  categories: HeroCategorySlide[];
  className?: string;
};

function HeroBackground({
  slide,
  isMuted,
  disableVideo,
  videoRef,
  onTimeUpdate,
  onEnded,
}: {
  slide: HeroCategorySlide;
  isMuted: boolean;
  disableVideo: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onTimeUpdate: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  onEnded: () => void;
}) {
  if (slide.heroVideo && !disableVideo) {
    return (
      <video
        key={`${slide.id}-${slide.heroVideo}`}
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-top"
        src={slide.heroVideo}
        poster={slide.heroPoster}
        muted={isMuted}
        playsInline
        autoPlay
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />
    );
  }

  return (
    <Image
      key={String(slide.id)}
      alt=""
      src={slide.heroPoster}
      className="absolute inset-0 h-full w-full object-cover object-top"
      fill
      sizes="100vw"
      unoptimized
      draggable={false}
    />
  );
}

export function CategoryHeroCarousel({
  categories,
  className = "",
}: CategoryHeroCarouselProps) {
  const slides = useMemo(
    () => categories.filter((c) => c != null),
    [categories],
  );
  const count = slides.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPhone, setIsPhone] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [slideLoopNonce, setSlideLoopNonce] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  const safeIndex = count > 0 ? Math.min(activeIndex, count - 1) : 0;
  const current = slides[safeIndex];

  const advanceToNext = useCallback(() => {
    setProgress(0);
    if (count <= 1) {
      setSlideLoopNonce((n) => n + 1);
      return;
    }
    setActiveIndex((i) => (i + 1) % count);
  }, [count]);

  const handleVideoTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const v = e.currentTarget;
      const d = v.duration;
      if (!d || Number.isNaN(d)) return;
      setProgress(Math.min(1, v.currentTime / d));
    },
    [],
  );

  const handleVideoEnded = useCallback(() => {
    if (count <= 1) {
      const v = videoRef.current;
      if (v) {
        v.currentTime = 0;
        void v.play();
      }
      setProgress(0);
      setSlideLoopNonce((n) => n + 1);
      return;
    }
    advanceToNext();
  }, [advanceToNext, count]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateIsPhone = () => setIsPhone(mediaQuery.matches);

    updateIsPhone();
    mediaQuery.addEventListener("change", updateIsPhone);

    return () => {
      mediaQuery.removeEventListener("change", updateIsPhone);
    };
  }, []);

  useEffect(() => {
    const slide = slides[safeIndex];
    if (!slide?.heroVideo || isPhone) return;

    const el = videoRef.current;
    if (!el) return;
    el.muted = isMuted;
  }, [isMuted, isPhone, safeIndex, slides]);

  useEffect(() => {
    const slide = slides[safeIndex];
    if (!slide) return;

    const videoDrivesProgress =
      Boolean(slide.heroVideo) && !isPhone;
    if (videoDrivesProgress) return;

    const durationMs = IMAGE_DURATION_MS;
    const start = performance.now();
    let raf = 0;

    const step = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / durationMs);
      setProgress(p);
      if (elapsed >= durationMs) {
        advanceToNext();
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [advanceToNext, isPhone, safeIndex, slideLoopNonce, slides]);

  const pickSlide = useCallback(
    (index: number) => {
      if (index < 0 || index >= count) return;
      setProgress(0);
      setActiveIndex(index);
    },
    [count],
  );

  if (count === 0 || !current) return null;

  const disableVideo = isPhone;
  const hasVideo = Boolean(current.heroVideo && !disableVideo);

  return (
    <section
      className={`relative isolate w-full ${className}`}
      aria-roledescription="carousel"
      aria-label="Featured categories"
    >
      <div className="relative mx-auto aspect-3/4 w-full max-h-dvh bg-zinc-900 md:aspect-video md:min-h-110 md:max-h-[calc(100dvh+44px)]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black">
          <HeroBackground
            slide={current}
            isMuted={isMuted}
            disableVideo={disableVideo}
            videoRef={videoRef}
            onTimeUpdate={handleVideoTimeUpdate}
            onEnded={handleVideoEnded}
          />

          <div
            className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[#f8f9fc] to-transparent"
            aria-hidden
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-start p-4 pb-15 md:p-8 md:pb-48 lg:px-14">
          <HeroOverlayContent
            title={current.title}
            donateHref={current.donateHref}
            detailsHref={current.detailsHref}
            isMuted={isMuted}
            hasVideo={hasVideo}
            onVolumeClick={() => setIsMuted((m) => !m)}
          />
        </div>
      </div>

      <div className="relative z-20 -mt-6 w-full px-4 pb-6 md:-mt-20 md:px-8 md:pb-8 lg:-mt-36 lg:px-14">
        <CategoryCardStrip
          slides={slides}
          activeIndex={safeIndex}
          progress={progress}
          hoveredIndex={hoveredIndex}
          onHover={setHoveredIndex}
          onLeave={() => setHoveredIndex(null)}
          onPick={pickSlide}
        />
      </div>
    </section>
  );
}
