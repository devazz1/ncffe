"use client";

import {
  ChevronDown,
  CircleArrowOutUpRight,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { ABOUT_NAV_ITEMS } from "@/components/header/about-menu";
import { PROGRAM_NAV_ITEMS } from "@/components/header/program-menu";
import type { Category } from "@/lib/types";

type MobilePrimaryNavProps = {
  categories: Category[];
};

export function MobilePrimaryNav({ categories }: MobilePrimaryNavProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const panelId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.displayOrder - b.displayOrder),
    [categories],
  );

  const close = useCallback(() => {
    setOpen(false);
    queueMicrotask(() => menuButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    queueMicrotask(() => closeButtonRef.current?.focus());
  }, [open]);

  return (
    <div className="flex md:hidden">
      <button
        ref={menuButtonRef}
        type="button"
        onClick={() => setOpen(true)}
        className="rounded p-1 text-zinc-900 hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-haspopup="dialog"
        aria-label="Open menu"
      >
        <Menu className="size-6 text-zinc-100" strokeWidth={2} aria-hidden />
      </button>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            aria-hidden="true"
            onClick={close}
          />
          <div
            id={panelId}
            className="fixed inset-x-0 top-0 z-50 max-h-[min(90vh,32rem)] overflow-y-auto rounded-b-lg border-b border-zinc-200 bg-white shadow-lg transition-transform duration-200 ease-out"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-zinc-100 bg-white px-4 py-3">
              <span id={titleId} className="text-base font-semibold text-zinc-900">
                Menu
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                className="rounded p-2 text-zinc-700 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
                aria-label="Close menu"
              >
                <X className="size-5" strokeWidth={2} aria-hidden />
              </button>
            </div>
            <nav className="flex flex-col px-2 py-2 text-sm" aria-label="Primary mobile">
              <Link
                href="/"
                className="rounded px-3 py-3 text-zinc-900 hover:bg-zinc-50"
                onClick={close}
              >
                Home
              </Link>

              <details className="group rounded-lg border border-transparent open:border-zinc-100 open:bg-zinc-50/80">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-3 py-3 text-zinc-900 [&::-webkit-details-marker]:hidden">
                  <span>About us</span>
                  <ChevronDown
                    className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
                    strokeWidth={2}
                    aria-hidden
                  />
                </summary>
                <div className="border-t border-zinc-100 pb-2 pt-1">
                  {ABOUT_NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between gap-2 px-4 py-2.5 text-zinc-800 hover:bg-white"
                      onClick={close}
                    >
                      <span className="min-w-0">{item.label}</span>
                      <CircleArrowOutUpRight
                        className="size-4 shrink-0 text-zinc-400"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </Link>
                  ))}
                </div>
              </details>

              <details className="group rounded-lg border border-transparent open:border-zinc-100 open:bg-zinc-50/80">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-3 py-3 text-zinc-900 [&::-webkit-details-marker]:hidden">
                  <span>Programs</span>
                  <ChevronDown
                    className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
                    strokeWidth={2}
                    aria-hidden
                  />
                </summary>
                <div className="border-t border-zinc-100 pb-2 pt-1">
                  {PROGRAM_NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between gap-2 px-4 py-2.5 text-zinc-800 hover:bg-white"
                      onClick={close}
                    >
                      <span className="min-w-0">{item.label}</span>
                      <CircleArrowOutUpRight
                        className="size-4 shrink-0 text-zinc-400"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </Link>
                  ))}
                </div>
              </details>

              {sortedCategories.length > 0 ? (
                <details className="group rounded-lg border border-transparent open:border-zinc-100 open:bg-zinc-50/80">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-3 py-3 text-zinc-900 [&::-webkit-details-marker]:hidden">
                    <span>Categories</span>
                    <ChevronDown
                      className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </summary>
                  <div className="border-t border-zinc-100 pb-2 pt-1">
                    {sortedCategories.map((category) => (
                      <Link
                        key={category.categoryId}
                        href={`/cause/${category.slug}`}
                        className="flex items-center justify-between gap-2 px-4 py-2.5 text-zinc-800 hover:bg-white"
                        onClick={close}
                      >
                        <span className="min-w-0">{category.name}</span>
                        <CircleArrowOutUpRight
                          className="size-4 shrink-0 text-zinc-400"
                          strokeWidth={2}
                          aria-hidden
                        />
                      </Link>
                    ))}
                  </div>
                </details>
              ) : null}

              <Link
                href="/stories"
                className="rounded px-3 py-3 text-zinc-900 hover:bg-zinc-50"
                onClick={close}
              >
                Stories
              </Link>
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
