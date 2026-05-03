"use client";

import { createPortal } from "react-dom";
import {
  cloneElement,
  isValidElement,
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";

const Z_INDEX = 300;
const GAP_PX = 8;
/** Tail triangle offset from bubble’s left; matches `left-3` in markup. */
const TAIL_INSET_PX = 12;
const TAIL_WIDTH_PX = 12;
const VIEWPORT_MARGIN = 8;

export type SpeechTooltipProps = {
  label: string;
  children: ReactElement;
};

/**
 * Light gray callout with a small bottom-left tail (speech-bubble style).
 * Renders in a portal so it is not clipped by `overflow: hidden` ancestors.
 */
export function SpeechTooltip({ label, children }: SpeechTooltipProps) {
  const tooltipId = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState<CSSProperties>(() => ({
    position: "fixed",
    top: -9999,
    left: 0,
    zIndex: Z_INDEX,
    opacity: 0,
    pointerEvents: "none",
    maxWidth: "min(calc(100vw - 16px), 280px)",
  }));

  const show = useCallback(() => {
    setStyle((s) => ({
      ...s,
      top: -9999,
      left: 0,
      opacity: 0,
    }));
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
  }, []);

  const updatePosition = useCallback(() => {
    const wrap = wrapRef.current;
    const bubble = bubbleRef.current;
    if (!wrap || !bubble) return;

    const wr = wrap.getBoundingClientRect();
    const br = bubble.getBoundingClientRect();

    const tailCenterFromBubbleLeft = TAIL_INSET_PX + TAIL_WIDTH_PX / 2;
    const tailTipX = wr.left + wr.width / 2;
    let left = tailTipX - tailCenterFromBubbleLeft;

    const top = wr.top - br.height - GAP_PX;

    const maxLeft = window.innerWidth - br.width - VIEWPORT_MARGIN;
    const minLeft = VIEWPORT_MARGIN;
    left = Math.min(Math.max(left, minLeft), maxLeft);

    setStyle((s) => ({
      ...s,
      top,
      left,
      opacity: 1,
    }));
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    updatePosition();
    const raf = requestAnimationFrame(() => updatePosition());

    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined" && bubbleRef.current) {
      ro = new ResizeObserver(() => updatePosition());
      ro.observe(bubbleRef.current);
    }

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition, label]);

  const trigger = isValidElement(children)
    ? cloneElement(children, {
        "aria-describedby": tooltipId,
      } as { "aria-describedby": string })
    : children;

  const portal =
    open &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        id={tooltipId}
        ref={bubbleRef}
        role="tooltip"
        style={style}
        className="transition-opacity duration-200 motion-reduce:transition-none"
      >
        <div className="flex flex-col items-stretch drop-shadow-sm">
          <div className="rounded-lg bg-zinc-200 px-3.5 py-2 text-center text-sm font-semibold tracking-tight text-zinc-900">
            {label}
          </div>
          <div className="relative h-2 w-full shrink-0">
            <svg
              className="absolute left-3 top-0 text-zinc-200"
              width={TAIL_WIDTH_PX}
              height={8}
              viewBox={`0 0 ${TAIL_WIDTH_PX} 8`}
              aria-hidden
            >
              <path
                fill="currentColor"
                d={`M0 0h${TAIL_WIDTH_PX}L${TAIL_WIDTH_PX / 2} 8z`}
              />
            </svg>
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      <span
        ref={wrapRef}
        className="relative inline-flex"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocusCapture={show}
        onBlurCapture={hide}
      >
        {trigger}
      </span>
      {portal}
    </>
  );
}
