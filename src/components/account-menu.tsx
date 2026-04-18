"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AuthModal } from "@/components/auth-modal";
import { useAuthStore } from "@/lib/auth-store";

export function AccountMenu() {
  const token = useAuthStore((s) => s.accessToken);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const [open, setOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [purpose, setPurpose] = useState<"login" | "register">("login");

  if (!token) {
    return (
      <>
        <button
          type="button"
          onClick={() => {
            setPurpose("register");
            setIsAuthOpen(true);
          }}
          className="rounded bg-cta-gradient bg-clip-text px-1 py-1 text-transparent"
        >
          Register
        </button>
        <span className="h-4 w-px bg-zinc-300" aria-hidden />
        <button
          type="button"
          onClick={() => {
            setPurpose("login");
            setIsAuthOpen(true);
          }}
          className="rounded bg-cta-gradient bg-clip-text px-1 py-1 text-transparent"
        >
          Login
        </button>
        <AuthModal
          key={`${String(isAuthOpen)}-${purpose}`}
          open={isAuthOpen}
          initialPurpose={purpose}
          onClose={() => setIsAuthOpen(false)}
        />
      </>
    );
  }

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
