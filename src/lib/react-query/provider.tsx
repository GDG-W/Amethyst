"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let browserQueryClient: QueryClient | null = null;

function getQueryClient() {
  if (typeof window === "undefined") return new QueryClient();
  if (!browserQueryClient) {
    browserQueryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: 1, staleTime: 5 * 60 * 1000, refetchOnWindowFocus: false },
      },
    });
  }
  return browserQueryClient;
}

export function RQProvider({ children }: { children: React.ReactNode }) {
  const client = getQueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
