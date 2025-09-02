import { useMutation } from "@tanstack/react-query";

import claimTicketService from "@/services/claim-ticket.service";

import { toast } from "@/components/ui/toast";
import { ClaimTicketPayload } from "@/types/claim-ticket";

export function useClaimTicket(toggleModal: React.Dispatch<React.SetStateAction<boolean>>) {
  return useMutation({
    mutationFn: async (payload: ClaimTicketPayload) => {
      return claimTicketService.claimTicket(payload);
    },
    onError: () => {
      toast.error("Something went wrong!", "Unexpected network error");
    },
    onSuccess: (res) => {
      if (res.success) {
        toggleModal(true);
      } else {
        toast.error("Something went wrong!", res.message);
      }
    },
  });
}
