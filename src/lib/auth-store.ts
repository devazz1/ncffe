"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setApiAccessToken } from "@/lib/api/client";

type AuthState = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) => {
        setApiAccessToken(token);
        set({ accessToken: token });
      },
      clearAuth: () => {
        setApiAccessToken(null);
        set({ accessToken: null });
      },
    }),
    {
      name: "ngo-auth",
      partialize: (state) => ({ accessToken: state.accessToken }),
    },
  ),
);
