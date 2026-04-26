"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AuthModal } from "@/components/auth-modal";
import { useAuthStore } from "@/lib/auth-store";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DASHBOARD_LINKS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/dashboard/overview", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "My profile", icon: UserRound },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const token = useAuthStore((s) => s.accessToken);
  const isHydrated = useAuthStore((s) => s.hasHydrated);
  const pathname = usePathname();
  const [isLoginOpen, setIsLoginOpen] = useState(!token);

  if (!isHydrated) {
    return (
      <div className="px-4 py-6">
        <section className="mx-auto w-full max-w-4xl rounded-lg border border-zinc-200 bg-white p-6">
          <p className="text-sm text-zinc-600">Loading dashboard...</p>
        </section>
      </div>
    );
  }

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
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 gap-6 grid md:px-12 md:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="h-fit p-3">
        <nav className="grid gap-1">
          {DASHBOARD_LINKS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-orange-100 text-orange-500"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
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
