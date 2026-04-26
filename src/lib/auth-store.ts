"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setApiAccessToken } from "@/lib/api/client";

type AuthState = {
  accessToken: string | null;
  hasHydrated: boolean;
  setAccessToken: (token: string | null) => void;
  clearAuth: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      hasHydrated: false,
      setAccessToken: (token) => {
        setApiAccessToken(token);
        set({ accessToken: token });
      },
      clearAuth: () => {
        setApiAccessToken(null);
        set({ accessToken: null });
      },
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "ngo-auth",
      partialize: (state) => ({ accessToken: state.accessToken }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        setApiAccessToken(state.accessToken);
        state.setHasHydrated(true);
      },
    },
  ),
);
