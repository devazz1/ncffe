"use client";

import { useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { setApiAccessToken } from "@/lib/api/client";
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
  const token = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    setApiAccessToken(token);
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
