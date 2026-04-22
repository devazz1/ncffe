"use client";

import Link from "next/link";
import { AboutMenu } from "@/components/header/about-menu";
import { AccountMenu } from "@/components/header/account-menu";
import { CategoriesMenu } from "@/components/header/categories-menu";
import { MobilePrimaryNav } from "@/components/header/mobile-primary-nav";
import type { Category } from "@/lib/types";
import Image from "next/image";

type SiteHeaderProps = {
  categories: Category[];
};

export function SiteHeader({ categories }: SiteHeaderProps) {

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center px-4 py-3 md:px-16">
        <div className="flex min-w-0 flex-1 justify-start">
          <div className="flex items-center gap-3">
            <Image
              src="/ncf_logo_nobg.png"
              alt="Nand Care Foundation logo"
              width={20}
              height={20}
              className="h-10 w-10 rounded-[10px] object-cover bg-white"
            />
            <div>
              <p className="text-xs text-zinc-900">Nand Care</p>
              <p className="text-sm font-semibold text-zinc-900">Foundation</p>
            </div>
          </div>
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
