import { useMutation } from "@tanstack/react-query";

import ticketService from "@/services/ticket.service";
import { CheckoutPayload } from "@/types/ticket";

export function useCheckout() {
  return useMutation({
    mutationFn: async (payload: CheckoutPayload) => {
      return ticketService.checkout(payload);
    },
    onError: (error) => {
      console.error("Unexpected network error:", error);
    },
    onSuccess: (res) => {
      if (res.success) {
        console.log("Checkout success:", res.data);
      } else {
        console.error("Checkout failed:", res.message, res.errors);
      }
    },
  });
}
