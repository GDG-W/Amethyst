import { ISODate } from "./general";

export type TicketType = "standard" | "pro";

type TicketDay = "tue" | "wed" | "thurs" | "fri" | "sat";

export type Ticket = {
  id: string;
  ticket_type: TicketType;
  day: TicketDay;
  price: number;
  total_quantity: number;
  available_quantity: number;
  created_at: ISODate;
  updated_at: ISODate;
  date: ISODate;
  theme: string;
};
