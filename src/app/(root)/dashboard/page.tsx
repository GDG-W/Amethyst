import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { toAPIError } from "@/services/api";
import { getUserTicket } from "@/services/ticket.service";

import HomeClient from "./client";

export default async function Home() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["ticket"],
      queryFn: async () => {
        const res = await getUserTicket();
        if (res.success) return res.data;
        throw toAPIError(res);
      },
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeClient />
    </HydrationBoundary>
  );
}
