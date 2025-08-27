import { ClaimTicketPayload } from "@/types/claim-ticket";

import API from "./api";

const claimTicket = async (payload: ClaimTicketPayload) => {
  return await API.post("/tickets/claims", payload);
};

const claimTicketService = {
  claimTicket,
};

export default claimTicketService;
