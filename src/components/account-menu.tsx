"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/lib/auth-store";

export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
        aria-expanded={open}
        aria-label="Account menu"
      >
        <User className="size-4.5" strokeWidth={2} aria-hidden />
      </button>
      {open ? (
        <div className="absolute right-0 z-50 mt-1 min-w-36 rounded-xl border border-zinc-200 bg-white py-1 shadow-lg">
          <Link
            href="/dashboard"
            className="block px-3 py-2 text-sm text-zinc-800 hover:bg-surface-warm"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <hr className="my-0 border-zinc-100" aria-hidden />
          <Link
            href="/dashboard/profile"
            className="block px-3 py-2 text-sm text-zinc-800 hover:bg-surface-warm"
            onClick={() => setOpen(false)}
          >
            My profile
          </Link>
          <hr className="my-0 border-zinc-100" aria-hidden />
          <button
            type="button"
            className="block w-full px-3 py-2 text-center text-sm hover:bg-surface-warm"
            onClick={() => {
              clearAuth();
              setOpen(false);
            }}
          >
            <span className="bg-cta-gradient bg-clip-text text-transparent">
              Logout
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
