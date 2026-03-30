"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser, updateCurrentUser } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import { AuthModal } from "@/components/auth-modal";

export function DashboardClient() {
  const token = useAuthStore((s) => s.accessToken);
  const [isLoginOpen, setIsLoginOpen] = useState(!token);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const profileQuery = useQuery({
    queryKey: ["users", "me"],
    queryFn: getCurrentUser,
    enabled: !!token,
  });

  const updateMutation = useMutation({
    mutationFn: updateCurrentUser,
    onError: (err: unknown) => {
      setErrorMessage(err instanceof Error ? err.message : "Failed to update profile");
    },
  });

  if (!token) {
    return (
      <section className="mx-auto w-full max-w-3xl rounded-lg border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-sm text-zinc-800">
          You must login to access your dashboard.
        </p>
        <button
          className="mt-4 rounded bg-zinc-900 px-4 py-2 text-white"
          onClick={() => setIsLoginOpen(true)}
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
    );
  }

  if (profileQuery.isLoading) {
    return <p className="mx-auto w-full max-w-3xl">Loading profile...</p>;
  }

  if (!profileQuery.data?.data) {
    return <p className="mx-auto w-full max-w-3xl">Unable to load profile.</p>;
  }

  const profile = profileQuery.data.data;

  return (
    <section className="mx-auto w-full max-w-3xl rounded-lg border border-zinc-200 bg-white p-6">
      <h1 className="text-xl font-semibold">My Dashboard</h1>
      <p className="mt-1 text-sm text-zinc-800">Manage your profile details.</p>
      <form
        className="mt-4 grid gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const payload = {
            fullName: String(form.get("fullName") ?? ""),
            phone: String(form.get("phone") ?? ""),
            address: String(form.get("address") ?? ""),
            pan: String(form.get("pan") ?? ""),
          };
          updateMutation.mutate(payload, {
            onSuccess: () => {
              profileQuery.refetch();
            },
          });
        }}
      >
        <input
          defaultValue={profile.fullName ?? ""}
          name="fullName"
          className="rounded border border-zinc-300 px-3 py-2"
          placeholder="Full name"
        />
        <input
          defaultValue={profile.phone ?? ""}
          name="phone"
          className="rounded border border-zinc-300 px-3 py-2"
          placeholder="Phone"
        />
        <input
          defaultValue={profile.address ?? ""}
          name="address"
          className="rounded border border-zinc-300 px-3 py-2"
          placeholder="Address"
        />
        <input
          defaultValue={profile.pan ?? ""}
          name="pan"
          className="rounded border border-zinc-300 px-3 py-2"
          placeholder="PAN"
        />
        <button
          className="rounded bg-zinc-900 px-4 py-2 text-white disabled:opacity-50"
          disabled={updateMutation.isPending}
          type="submit"
        >
          Save profile
        </button>
      </form>
      {errorMessage ? <p className="mt-3 text-sm text-red-600">{errorMessage}</p> : null}
      <AuthModal
        key={String(isLoginOpen)}
        open={isLoginOpen}
        initialPurpose="login"
        onClose={() => setIsLoginOpen(false)}
        onSuccess={() => setIsLoginOpen(false)}
      />
    </section>
  );
}
