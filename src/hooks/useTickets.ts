import { useQuery } from "@tanstack/react-query";

import { Ticket, TicketType } from "@/types/ticket";
import { getTickets, getUserTicket } from "@/services/ticket.service";

import { toAPIError } from "@/services/api";

export function useTickets(type: TicketType) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tickets", type],
    queryFn: async () => {
      const res = await getTickets(type);
      if (res.success) {
        const tickets = res.data as Ticket[];
        // Ensure we always return an array
        return Array.isArray(tickets) ? tickets : [];
      }
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
