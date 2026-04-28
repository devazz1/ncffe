"use client";

import { ChevronDown, ChevronUp, CircleArrowOutUpRight } from "lucide-react";
import { PrimaryNavUnderline } from "@/components/header/primary-nav-underline";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const PROGRAM_NAV_ITEMS = [
  {
    label: "Education & Child Development",
    href: "/program/education-child-development",
  },
  {
    label: "Nutrition & Food Security",
    href: "/program/nutrition-food-security",
  },
  {
    label: "Talent Identification & Rural Talent Support",
    href: "/program/talent-identification-rural-talent-support",
  },
  {
    label: "Healthcare & Medical Support",
    href: "/program/healthcare-medical-support",
  },
  {
    label: "Women's Livelihood & Economic Empowerment",
    href: "/program/womens-livelihood-economic-empowerment",
  },
  {
    label: "Hunger Relief & Community Support",
    href: "/program/hunger-relief-community-support",
  },
  {
    label: "Winter Relief & Clothing Distribution",
    href: "/program/winter-relief-clothing-distribution",
  },
] as const;

export function ProgramMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="group inline-flex flex-col items-start rounded px-1 py-1 text-left text-sm hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="flex items-center gap-0.5">
          Programs
          {open ? (
            <ChevronUp className="size-4 shrink-0" strokeWidth={2} aria-hidden />
          ) : (
            <ChevronDown className="size-4 shrink-0" strokeWidth={2} aria-hidden />
          )}
        </span>
        <PrimaryNavUnderline pinned={open} />
      </button>
      {open ? (
        <div
          className="absolute left-0 z-50 mt-1 min-w-[min(100vw-2rem,24rem)] rounded-sm border border-zinc-200 bg-white py-1 shadow-lg"
          role="menu"
        >
          {PROGRAM_NAV_ITEMS.map((item, i) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between gap-3 px-3 py-2 text-sm text-zinc-800 hover:bg-surface-warm"
                onClick={() => setOpen(false)}
                role="menuitem"
              >
                <span className="min-w-0 text-left">{item.label}</span>
                <CircleArrowOutUpRight
                  className="size-4 shrink-0 text-zinc-400"
                  strokeWidth={2}
                  aria-hidden
                />
              </Link>
              {i < PROGRAM_NAV_ITEMS.length - 1 ? (
                <hr className="my-0 border-zinc-100" aria-hidden />
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
