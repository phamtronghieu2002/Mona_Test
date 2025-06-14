import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./assets/style.scss"
import App from "./App.tsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: 'always',
      retry: 1,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5,
    },
  },
});


createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
