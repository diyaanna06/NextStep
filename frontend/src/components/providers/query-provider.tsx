"use client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ReactNode } from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface QueryProviderProps {
  children: ReactNode;
}

export const queryClient =
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime:
          5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus:
          false,
      },
    },
  });

export function QueryProvider({
  children,
}: QueryProviderProps) {
  return (
    <QueryClientProvider
      client={queryClient}
    >
      {children}

      <ReactQueryDevtools
        initialIsOpen={false}
      />
    </QueryClientProvider>
  );
}