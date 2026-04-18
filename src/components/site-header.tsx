"use client";

import Link from "next/link";
import { AboutMenu } from "@/components/about-menu";
import { AccountMenu } from "@/components/account-menu";
import { CategoriesMenu } from "@/components/categories-menu";
import { MobilePrimaryNav } from "@/components/mobile-primary-nav";
import type { Category } from "@/lib/types";

type SiteHeaderProps = {
  categories: Category[];
};

export function SiteHeader({ categories }: SiteHeaderProps) {

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center px-4 py-3">
        <div className="flex min-w-0 flex-1 justify-start">
          <Link href="/" className="font-semibold">
            NGO Platform
          </Link>
        </div>
        <nav
          className="hidden shrink-0 items-center gap-4 text-sm md:flex"
          aria-label="Primary"
        >
          <Link href="/">Home</Link>
          <AboutMenu />
          <CategoriesMenu categories={categories} />
          <Link href="/stories">Stories</Link>
        </nav>        
        <div className="flex min-w-0 flex-1 justify-end">
          <nav
            className="flex items-center gap-4 text-sm"
            aria-label="Account"
          >
            <AccountMenu />
          </nav>
          <MobilePrimaryNav categories={categories} />
        </div>
      </div>

    </header>
  );
}
