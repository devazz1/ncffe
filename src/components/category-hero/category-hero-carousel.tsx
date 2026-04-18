"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  Heart,
  Info,
  Users,
  Volume2,
  VolumeX,
} from "lucide-react";

/** One slide in the hero — maps from `Category` or any CMS shape. */
export type HeroCategorySlide = {
  id: string | number;
  title: string;
  /** Required for imagery; empty string uses a tiny inline SVG fallback. */
  heroPoster: string;
  heroVideo?: string | null;
  description?: string | null;
  detailsHref: string;
  donateHref: string;
};

const IMAGE_DURATION_MS = 5000;

const FALLBACK_POSTER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#27272a"/><stop offset="100%" stop-color="#52525b"/></linearGradient></defs><rect width="1200" height="675" fill="url(#g)"/></svg>`,
  );

function posterFor(slide: HeroCategorySlide): string {
  const p = slide.heroPoster?.trim();
  return p ? p : FALLBACK_POSTER;
}

function HeroBackground({
  slide,
  isMuted,
  videoRef,
  onTimeUpdate,
  onEnded,
}: {
  slide: HeroCategorySlide;
  isMuted: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onTimeUpdate: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  onEnded: () => void;
}) {
  const poster = posterFor(slide);
  if (slide.heroVideo) {
    return (
      <video
        key={`${slide.id}-${slide.heroVideo}`}
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={slide.heroVideo}
        poster={poster}
        muted={isMuted}
        playsInline
        autoPlay
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote API URLs; avoid remotePatterns setup
    <img
      alt=""
      src={poster}
      className="absolute inset-0 h-full w-full object-cover"
      draggable={false}
    />
  );
}

function HeroOverlayContent({
  title,
  donateHref,
  detailsHref,
  isMuted,
  hasVideo,
  onVolumeClick,
}: {
  title: string;
  donateHref: string;
  detailsHref: string;
  isMuted: boolean;
  hasVideo: boolean;
  onVolumeClick: () => void;
}) {
  return (
    <div className="pointer-events-none flex max-w-xl flex-col gap-5">
      <h1 className="pointer-events-none text-3xl font-bold leading-tight text-white drop-shadow-md md:text-4xl lg:text-5xl">
        {title}
      </h1>
      <div className="pointer-events-auto flex flex-wrap items-center gap-3">
        <Link
          href={donateHref}
          className="inline-flex items-center gap-2 rounded-full bg-cta-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-95"
        >
          <Heart className="size-4 shrink-0 fill-current" aria-hidden />
          Donate Now
        </Link>
        <Link
          href={detailsHref}
          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-black/50"
        >
          More Details
          <ArrowRight className="size-4 shrink-0" aria-hidden />
        </Link>
        <button
          type="button"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          disabled={!hasVideo}
          onClick={onVolumeClick}
          className="inline-flex size-11 items-center justify-center rounded-full border border-white/35 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/55 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isMuted ? (
            <VolumeX className="size-5" aria-hidden />
          ) : (
            <Volume2 className="size-5" aria-hidden />
          )}
        </button>
      </div>
    </div>
  );
}

