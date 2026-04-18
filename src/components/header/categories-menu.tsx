"use client";

import { ChevronDown, ChevronUp, CircleArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Category } from "@/lib/types";

type CategoriesMenuProps = {
  categories: Category[];
};

export function CategoriesMenu({ categories }: CategoriesMenuProps) {
  const [open, setOpen] = useState(false);

  const sorted = useMemo(
    () => [...categories].sort((a, b) => a.displayOrder - b.displayOrder),
    [categories],
  );

  if (sorted.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-0.5 rounded px-1 py-1 text-sm text-zinc-900 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        Categories
        {open ? (
          <ChevronUp className="size-4 shrink-0" strokeWidth={2} aria-hidden />
        ) : (
          <ChevronDown className="size-4 shrink-0" strokeWidth={2} aria-hidden />
        )}
      </button>
      {open ? (
        <div
          className="absolute left-0 z-50 mt-1 min-w-[min(100vw-2rem,17.5rem)] max-h-[min(70vh,24rem)] overflow-y-auto rounded-sm border border-zinc-200 bg-white py-1 shadow-lg"
          role="menu"
        >
          {sorted.map((category, i) => (
            <div key={category.categoryId}>
              <Link
                href={`/${category.slug}`}
                className="flex items-center justify-between gap-3 px-3 py-2 text-sm text-zinc-800 hover:bg-surface-warm"
                onClick={() => setOpen(false)}
                role="menuitem"
              >
                <span className="min-w-0 text-left">{category.name}</span>
                <CircleArrowOutUpRight
                  className="size-4 shrink-0 text-zinc-400"
                  strokeWidth={2}
                  aria-hidden
                />
              </Link>
              {i < sorted.length - 1 ? (
                <hr className="my-0 border-zinc-100" aria-hidden />
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
