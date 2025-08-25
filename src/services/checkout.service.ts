import { CheckoutPayload, CheckoutSuccess } from "@/types/checkout";

import API from "./api";

export const checkout = async (payload: CheckoutPayload) => {
  return API.post<CheckoutPayload, CheckoutSuccess>("/payments/checkout", payload);
};

export default {
  checkout,
};
