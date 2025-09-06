import API from "@/services/api";
import { Ticket, TicketType } from "@/types/ticket";

export const getTickets = async (ticketType: TicketType) => {
  return API.get<Ticket[]>(`/tickets?ticket_type=${ticketType}`);
};

export const getUserTicket = async () => {
  return API.get(`/users/tickets`);
};

export default {
  getTickets,
  getUserTicket,
};
