import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { getTickets } from "@/services/ticket.service";
import { toAPIError } from "@/services/api";

import BuyPageClient from "./client";

export default async function Buypage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["tickets", "standard"],
      queryFn: async () => {
        const res = await getTickets("standard");
        if (res.success) return res.data;
        throw toAPIError(res);
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["tickets", "pro"],
      queryFn: async () => {
        const res = await getTickets("pro");
        if (res.success) return res.data;
        throw toAPIError(res);
      },
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <BuyPageClient />
    </HydrationBoundary>
  );
}
