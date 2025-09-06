import { useQuery } from "@tanstack/react-query";

import { getTickets, getUserTicket } from "@/services/ticket.service";
import { toAPIError } from "@/services/api";
import { Ticket, TicketType } from "@/types/ticket";

export function useTickets(type: TicketType) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tickets", type],
    queryFn: async () => {
      const res = await getTickets(type);
      if (res.success) return res.data as Ticket[];
      throw toAPIError(res);
    },
  });

  return { error, isLoading, tickets: data ?? [] };
}

export function useUserTickets() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const res = await getUserTicket();
      if (res.success) return res.data as Ticket[];
      throw toAPIError(res);
    },
  });

  return { error, isLoading, tickets: data ?? [] };
}
