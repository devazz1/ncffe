"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AuthModal } from "@/components/auth-modal";
import { useAuthStore } from "@/lib/auth-store";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DASHBOARD_LINKS = [
  { href: "/dashboard/overview", label: "Overview" },
  { href: "/dashboard/profile", label: "My Profile" },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const token = useAuthStore((s) => s.accessToken);
  const pathname = usePathname();
  const [isLoginOpen, setIsLoginOpen] = useState(!token);

  if (!token) {
    return (
      <div className="px-4 py-6">
      <section className="mx-auto w-full max-w-4xl rounded-lg border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-sm text-zinc-800">
          You must login to access your dashboard.
        </p>
        <button
          className="mt-4 rounded bg-zinc-900 px-4 py-2 text-white"
          onClick={() => setIsLoginOpen(true)}
          type="button"
        >
          Open login modal
        </button>
        <AuthModal
          key={String(isLoginOpen)}
          open={isLoginOpen}
          initialPurpose="login"
          onClose={() => setIsLoginOpen(false)}
          onSuccess={() => setIsLoginOpen(false)}
        />
      </section>
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 md:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="h-fit rounded-lg border border-zinc-200 bg-white p-3">
        <p className="px-2 pb-2 text-sm font-semibold text-zinc-900">Dashboard</p>
        <nav className="grid gap-1">
          {DASHBOARD_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded px-3 py-2 text-sm ${
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
