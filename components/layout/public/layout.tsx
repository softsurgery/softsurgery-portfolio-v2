import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-[100vh] w-full rounded-xl bg-muted/50">{children}</div>
    </QueryClientProvider>
  );
}
