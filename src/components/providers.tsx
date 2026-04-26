"use client";

import { useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { setApiUnauthorizedHandler } from "@/lib/api/client";
import { useAuthStore } from "@/lib/auth-store";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache(),
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    const handler = () => {
      const authState = useAuthStore.getState();
      if (!authState.accessToken) {
        return;
      }
      clearAuth();
      queryClient.clear();
    };
    setApiUnauthorizedHandler(handler);
    return () => setApiUnauthorizedHandler(null);
  }, [queryClient, clearAuth]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
