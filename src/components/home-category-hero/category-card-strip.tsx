"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";
import { CircleChevronRight, Info, Users } from "lucide-react";

import type { HeroCategorySlide } from "./hero-category-slide";
import { CategoryHeroHeartIcon } from "./category-hero-heart-icon";

const FALLBACK_POSTER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#27272a"/><stop offset="100%" stop-color="#52525b"/></linearGradient></defs><rect width="1200" height="675" fill="url(#g)"/></svg>`,
  );

export function posterFor(slide: HeroCategorySlide): string {
  const p = slide.heroPoster?.trim();
  return p ? p : FALLBACK_POSTER;
}

function StripExpandedCard({
  slide,
  onDonateClick,
}: {
  slide: HeroCategorySlide;
  onDonateClick: (slide: HeroCategorySlide) => void;
}) {
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
          <button
            type="button"
            aria-label={`Donate to ${slide.name}`}
            onClick={(e) => {
              e.stopPropagation();
              onDonateClick(slide);
            }}
            className="rounded-full transition hover:opacity-90"
          >
            <CategoryHeroHeartIcon className="size-9 shrink-0" />
          </button>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-zinc-600">
          <Users className="size-3.5 shrink-0 text-zinc-500" aria-hidden />
          <span>{slide.donationCount} people helped us</span>
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 rounded-md border border-zinc-200 px-2 py-1 text-[11px] font-medium text-zinc-700">
            <Info className="size-3 text-zinc-500" aria-hidden />
            Tax Benefit
          </span>
          <Link
            href={slide.detailsHref}
            className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            More Details
            <CircleChevronRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CategoryCardStrip({
  slides,
  activeIndex,
  progress,
  hoveredIndex,
  onHover,
  onLeave,
  onPick,
  onDonateClick,
  className = "",
}: {
  slides: HeroCategorySlide[];
  activeIndex: number;
  progress: number;
  hoveredIndex: number | null;
  onHover: (index: number) => void;
  onLeave: () => void;
  onPick: (index: number) => void;
  onDonateClick: (slide: HeroCategorySlide) => void;
  className?: string;
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
    <div className={`w-full overflow-visible ${className}`}>
      <p className="mb-3 text-base font-bold text-zinc-900 md:text-lg">
        We Work For
      </p>
      <div className="flex items-end gap-3 overflow-x-auto overflow-y-visible pb-3 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-4 [&::-webkit-scrollbar]:hidden">
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
              className={`group relative shrink-0 cursor-pointer rounded-sm text-left shadow-md transition-[box-shadow] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${
                expanded ? "z-30 shadow-xl" : "z-0 hover:z-20 hover:shadow-lg"
              }`}
              onMouseEnter={() => {
                clearLeaveTimer();
                onPick(index);
                onHover(index);
              }}
              onMouseLeave={scheduleLeave}
              onFocus={() => {
                clearLeaveTimer();
                onPick(index);
                onHover(index);
              }}
              onBlur={onLeave}
            >
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

                <div className="relative z-10 h-0.5 w-full shrink-0 bg-zinc-200">
                  <div
                    className="absolute inset-y-0 left-0 bg-[#d01a1a]"
                    style={{ width: `${barWidth * 100}%` }}
                  />
                  <div
                    className="absolute top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d01a1a] shadow-sm ring-2 ring-white"
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
              <StripExpandedCard slide={hoveredSlide} onDonateClick={onDonateClick} />
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
