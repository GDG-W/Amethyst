import { useMutation } from "@tanstack/react-query";

import checkoutService from "@/services/checkout.service";

import { toast } from "@/components/ui/toast";
import { CheckoutPayload } from "@/types/checkout";

export function useCheckout() {
  return useMutation({
    mutationFn: async (payload: CheckoutPayload) => {
      return checkoutService.checkout(payload);
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
