"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </JotaiProvider>
  );
}