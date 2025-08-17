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

export interface Buyer {
  fullname: string;
  email: string;
}
export interface Attendee {
  email: string;
  ticket_ids: string[];
  gender?: string;
  role?: string;
  experience?: string;
}
export interface CheckoutPayload {
  buyer: Buyer;
  attendees: Attendee[];
  callback_url: string;
}

export interface CheckoutSuccess {
  reference: string;
  paymentUrl: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
