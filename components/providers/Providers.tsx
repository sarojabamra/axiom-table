"use client";

import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/lib/redux/store";
import { queryClient } from "@/lib/query/queryClient";

/**
 * Providers component - wraps app with Redux and React Query
 * Atomic architecture: single responsibility for provider setup
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}
