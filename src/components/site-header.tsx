"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthModal } from "@/components/auth-modal";
import { useAuthStore } from "@/lib/auth-store";

export function SiteHeader() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [purpose, setPurpose] = useState<"login" | "register">("login");
  const token = useAuthStore((s) => s.accessToken);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold">
          NGO Platform
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/about">About</Link>
          <Link href="/stories">Stories</Link>
          {token ? <Link href="/dashboard">Dashboard</Link> : null}
          {!token ? (
            <>
              <button
                onClick={() => {
                  setPurpose("register");
                  setIsAuthOpen(true);
                }}
                className="rounded border border-zinc-300 px-3 py-1"
              >
                Register
              </button>
              <button
                onClick={() => {
                  setPurpose("login");
                  setIsAuthOpen(true);
                }}
                className="rounded bg-zinc-900 px-3 py-1 text-white"
              >
                Login
              </button>
            </>
          ) : (
            <button
              onClick={clearAuth}
              className="rounded border border-zinc-300 px-3 py-1"
            >
              Logout
            </button>
          )}
        </nav>
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
