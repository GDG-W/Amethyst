import { CheckoutPayload, CheckoutResponse } from "@/types/checkout";

import API from "./api";

export const checkout = async (payload: CheckoutPayload) => {
  return API.post<CheckoutPayload, CheckoutResponse>("/payments/checkout", payload);
};

export default {
  checkout,
};
