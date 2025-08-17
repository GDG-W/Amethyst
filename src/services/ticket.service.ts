import API from "@/services/api";
import { CheckoutPayload, CheckoutSuccess, Ticket, TicketType } from "@/types/ticket";

export const getTickets = async (ticketType: TicketType) => {
  return API.get<Ticket[]>(`/tickets?ticket_type=${ticketType}`);
};

export const checkout = async (payload: CheckoutPayload) => {
  return API.post<CheckoutPayload, CheckoutSuccess>("/payments/checkout", payload);
};

export default {
  getTickets,
  checkout,
};
