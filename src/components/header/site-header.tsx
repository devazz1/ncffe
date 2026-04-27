"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AboutMenu } from "@/components/header/about-menu";
import { AccountMenu } from "@/components/header/account-menu";
import { CategoriesMenu } from "@/components/header/categories-menu";
import { MobilePrimaryNav } from "@/components/header/mobile-primary-nav";
import { ProgramMenu } from "@/components/header/program-menu";
import type { Category } from "@/lib/types";
import Image from "next/image";

type SiteHeaderProps = {
  categories: Category[];
};

export function SiteHeader({ categories }: SiteHeaderProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header
      className={
        isHomePage
          ? "absolute inset-x-0 top-0 z-40 text-zinc-50 bg-linear-to-b from-black/90 to-transparent"
          : "bg-white"
      }
    >
      <div className="mx-auto flex w-full max-w-screen-2xl items-center px-4 py-3 md:px-12">
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
              <p className="text-xs">Nand Care</p>
              <p className="text-sm font-semibold">Foundation</p>
            </div>
          </div>
        </div>
        <nav
          className="hidden shrink-0 items-center gap-4 text-sm md:flex"
          aria-label="Primary"
        >
          <Link href="/">Home</Link>
          <AboutMenu />
          <ProgramMenu />
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
