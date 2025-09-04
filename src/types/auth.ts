// Domain-specific types

import { UserState } from "@/store/user-details-store";

export type Auth = {
  email: string;
  ticket_id: string;
};

export type SuccessResponse = {
  success: boolean;
  data: UserState & { id: string };
};
