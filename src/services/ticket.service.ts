import API from "@/services/api";
import { Ticket, TicketType } from "@/types/ticket";

export const getTickets = async (ticketType: TicketType) => {
  return API.get<Ticket[]>(`/api/tickets?ticket_type=${ticketType}`);
};

export default {
  getTickets,
};
