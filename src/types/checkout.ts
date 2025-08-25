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

export interface CheckoutResponse {
  id: string;
  amount_payable: number;
  total_amount: number;
  checkout_url: string;
  created_at: string;
  updated_at: string;
  intent: "purchase";
  payer_email: string;
  payer_fullname: string;
  status: "pending" | "completed" | "failed";
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
