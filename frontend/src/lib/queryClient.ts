import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // How long the data remains "fresh" before refetching
      staleTime: 5 * 60 * 1000, // 5 minutes

      // How long to cache data when the component is unmounted
      cacheTime: 10 * 60 * 1000, // 10 minutes

      // Automatically refetch on window focus
      refetchOnWindowFocus: true,

      // Retry failed queries 3 times
      retry: 3,

      // Delay between retries (in ms)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Show error notifications if query fails
      useErrorBoundary: false,
    },
    mutations: {
      // Retry failed mutations 2 times
      retry: 2,

      // Use error boundary for mutation errors
      useErrorBoundary: false,
    },
  },
});