function StripExpandedCard({ slide }: { slide: HeroCategorySlide }) {
  return (
    <div className="flex max-h-[min(72vh,720px)] flex-col overflow-hidden rounded-b-xl border border-zinc-200/80 bg-white shadow-2xl">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-zinc-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={posterFor(slide)}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <div className="relative px-3 pb-3 pt-2">
        <div className="flex items-start justify-between gap-2">
          <p className="flex-1 text-sm font-semibold leading-snug text-zinc-900">
            {slide.title}
          </p>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cta-gradient text-white shadow">
            <Heart className="size-4 fill-current" aria-hidden />
          </span>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-600">
          <Users className="size-3.5 shrink-0 text-zinc-500" aria-hidden />
          <span>Community impact grows with every donation</span>
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 rounded-md border border-zinc-200 px-2 py-1 text-[11px] font-medium text-zinc-700">
            <Info className="size-3 text-zinc-500" aria-hidden />
            Tax Benefit
          </span>
          <Link
            href={slide.detailsHref}
            className="inline-flex items-center gap-1 text-xs font-medium text-red-700 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            More Details
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function CategoryCardStrip({
  slides,
  activeIndex,
  progress,
  hoveredIndex,
  onHover,
  onLeave,
  onPick,
}: {
  slides: HeroCategorySlide[];
  activeIndex: number;
  progress: number;
  hoveredIndex: number | null;
  onHover: (index: number) => void;
  onLeave: () => void;
  onPick: (index: number) => void;
}) {
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  useEffect(
    () => () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    },
    [],
  );

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  const scheduleLeave = useCallback(() => {
    clearLeaveTimer();
    leaveTimerRef.current = setTimeout(() => {
      onLeave();
    }, 160);
  }, [clearLeaveTimer, onLeave]);

  const updateAnchor = useCallback(() => {
    if (hoveredIndex === null) {
      setAnchorRect(null);
      return;
    }
    const el = slotRefs.current[hoveredIndex];
    if (!el) {
      setAnchorRect(null);
      return;
    }
    setAnchorRect(el.getBoundingClientRect());
  }, [hoveredIndex]);

  useLayoutEffect(() => {
    let cancelled = false;
    const id = requestAnimationFrame(() => {
      if (cancelled) return;
      updateAnchor();
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [updateAnchor, slides, progress]);

  useEffect(() => {
    if (hoveredIndex === null) return;
    const onWin = () => updateAnchor();
    window.addEventListener("resize", onWin);
    window.addEventListener("scroll", onWin, true);
    return () => {
      window.removeEventListener("resize", onWin);
      window.removeEventListener("scroll", onWin, true);
    };
  }, [hoveredIndex, updateAnchor]);

  const hoveredSlide =
    hoveredIndex !== null ? slides[hoveredIndex] : undefined;

  const portalExpanded =
    typeof document !== "undefined" &&
    hoveredSlide &&
    hoveredIndex !== null &&
    anchorRect;

  let portalStyle: CSSProperties | undefined;
  if (portalExpanded && anchorRect) {
    const vw =
      typeof window !== "undefined" ? window.innerWidth : anchorRect.width;
    const panelWidth = Math.min(
      340,
      Math.max(anchorRect.width * 1.35, anchorRect.width),
    );
    const centerX = anchorRect.left + anchorRect.width / 2;
    const half = panelWidth / 2;
    const margin = 10;
    const clampedCenter = Math.min(
      Math.max(centerX, half + margin),
      vw - half - margin,
    );
    portalStyle = {
      position: "fixed",
      left: clampedCenter,
      bottom:
        typeof window !== "undefined"
          ? window.innerHeight - anchorRect.bottom
          : 0,
      width: panelWidth,
      transform: "translateX(-50%)",
      zIndex: 200,
    };
  }

  return (
    <div className="w-full overflow-visible">
      <p className="mb-3 text-sm font-bold text-zinc-900 md:text-base">We Work For</p>
      {/* items-end: siblings don&apos;t stretch; horizontal scroll lives here — expanded UI is portaled to body */}
      <div
        className="flex items-end gap-3 overflow-x-auto overflow-y-visible pb-3 pt-12 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-4 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const barWidth = isActive ? progress : 0;
          const expanded = hoveredIndex === index;

          return (
            <div
              key={String(slide.id)}
              role="button"
              tabIndex={0}
              aria-current={isActive ? "true" : undefined}
              className={`group relative shrink-0 cursor-pointer rounded-sm border bg-white text-left shadow-md transition-[box-shadow] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${
                expanded ? "z-30 shadow-xl" : "z-0 hover:z-20 hover:shadow-lg"
              } ${isActive ? "border-red-600/80" : "border-transparent"}`}
              onMouseEnter={() => {
                clearLeaveTimer();
                onHover(index);
              }}
              onMouseLeave={scheduleLeave}
              onFocus={() => {
                clearLeaveTimer();
                onHover(index);
              }}
              onBlur={onLeave}
              onClick={() => onPick(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onPick(index);
                }
              }}
            >
              {/* Slot footprint (thumbnail + progress); ref drives fixed portal position */}
              <div
                ref={(el) => {
                  slotRefs.current[index] = el;
                }}
                className="relative w-[min(72vw,280px)] overflow-visible rounded-[4px] md:w-[240px]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[4px] bg-zinc-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={posterFor(slide)}
                    className="h-full w-full object-cover transition duration-300 group-hover:brightness-95"
                    draggable={false}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex max-h-[55%] flex-col justify-end bg-gradient-to-t from-black/75 via-black/35 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="line-clamp-2 text-sm font-semibold text-white drop-shadow">
                      {slide.title}
                    </p>
                    {slide.description ? (
                      <p className="mt-1 line-clamp-2 text-xs text-white/90">
                        {slide.description}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="relative z-10 h-1.5 w-full shrink-0 bg-zinc-200">
                  <div
                    className="absolute inset-y-0 left-0 bg-[#d01a1a]"
                    style={{ width: `${barWidth * 100}%` }}
                  />
                  <div
                    className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d01a1a] shadow-sm ring-2 ring-white"
                    style={{ left: `${barWidth * 100}%` }}
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {portalExpanded && hoveredSlide && portalStyle
        ? createPortal(
            <div
              className="pointer-events-auto"
              style={portalStyle}
              onMouseEnter={() => {
                clearLeaveTimer();
                onHover(hoveredIndex);
              }}
              onMouseLeave={() => onLeave()}
            >
              <StripExpandedCard slide={hoveredSlide} />
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

export type CategoryHeroCarouselProps = {
  categories: HeroCategorySlide[];
  className?: string;
};

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
    const slide = slides[safeIndex];
    if (!slide?.heroVideo) return;

    const el = videoRef.current;
    if (!el) return;
    el.muted = isMuted;
  }, [isMuted, safeIndex, slides]);

  useEffect(() => {
    const slide = slides[safeIndex];
    if (!slide || slide.heroVideo) return;

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
  }, [advanceToNext, safeIndex, slideLoopNonce, slides]);

  const pickSlide = useCallback(
    (index: number) => {
      if (index < 0 || index >= count) return;
      setProgress(0);
      setActiveIndex(index);
    },
    [count],
  );

  if (count === 0 || !current) {
    return null;
  }

  const hasVideo = Boolean(current.heroVideo);

  return (
    <section
      className={`relative isolate w-full bg-zinc-900 ${className}`}
      aria-roledescription="carousel"
      aria-label="Featured categories"
    >
      {/* Media + gradients clipped to rect; foreground below stays overflow-visible so strip hovers can overlap */}
      <div className="relative min-h-[min(640px,calc(100dvh-6rem))] w-full md:min-h-[min(720px,calc(100dvh-5rem))]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <HeroBackground
            slide={current}
            isMuted={isMuted}
            videoRef={videoRef}
            onTimeUpdate={handleVideoTimeUpdate}
            onEnded={handleVideoEnded}
          />

          <div
            className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-white via-white/92 to-transparent"
            aria-hidden
          />
        </div>

        <div className="relative z-[1] flex min-h-[inherit] flex-col justify-between overflow-visible px-4 pb-6 pt-10 md:px-10 md:pb-8 md:pt-14 lg:px-14">
          <div className="flex flex-1 flex-col justify-center md:max-w-[min(42rem,90%)]">
            <HeroOverlayContent
              title={current.title}
              donateHref={current.donateHref}
              detailsHref={current.detailsHref}
              isMuted={isMuted}
              hasVideo={hasVideo}
              onVolumeClick={() => setIsMuted((m) => !m)}
            />
          </div>

          <div className="relative z-[2] mt-6 w-full overflow-visible md:mt-10">
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
        </div>
      </div>
    </section>
  );
}
