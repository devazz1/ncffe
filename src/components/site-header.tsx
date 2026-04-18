"use client";

import Link from "next/link";
import { useState } from "react";
import { AboutMenu } from "@/components/about-menu";
import { AccountMenu } from "@/components/account-menu";
import { AuthModal } from "@/components/auth-modal";
import { useAuthStore } from "@/lib/auth-store";

export function SiteHeader() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [purpose, setPurpose] = useState<"login" | "register">("login");
  const token = useAuthStore((s) => s.accessToken);

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center px-4 py-3">
        <div className="flex min-w-0 flex-1 justify-start">
          <Link href="/" className="font-semibold">
            NGO Platform
          </Link>
        </div>
        <nav
          className="flex shrink-0 items-center gap-4 text-sm"
          aria-label="Primary"
        >
          <Link href="/">Home</Link>
          <AboutMenu />
          {/* dropdown list for categorys */}
          <Link href="/stories">Stories</Link>
        </nav>
        <div className="flex min-w-0 flex-1 justify-end">
          <nav
            className="flex items-center gap-4 text-sm"
            aria-label="Account"
          >
            {token ? (
              <AccountMenu />
            ) : (
              <>
                <button
                  onClick={() => {
                    setPurpose("register");
                    setIsAuthOpen(true);
                  }}
                  className="rounded bg-cta-gradient bg-clip-text px-1 py-1 text-transparent"
                >
                  Register
                </button>
                <span className="h-4 w-px bg-zinc-300"></span>
                <button
                  onClick={() => {
                    setPurpose("login");
                    setIsAuthOpen(true);
                  }}
                  className="rounded bg-cta-gradient bg-clip-text px-1 py-1 text-transparent"
                >
                  Login
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
      <AuthModal
        key={`${String(isAuthOpen)}-${purpose}`}
        open={isAuthOpen}
        initialPurpose={purpose}
        onClose={() => setIsAuthOpen(false)}
      />
    </header>
  );
}
