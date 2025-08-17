import { useMutation } from "@tanstack/react-query";

import ticketService from "@/services/ticket.service";
import { CheckoutPayload } from "@/types/ticket";
import { toast } from "@/components/ui/toast";

export function useCheckout() {
  return useMutation({
    mutationFn: async (payload: CheckoutPayload) => {
      return ticketService.checkout(payload);
    },
    onError: (error) => {
      toast.error("Oops!", "Unexpected network error");
    },
    onSuccess: (res) => {
      if (res.success) {
        window.location.href = res.data.checkout_url;
      } else {
        toast.error("Checkout failed", res.message);
      }
    },
  });
}
